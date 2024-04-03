import {atom} from "recoil";

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

type User = {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePic: string;
    followers: string[];
    following: string[];
    bio: string;
    createdAt: Date;
    updatedAt: Date;
} | null;

export const userAtom = atom<User>({
  key: "userAtom",
  default: null,
});