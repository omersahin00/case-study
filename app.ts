import express from "express";
import http from "http";
import cors from "cors";
import { sequelize } from "@data/db";
import cookieParser from "cookie-parser";
import { environment, port } from "./config";
import path from "path";

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "X-Requested-With"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View Engine:
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "client", "views"));

// Public Routes:
app.use("/img", express.static(path.join(process.cwd(), "public", "images")));

// ROUTES:
import routerRestAPI from "./restAPI";
app.use(routerRestAPI);

// ROUTES:
import routerClient from "./client";
app.use(routerClient);

import "./models"; // Model senkronizeleri için import edilmesi gerekiyor.
// Global request tipleri için kullanılan tip dosyası:
import globalTypes from "./types/globalTypes"; // KULLANIMDA SİLME!
import unknownRoute from "./restAPI/domains/home/unknownRoute";
import logger from "./services/logger";
import Schedulers from "./schedulers";
import addMockData from "./data/mockData";
app.use(unknownRoute);

(async (): Promise<void> => {
    try {
        await sequelize.sync({
            alter: environment === "development" ? true : false
        });

        await addMockData();

        server.listen(port, () => {
            logger.info(`API listen on port ${port}`, 1);
        });

        Schedulers();

    } catch (error) {
        console.error("Error in App:", error instanceof Error ? error : error);
    }
})();
