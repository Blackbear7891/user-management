import httpServer from "./config/httpServer.js";
import "./config/env.js";
import connectDB from "./config/db.js";

const startFunc = () => {
  connectDB(process.env.MONGO_URL);
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};

startFunc();
