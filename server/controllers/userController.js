const { User, Room, Message } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class userController {
  static async register(req, res) {
    const { username } = req.body;

    try {
      const { username, email, password } = req.body;

      const user = await User.create({ username, email, password });

      res.status(201).json({
        message: "Success create new user",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "InvalidLogin" };

      // proses nyari user bedasarkan email
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "LoginError" };

      if (!compare(password, user.password)) throw { name: "LoginError" };

      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
        // role: user.role
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
        payload,
      });
      next();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = userController;
