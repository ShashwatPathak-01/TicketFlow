import User from "../models/User.js";

export const getSupportAgents = async (req, res) => {
    try {

        const agents = await User.find({
            role: "SupportAgent",
        }).select("name email");

        res.json({
            success: true,
            agents,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};