const express = require("express");
const router = express.Router();


router.get("/graficar/", (req, res) => {
    console.log("req.params: ",req.params,"req.query: ",req.query,"req.body: ",req.body);
    console.log("req.query.idIM: ",req.query.idIM)
  res.send("ok");
});

module.exports = router;
