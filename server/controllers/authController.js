const UsersData = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const register = async (req, res) => {
  if (req.body) {
    const { fName, lName, address, email, password } = req.body;
    if (fName && lName && address && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const emailExists = await UsersData.findOne({ email: email });
        if (emailExists) {
          res.json("Email exists");
        } else {
          const otp = otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
            alphabets: false,
          });

          UsersData.create({
            isAdmin: email === "bhusandotel1@gmail.com",
            userToken: "",
            adminToken: "",
            firstName: fName,
            lastName: lName,
            address: address,
            email: email,
            password: hashedPassword,
            otp: otp,
            isVerified: false,
          });
          const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Email Verification Kindim na ta",
            text: `Your OTP for email verification is: ${otp}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Failed to send verification email:", error);
              return res.json("Failed to send verification email");
            }

            console.log("Verification email sent");
            return res.json("Verification email sent");
          });
        }
      } catch (error) {}
    }
  }
};

// const secretKey = "random secert key";
const secretKey = process.env.SECRET_KEY;
const login = async (req, res) => {
  if (req.body) {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const emailExists = await UsersData.findOne({ email: email });
        if (emailExists) {
          if (emailExists.isVerified === true) {
            const passwordMath = await bcrypt.compare(
              password,
              emailExists.password
            );
            if (passwordMath) {
              if (emailExists.isAdmin === true) {
                const uId = {
                  id: emailExists._id,
                };
                const admin_token = jwt.sign(uId, secretKey);
                emailExists.userToken = admin_token;
                emailExists.adminToken = admin_token;
                await emailExists.save();
                return res.json({
                  admin: {
                    authToken_admin: admin_token,
                    firstName: emailExists.firstName,
                    lastName: emailExists.lastName,
                  },
                });
              } else {
                const uId = {
                  id: emailExists._id,
                };
                const user_token = jwt.sign(uId, secretKey);
                emailExists.userToken = user_token;
                await emailExists.save();
                // return res.json({ authToken_user: user_token });
                return res.json({
                  user: {
                    authToken_user: user_token,
                    firstName: emailExists.firstName,
                    lastName: emailExists.lastName,
                  },
                });
              }
            } else {
              res.send("not exists");
            }
          } else {
            res.json("not verified");
            const otp = otpGenerator.generate(6, {
              upperCase: false,
              specialChars: false,
              alphabets: false,
            });

            emailExists.otp = otp;
            await emailExists.save();

            const mailOptions = {
              from: process.env.GMAIL_USER,
              to: email,
              subject: "Email Verification Kindim na ta",
              text: `Your OTP for email verification is: ${otp}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Failed to send verification email:", error);
                return res.json("Failed to send verification email");
              }

              console.log("Verification email sent");
              return res.json("Verification email sent");
            });
          }
        } else {
          res.send("not exists");
        }
      } catch (error) {
        res.send(error);
      }
    }
  }
};

const verify = async (req, res) => {
  if (req.body) {
    const { email, otp } = req.body;
    if (email && otp) {
      try {
        const emailExists = await UsersData.findOne({ email: email });
        if (emailExists) {
          if (emailExists.otp === otp) {
            emailExists.isVerified = true;
            await emailExists.save();
            res.json("verified");
          } else {
            res.json("invalid otp");
          }
        } else {
          res.send("not exists");
        }
      } catch (error) {
        res.send(error);
      }
    }
  }
};

module.exports = {
  register,
  verify,
  login,
};
