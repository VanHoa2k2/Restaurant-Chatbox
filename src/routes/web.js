import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomepage);

    // setup get started button, whitelisted domain
    router.post('/setup-profile', homeController.setupProfile);

    // setup persistent menu
    router.post('/setup-persistent-menu', homeController.setupPersistentMenu);

    router.post("/webhook", homeController.postWebhook);
    router.get("/webhook", homeController.getWebhook);

    router.get("/reserve-table", homeController.handleReserveTable);
    router.get("/reserve-table-ajax", homeController.handlePostReserveTable);


    return app.use("/", router);
};

module.exports = initWebRoutes;