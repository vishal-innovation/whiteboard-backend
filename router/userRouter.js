const router = require("express").Router();
const User = require("../models/users");
const Sketch = require("../models/sketch");
const { updateOne } = require("../models/users");

router.route("/user").get((req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send("Error: " + err));
});

// register route
router.route("/register").post((req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((resData) =>
      res.send({
        userid: resData._id,
        username: resData.username,
        email: resData.email,
        fullname: resData.firstname + " " + resData.lastname,
      })
    )
    .catch((err) => res.status(400).send("Error: " + err));
});

// login route
router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const getUser = await User.findOne({ email: email });
    if (getUser && getUser.password === password) {
      const { _id, email, firstname, lastname } = getUser;
      res.send({ _id, email, firstname, lastname });
    }
  } catch (error) {
    res.send(error);
  }
});

// sketch post
router.route("/sketch").put(async (req, res) => {
  try {
    const getUser = await Sketch.findOne({ userid: req.body.userid });
    if (getUser) {
      const updateSketch = await Sketch.updateOne({
        sketchUrl: req.body.sketchUrl,
      }).lean();
      res.send(updateSketch);
    } else {
      const sketchFound = await new Sketch(req.body);
      sketchFound.save().then((resData) => res.send(resData));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error: " + error);
  }
});

// sketch get
router.route("/usersketch").get((req, res) => {
  Sketch.find()
    .then((sketch) => res.send(sketch))
    .catch((err) => res.status(400).send("Error: " + err));
});

module.exports = router;
