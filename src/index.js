import httpServer from "./config/httpServer.js";
import "./config/env.js";

const startFunc = () => {
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};

startFunc();
