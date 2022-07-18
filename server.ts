import express, { Request, Response } from "express";
import next from "next";
import { loadEnvConfig } from "@next/env";
loadEnvConfig("./", process.env.NODE_ENV !== "production");
import cors from "cors";
import compression from "compression";

import { Mongoose } from "./database";

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "localhost";
const port = process.env.PORT ? +process.env.PORT : 3000;

const app = next({ dev, port, hostname });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cors());
    server.use(compression())

    await Mongoose.init();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
