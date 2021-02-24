const router = require("express").Router();
const UserSchema = require("./schema");
const UserModel = require("mongoose").model("User", UserSchema);

const { generateJWT, verifyAccess } = require("./authTools");

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) throw new Error("Provide token");
    let catjson;
    const res = await fetch("http://cataas.com/cat?json=true");
    const data = await res.json();

    const verified = await verifyAccess(token);

    verified === true
      ? res.status(200).send({ url: catjso.url })
      : res.status(401).send({ message: "token not authorized" });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    });
  }
});

module.exports = router;
