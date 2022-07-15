import mongoose from "mongoose";
import { AccountRoles } from "../contants/enum";
import { loadEnvConfig } from "@next/env";
loadEnvConfig("./", process.env.NODE_ENV !== "production");

import { Mongoose, AccountFunctions } from "../database";
import bcrypt from "bcryptjs";
import "./model";

(async () => {
  try {
    console.log("Start setup...");

    await Mongoose.init();

    const adminAccount = await AccountFunctions.getOne({
      phone: process.env.DB_ADMIN_PHONE,
    });

    if (!adminAccount) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(
        process.env.DB_ADMIN_PASSWORD ?? "",
        salt
      );
      await AccountFunctions.create({
        name: "admin",
        phone: process.env.DB_ADMIN_PHONE,
        password,
        role: AccountRoles.admin,
      });
    }

    mongoose.connection.close();
    console.log("Setup successfully");
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
})();
