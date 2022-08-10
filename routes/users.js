const router = require("express").Router();
const { SignInHandle, SignUpHandle } = require("../controller/users");

//login
router.post("/signin", SignInHandle);

//register
router.post("/signup", SignUpHandle);

module.exports = router;

//buka lagu lah biar tak bosan , pelankan suaranya tapi
