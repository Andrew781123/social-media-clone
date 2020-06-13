const authorizeUser = (req, res, next) => {
  if (!req.user) {
    console.log("no user");
    return res.status(401).json({ message: "You are not authorized" });
  }
  next();
};

module.exports = authorizeUser;
