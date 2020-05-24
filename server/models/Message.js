const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import dbConnection from "./../db/mongoose";

const MessageSchema = new Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    }
);

module.exports = dbConnection.model("Message", MessageSchema);