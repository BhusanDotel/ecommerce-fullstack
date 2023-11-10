const UsersData = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  if (req.body) {
    const { fName, lName, address, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const emailExists = await UsersData.findOne({ email: email });
      if (emailExists) {
        res.json("Email exists");
      } else {
        UsersData.create({
          isAdmin: email === "bhusandotel1@gmail.com",
          firstName: fName,
          lastName: lName,
          address: address,
          email: email,
          password: hashedPassword,
        });
        res.json("registered successfull");
      }
    } catch (error) {}
  }
};

const secretKey = "random secert key";
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await UsersData.findOne({ email: email });
    if (emailExists) {
      const passwordMath = await bcrypt.compare(password, emailExists.password);
      if (passwordMath) {
        if (emailExists.isAdmin === true) {
          const uId = {
            id: emailExists._id,
          };
          const admin_token = jwt.sign(uId, secretKey);
          return res.json({ authToken_admin: admin_token });
        } else {
          const uId = {
            id: emailExists._id,
          };
          const user_token = jwt.sign(uId, secretKey);
          return res.json({ authToken_user: user_token });
        }
      } else {
        res.send("not exists");
      }
    } else {
      res.send("not exists");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  register,
  login,
};
