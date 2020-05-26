const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Profile = require("../models/Profile");


module.exports.getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            members: req.params.profileId
        }).populate("members");
        console.log(conversations);
        if (!conversations) {
            return res.status(404).json({ err: "Conversations are not found" });
        }
        res.status(200).json({ conversations, msg: "Conversations returned successfully" });
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports.createConversation = async (req, res, next) => {
    try {
        const recipient = await Profile.findById(req.body.recipientId);
        const sender = await Profile.findById(req.body.senderId);
        if (!recipient || !sender) {
            return res.status(404).json({ err: "Profiles are not found" });
        }
        let conversation = await Conversation.findOne({
            "$and": [
                { members: { "$all": [req.body.senderId, req.body.recipientId] } },
                { members: { "$size": 2 } }
            ]
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [req.body.senderId, req.body.recipientId]
            });
        }
        res.status(200).json({ conversation, msg: "Conversation created successfully" });
    } catch (err) {
        res.status(400).json(err.message);
    }

}