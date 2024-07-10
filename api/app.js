var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const tinify = require("tinify");
tinify.key = process.env.TINIFY_KEY;
// C:\Users\Right.79\Downloads\dm_images\industry\images\wedding_logo
const downloaded = path.join(
  __dirname +
    "../../../../Downloads/"
);
const upload = multer({ dest: "uploads/" });

app.post(
  "/profile",
  upload.fields([{ name: "file", maxCount: [] }]),
  function (req, res, next) {
    let responses;
    try {
      for (let index = 0; index < req.files.file.length; index++) {
        if (
          ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
            req.files.file[index].mimetype
          )
        ) {
          let originalname = req.files.file[index].originalname;
          let file_path = req.files.file[index].path;
          // console.log("file_path", index);
          var source = tinify.fromFile(file_path);
       //   console.log("downloaded + originalname", downloaded);
          source.toFile(downloaded + originalname);
          responses = 'Successfully Compress'
        } else responses =("GIF not allowed");
      }
      return res
        .status(200)
        .send({ response: responses  });
    } catch (e) {
      return res.status(500).send({ response: "Error please try again." });
    }
  }
);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
