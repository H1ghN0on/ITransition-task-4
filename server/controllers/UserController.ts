import express from "express";
import { Op } from "sequelize";
import { IUserRequest } from "../types";

const { User } = require("../../models");

const blockUsers = async (users, toBlock) => {
  const userIds = users.map((user) => user.id);
  await User.update(
    {
      status: toBlock,
    },
    {
      where: {
        id: {
          [Op.or]: [userIds],
        },
      },
    }
  );
};

class UserController {
  async getAll(req: express.Request, res: express.Response) {
    if (req.user) {
      try {
        const users = await User.findAll();
        res.send({ status: "OK", users });
      } catch (error) {
        res.send({ status: "Error", users: "Problems with database" });
      }
    } else {
      res.send({ status: "Unauthorized" });
    }
  }

  async block(req: express.Request, res: express.Response) {
    if (req.user) {
      try {
        await blockUsers(req.body.users, 1);
        res.send({ status: "OK" });
      } catch (error) {
        res.send({ status: "Error", users: "Problems with database" });
      }
    } else {
      res.send({ status: "Unauthorized" });
    }
  }

  async unblock(req: express.Request, res: express.Response) {
    if (req.user) {
      try {
        await blockUsers(req.body.users, 0);
        res.send({ status: "OK" });
      } catch (error) {
        res.send({ status: "Error", users: "Problems with database" });
      }
    } else {
      res.send({ status: "Unauthorized" });
    }
  }

  async delete(req: express.Request, res: express.Response) {
    if (req.user) {
      try {
        const userIds = req.body.users.map((user) => user.id);
        await User.destroy({
          where: {
            id: {
              [Op.or]: [userIds],
            },
          },
        });
        res.send({ status: "OK" });
      } catch (error) {
        res.send({ status: "Error", users: "Problems with database" });
      }
    } else {
      res.send({ status: "Unauthorized" });
    }
  }

  async getMe(req: express.Request, res: express.Response) {
    if (req.user) {
      try {
        const user = await User.findOne({
          where: {
            id: req.user.data.id,
          },
        });
        res.send({ status: "OK", user });
      } catch (error) {
        res.send({ status: "Error", users: "Problems with database" });
      }
    } else {
      res.send({ status: "Unauthorized" });
    }
  }
}

export default new UserController();
