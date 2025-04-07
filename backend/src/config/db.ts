import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    // Debugging info
    console.log(`✅ MongoDB Connected to: ${conn.connection.db!.databaseName}`);
    console.log(`🛠️ Host: ${conn.connection.host}`);
    console.log(
      `📊 Collections: ${(
        await conn.connection.db!.listCollections().toArray()
      ).map((c) => c.name)}`
    );

    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
