var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");
const auth = require("../auth.js");

// Login middleware
router.use(async (req, res, next) => {
    let isLoggedIn = await auth.isLoggedIn(req, res)

    // if logged in, proceed to route
    // else, say the access is denied
    if (isLoggedIn) {
        next()
    } else {
        res.status(403).send("Access denied")
    }
})

// Create a new User
router.post("/", users.create);

// Retrieve all Users
router.get("/", users.findAll);


module.exports = router;
