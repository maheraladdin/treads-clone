import * as mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: [true, "Please provide a title"],
        maxLength: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    replies: [
        {
            text: {
                type: String,
                required: true,
                maxLength: 300,
            },
            commentedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
},{timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;
