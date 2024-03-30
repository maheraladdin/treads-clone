import * as mongoose from "mongoose";


/**
 * User Schema
 * @param {String} name - User's name
 * @param {String} username - User's username
 * @param {String} email - User's email
 * @param {String} password - User's password
 * @param {String} profilePic - User's profile picture
 * @param {[String]} followers - List of user's followers
 * @param {[String]} following - List of user's following
 * @param {String} bio - User's bio
 * @param {Date} createdAt - Date user was created
 * @param {Date} updatedAt - Date user was last updated
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;