import { app } from "./app.js";
import mongoose from "mongoose";
import list from "express-list-endpoints";
import listEndpoints from "express-list-endpoints";

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  console.log("Connected to Mongo");
  app.listen(process.env.PORT, () => {
    console.table(listEndpoints(app));
    console.log("Server 🚀 " + process.env.PORT);
    // console.log(list(app));
  });
});
