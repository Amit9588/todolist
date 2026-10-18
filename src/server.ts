
import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import todoRoutes from "./modules/todo/route.js";



dotenv.config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);   

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Parsed body:", req.body);
  next();
});

app.use("/api/todos",todoRoutes)

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Todo API is running",
  });
});

async function startServer(): Promise<void> {

  console.log("Starting the App Bud")  
  await connectDatabase();

  console.log("Database connected, Starting Server.....")

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((error)=> {
    console.error("Application Startup Failed ", error)
    process.exit(1)
});
