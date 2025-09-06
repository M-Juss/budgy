import mongoose from "mongoose";


export default async function connectDB() {
const uri = process.env.ATLAS_URI;
if (!uri) throw new Error("ATLAS_URI is missing in .env");

try {
await mongoose.connect(uri, {
maxPoolSize: 10,
});
console.log("✅ MongoDB connected");
} catch (err) {
console.error(" MongoDB connection error:", err.message);
// Fail fast so you don't run an API that can't reach DB
process.exit(1);
}
}