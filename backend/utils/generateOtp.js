const crypto = require("crypto");

const generateOtp =  () => {
	const otp = crypto.randomInt(1000, 9999);
	return otp;
}

module.exports = { generateOtp };