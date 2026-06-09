// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const products = mongo.products;

// ─── AI Search: Groq SDK (added for RAG feature) ──────────────────────────────
require('dotenv').config();
const axios = require('axios');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.3-70b-versatile'; // free, very capable at following instructions

// ─── Existing Controllers (100% unchanged) ────────────────────────────────────

exports.productlist = async(request, response) =>{
    let result = await products.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleproductlist = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    let result = await products.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addproduct = (request, response) =>{
    let productData = request.body
    const product = new products(productData)
    product.save();
}

exports.deleteproduct = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await products.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateproduct = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await products.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))
}

exports.findproducts = async(request, response) =>{
    const result = await products.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.searchproducts = async(request, response) =>{
    const result = await products.find({productname:{$regex: request.params.input, $options: "i"}})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.sidesearchproducts = async(request, response) =>{
    const { category, secondarycategory, brand, price } = request.query;
    console.log(category, secondarycategory, brand, price);

    const query = {};

    if (category && category !== "") {
      query.category = category;
    }

    if (secondarycategory && secondarycategory !== "" && secondarycategory !== "none") {
      query.secondarycategory = { $regex: secondarycategory, $options: "i" };
    }

    if (brand && brand !== "" && brand !== "none") {
      query.brand = { $regex: brand, $options: "i" };
    }

    if (price && price !== "" && price !== "none") {
      query.price = { $lt: Number(price) };
    }

    const result = await products.find(query);
    response.json({ error: "", message: result });
}


// ─── NEW: AI Smart Search — Groq reads your products and decides ──────────────
//
// How it works:
//   1. Fetch all products from MongoDB (existing collection, NO schema changes)
//   2. Strip heavy fields (imageurl) to keep payload small for Groq
//   3. Groq (llama-3.3-70b-versatile, free) reads the product list + user query
//      and returns ONLY the _id values of matching products
//   4. We fetch those full products from MongoDB and return them
//
// For large catalogs (500+): a lightweight MongoDB pre-filter narrows the pool
// before sending to Groq, keeping it fast and within context limits.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a lightweight representation of each product for Groq.
 * We deliberately exclude imageurl — Groq doesn't need it and it wastes tokens.
 */
function buildProductSummary(product) {
    return {
        id:       product._id.toString(),
        name:     product.productname     || '',
        desc:     product.description     || '',
        price:    product.price           || '0',
        rating:   product.rating          || '0',
        category: product.category        || '',
        subcat:   product.secondarycategory || '',
        brand:    product.brand           || '',
    };
}

/**
 * Pre-filter using MongoDB to narrow down products before sending to Groq.
 * This is critical for large catalogs — keeps token usage low.
 * We do a loose broad search: any word in the query matched against
 * productname, description, category, brand via regex OR.
 */
async function preFilterProducts(query) {
    const words = query
        .split(/\s+/)
        .filter(w => w.length > 2) // skip tiny words like "a", "in", "of"
        .slice(0, 8);              // take up to 8 meaningful words

    if (words.length === 0) {
        // No meaningful keywords → return all products
        return await products.find({}).lean();
    }

    // Build OR conditions: any word matched in name, description, category, brand
    const orConditions = words.flatMap(word => [
        { productname:        { $regex: word, $options: 'i' } },
        { description:        { $regex: word, $options: 'i' } },
        { category:           { $regex: word, $options: 'i' } },
        { secondarycategory:  { $regex: word, $options: 'i' } },
        { brand:              { $regex: word, $options: 'i' } },
    ]);

    let preFiltered = await products.find({ $or: orConditions }).lean();

    // If pre-filter is too narrow (< 5 results), fall back to all products
    // so Groq has enough context to make a good decision
    if (preFiltered.length < 5) {
        preFiltered = await products.find({}).lean();
    }

    return preFiltered;
}

/**
 * Call Groq with the product list and user query.
 * Groq returns a JSON array of _id strings for the matching products.
 */
async function askGroqToFilterProducts(query, productList) {
    // Build compact product catalog string for the prompt
    const catalog = productList
        .map(p =>
            `[${p.id}] ${p.name} | ${p.brand} | ${p.category}/${p.subcat} | ₹${p.price} | ⭐${p.rating} | ${p.desc.slice(0, 80)}`
        )
        .join('\n');

    const prompt = `You are a smart product search engine for an e-commerce store.

A user searched for: "${query}"

Here is the product catalog (format: [id] name | brand | category/subcategory | price | rating | description):
${catalog}

Your job:
- Understand what the user wants (price range, category, brand, rating, type of product, etc.)
- Return ONLY the IDs of products that genuinely match the user's query
- Be smart: "cheap" means low price, "premium"/"best" means high rating, "budget" means under ₹1000, etc.
- If the user says "under ₹2000", only return products with price below 2000
- If the user says "good rating" or "highly rated", only return products with rating 4.0 or above
- Return a maximum of 20 best-matching product IDs, sorted by relevance
- Return ONLY a raw JSON array of ID strings, nothing else. Example: ["id1","id2","id3"]
- If no products match, return: []`;

    const response = await axios.post(
        GROQ_API_URL,
        {
            model:       GROQ_MODEL,
            temperature: 0,
            max_tokens:  1000,
            messages: [
                { role: 'system', content: 'You are a product search engine. You ONLY respond with a raw JSON array of product IDs. No explanation, no markdown, no extra text.' },
                { role: 'user',   content: prompt },
            ],
        },
        {
            headers: {
                Authorization:  `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const raw = response.data.choices[0].message.content
        .replace(/```json|```/g, '')
        .trim();

    return JSON.parse(raw); // array of id strings
}

/**
 * Main AI Search Controller
 */
exports.aisearchproducts = async (request, response) => {
    try {
        const query = decodeURIComponent(request.params.query || '').trim();
        console.log('\n🤖 AI Search query:', query);

        if (!query) {
            return response.json({ error: 'Empty query', message: [] });
        }

        // ── Step 1: Pre-filter products from MongoDB (no schema change) ───────
        const candidateProducts = await preFilterProducts(query);
        console.log(`📦 Candidate products after pre-filter: ${candidateProducts.length}`);

        if (candidateProducts.length === 0) {
            return response.json({ error: '', message: [], mode: 'ai' });
        }

        // ── Step 2: Build lightweight summaries (strip imageurl etc.) ─────────
        const summaries = candidateProducts.map(buildProductSummary);

        // ── Step 3: Groq decides which products match the query ───────────────
        let matchedIds = [];
        try {
            matchedIds = await askGroqToFilterProducts(query, summaries);
            console.log(`✅ Groq matched ${matchedIds.length} products`);
        } catch (groqErr) {
            console.error('Groq error:', groqErr.response?.data || groqErr.message);
            // Graceful fallback: return the pre-filtered products as-is
            return response.json({
                error:   '',
                message: candidateProducts.slice(0, 20),
                mode:    'fallback',
            });
        }

        if (!matchedIds || matchedIds.length === 0) {
            return response.json({ error: '', message: [], mode: 'ai' });
        }

        // ── Step 4: Fetch full product documents for matched IDs ──────────────
        // (preserves original order from Groq's ranking)
        const productMap = {};
        candidateProducts.forEach(p => { productMap[p._id.toString()] = p; });

        const matchedProducts = matchedIds
            .filter(id => productMap[id])       // only valid IDs
            .map(id => productMap[id]);         // full product objects

        console.log(`🎯 Returning ${matchedProducts.length} AI-matched products\n`);
        response.json({ error: '', message: matchedProducts, mode: 'ai' });

    } catch (err) {
        console.error('AI Search error:', err);
        response.status(500).json({ error: err.message, message: [] });
    }
};
