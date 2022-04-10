import express from "express";
import generateJWT from "../utils/generateJWT";
import { IUserRequest } from "../types";
const { User } = require("../../models");

export type UserData = {
  username: string;
  password: string;
  email: string;
};

type Status = {
  status: "OK" | "Error";
  user?: UserData;
  message: string;
};

const generateCurrentDate = () => {
  const today = new Date();
  const date =
    String(today.getDate()).padStart(2, "0") +
    "/" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "/" +
    today.getFullYear();
  const time =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0");
  return date + " " + time;
};

const checkEmailUnique = async (userEmail: string) => {
  const user = await User.findOne({
    where: {
      email: userEmail,
    },
  });
  return user == null ? true : false;
};

const checkUserNameUnique = async (userName: string) => {
  const user = await User.findOne({
    where: {
      username: userName,
    },
  });
  return user == null ? true : false;
};

const validateUnique = async (userData: UserData): Promise<Status> => {
  if (!(await checkEmailUnique(userData.email))) {
    return {
      status: "Error",
      message: "This email is registered. Try another one",
    };
  }
  if (!(await checkUserNameUnique(userData.username))) {
    return {
      status: "Error",
      message: "This username is taken. Try another one",
    };
  }
  return { status: "OK", message: "" };
};

const addUserToDatabase = async (userData: UserData): Promise<Status> => {
  try {
    const dbUser = await User.create(userData);
    const user = Object.assign(dbUser.dataValues, {
      token: generateJWT(dbUser),
    });
    await dbUser.update({
      loginDate: generateCurrentDate(),
    });
    await dbUser.save();
    return {
      status: "OK",
      user,
      message: "",
    };
  } catch (error) {
    return {
      status: "Error",
      message: "Some problems with DB",
    };
  }
};

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  async register(req: express.Request, res: express.Response) {
    const userData = req.body;
    const validation = await validateUnique(userData);
    if (validation.status === "OK") {
      const registerStatus = await addUserToDatabase(userData);
      res.send(registerStatus);
    } else {
      res.send(validation);
    }
  }

  async loginForPassport(login_username: string, login_password: string, done) {
    let dbUser = await User.findOne({
      where: {
        username: login_username,
        password: login_password,
      },
    });
    if (dbUser) {
      await dbUser.update({
        loginDate: generateCurrentDate(),
      });
      await dbUser.save();
      const user = Object.assign(dbUser.dataValues, {
        token: generateJWT(dbUser),
      });
      return done(null, { user, status: "OK", message: "" });
    } else {
      return done(null, { status: "Error", message: "Unknown user" });
    }
  }
}

export default new AuthController();
