const router = require('express').Router();
// const { posts } = require('../controller/posts');
// const upload = require('../controller/posts');
const {storage,bucket, getFileData} = require('../controller/posts')
const multer = require('multer');
const upload = multer({storage:storage});


router.post("/upload", upload.single("file"), (req, res) => {
    res.status(200)
      .send("File uploaded successfully");
  });
router.get("/:id", getFileData);
  

module.exports = router;
