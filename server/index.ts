import "dotenv/config";
import express from "express";
import middlewares from "./middleware";
import { createFormRouter } from "./router";


(function () {
  const app = express();
  const formRouter = createFormRouter();

  app.use(...middlewares);
  app.use("/forms", formRouter);

  app.listen("0.0.0.0:8080", () => {
    console.log("Listening on port 0.0.0.0:8080");
  });
})();
