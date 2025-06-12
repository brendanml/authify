import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import User from "../models/userModel";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user._id);
});
``
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return done(new Error("User not found"));
    }
    // @ts-ignore
    done(null, user);
  } catch (error) {
    done(error);
  }
});