import mongoose from "mongoose";
import bluebird from "bluebird";

/** custom your settings */
const connectionString = process.env.MONGO_CONNECTION_STRING ?? "";
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

class Mongoose {
  public static init(options?: mongoose.ConnectOptions): void {
    if (!mongoose.connections[0].readyState) {
      mongoose.Promise = bluebird;
      mongoose
        .connect(connectionString, {
          user,
          pass,
          connectTimeoutMS: 1000 * 60,
          ...options,
        })
        .then(() => {
          console.log(`Database connected`);
        })
        .catch((err: any) => {
          console.log(
            "MongoDB connection error. Please make sure MongoDB is running.\n" +
              err
          );
          process.exit(1);
        });

      const db = mongoose.connection;

      db.on("error", (err: any) => console.log("MongoDB error:\n" + err));
    }
  }
}

export { Mongoose };
