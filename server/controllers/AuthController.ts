import express from "express";

const { User } = require("../../models");

type UserData = {
  username: string;
  password: string;
  email: string;
};

type Status = {
  status: "OK" | "Error";
  message: string;
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

const addUserToDatabase = async (
  userData: UserData
): Promise<Status | UserData> => {
  try {
    return await User.create(userData);
  } catch (error) {
    return {
      status: "Error",
      message: "Some problems with DB",
    };
  }
};

class AuthController {
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
}

export default new AuthController();
