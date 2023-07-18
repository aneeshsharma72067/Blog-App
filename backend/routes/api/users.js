const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");
const requireAuth = require("../../middleware/requireAuth");

router.use(requireAuth);
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ error: err }));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ msg: "User Not Found" }));
});

router.delete("/", (req, res) => {
  User.deleteMany({})
    .then(() => res.json({ msg: "All Users Removed" }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
