const User = require("../models/User");


class UserController {
    constructor() { }

    async updateUser(req, res) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SECRET)
                .toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.......!")
        } catch (err) {
            req.status(500).json(err);
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            // req.body.password;
            res.status(200).json({ ...others });
        } catch (err) {
            req.status(500).json(err);
        }
    }

    async getAllUsers(req, res) {
        const query = req.query.new
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async getUserStats(req, res) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project:
                    {
                        month: { $month: "$createdAt" }
                    },
                },
                {
                    $group:
                    {
                        _id: "$month",
                        total: { $sum: 1 },
                    }
                }
            ]);
            console.log(data);
            console.log("User data found");
            res.status(200).json(data);

        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;    