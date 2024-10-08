const db = require("../database/db");
const colors = require("colors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = "AnandSingh";

module.exports.insertUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await db.query(
      "SELECT * FROM heyplay_user WHERE email = $1",
      [email]
    );

    if (isUserExist.rowCount > 0) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const insertUser = await db.query(
        "INSERT INTO heyplay_user(email, password) VALUES($1, $2)",
        [email, hashedPassword]
      );

      if (insertUser.rowCount > 0) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).send({
          success: true,
          message: "User added successfully",
          token,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM heyplay_user WHERE email = $1", [
      email,
    ]);

    console.log(user.rows[0].id);
    const id = user.rows[0].id;

    if (user.rowCount === 0) {
      return res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error.message, colors.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
