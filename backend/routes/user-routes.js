const express = require("express");
const { registerUser, loginUser, logoutUser, userProfile, sendResetPasswordOtp, verifyResetPasswordOtp, passwordResetUpdate } = require("../controllers/auth-controller");
const { userAuth } = require("../middlewares/auth-middleware");
const router = express.Router();



router.get("/", (req, res) => {
	res.send("user page");
});

router.post("/register", registerUser);
router.post("/sign-in", loginUser);

router.get("/logout", userAuth, logoutUser);

router.get("/profile", userAuth, userProfile)

router.post("/passwords/forgot/reset", sendResetPasswordOtp);

router.post("/password/forgot/reset/otp-verification", verifyResetPasswordOtp);

router.put("/password/forgot/reset/update", passwordResetUpdate)

module.exports = router;