const users = require("./controllers/user.controller.js");
const sessions = require("./controllers/session.controller");
const logToFile = require("./logger");

exports.login = async (req, res) => {
  let user = await users.findByUsername(req, res);
  // if the user exists and password matches
  logToFile(`Login request initiated by user ${user.id}.`);
  if (user && user.id && user.password === req.body.password) {
    // search for a session for this user
    let session = await sessions.findByUserId(user.id);

    // if there is a session, check if it's expired
    let isTokenExpired = session
      ? new Date(session.validUntil) - new Date() <= 0
      : true;
    var token = "";

    // if the session exists and is not expired, continue
    // else, create a session
    if (session && !isTokenExpired) {
      logToFile(`A session already exists for user ${user.id}, logging in.`);
      token = session.token;
    } else {
      logToFile(`Creating new session for user ${user.id}, logging in.`);
      session = await sessions.create(user.id);
      if (session) {
        token = session.token;
      }
    }
    res.send(JSON.stringify({ token: token }));
  } else {
    logToFile(`Access denied to user ${user.id}.`);
    res.status(403).send("Access denied");
  }
};

exports.isLoggedIn = async (req, res) => {
  const token = req.get("Authorization");
  logToFile(`Login check requested for token ${token}.`);
  if (token) {
    let session = await sessions.findByToken(token);
    if (session) {
      let isTokenExpired = new Date(session.validUntil) - new Date() <= 0;
      if (session && !isTokenExpired) {
        logToFile(
          `The token ${token} is OK and valid until ${session.validUntil}`
        );
        return true;
      }
      logToFile(`The token ${token} is expired.`);
      return false;
    }
    logToFile(`The token ${token} does not correspond to a session.`);
    return false;
  }
  logToFile(`The token is an empty or invalid string.`);
  return false;
};
