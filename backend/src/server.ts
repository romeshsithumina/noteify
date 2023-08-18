import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.info("Mongoose connected!");

    // starting the server
    app.listen(port, () => {
      console.info(`Server started on port: ${port}`);
    });
  })
  .catch(() => {
    console.info("Error!, Mongoose connection unsuccessful");
  });
