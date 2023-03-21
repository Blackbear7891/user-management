import { createServer } from "http";
import expressApp from "./expressApp.js";

const httpServer = createServer(expressApp);

export default httpServer;
