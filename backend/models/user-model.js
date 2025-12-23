const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            min: [3, "Name should contain atleast 3 characters."],
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            min: [8, "Password should be atleast 8 characters."],
            select: false,
        },

        voult: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Voult",
            },
        ],

        // password reset
        resetOtp: {
            type: String,
        },

        resetOtpExpiry: {
            type: Date,
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
