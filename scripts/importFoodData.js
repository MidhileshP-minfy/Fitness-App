import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import csvParser from 'csv-parser';
import Food from '../models/Food.js';

// ESM-compatible __dirname and require
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Load environment variables from .env
dotenv.config();

// MongoDB Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

// Parse CSV and insert into DB
async function importFoodData() {
  const csvPath = path.join(__dirname, '../data/food.csv');
  const results = [];

  fs.createReadStream(csvPath)
    .pipe(csvParser())
    .on('data', (row) => {
      results.push({
        name: row.name,
        weight: parseFloat(row.weight),
        calories_per_unit: parseFloat(row.calories),
        protein_per_unit: parseFloat(row.protein),
        carbs_per_unit: parseFloat(row.carbs),
        fat_per_unit: parseFloat(row.fat),
        isVeg: row.isVeg.toLowerCase() === 'true',
        micronutrients: {}
      });
    })
    .on('end', async () => {
      try {
        await Food.deleteMany({}); // Optional: Clear old data
        await Food.insertMany(results);
        console.log(`✅ Inserted ${results.length} food items`);
      } catch (err) {
        console.error('❌ Insertion error:', err);
      } finally {
        mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
      }
    });
}

// Run the script
await connectToDatabase();
await importFoodData();
