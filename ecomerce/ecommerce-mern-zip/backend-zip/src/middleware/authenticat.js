const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "Token not found" });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.findUserById(userId);

        if (!user) {
            return res.status(401).send({ message: "Invalid token: user not found" });
        }

        req.user = user;
        next(); // ✅ Only after success
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;
