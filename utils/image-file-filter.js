const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only accept jpg, png or svg"));
  }
};

module.exports = fileFilter;
