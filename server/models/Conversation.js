
const mongoose = require("mongoose");

const conversationSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }]
});

module.exports = mongoose.model("Conversation", conversationSchema);