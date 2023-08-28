const HoaDonModel = require('../models/hoadon');

class UserController {
    // [POST] /api/user/hoa-don
    async laphoadon(req, res) {
        const { ngaytao, chiphi, user } = req.body;

        try {
            const newHoaDon = new HoaDonModel({
                ngaytao,
                chiphi,
                user,
            });
            const HoaDon = await newHoaDon.save();

            return res.json({ success: true, message: 'Lap hoa don thanh cong', HoaDon });
        } catch (err) {
            res.status(400).json({ message: 'FAILLLL', err });
        }
    }
}

module.exports = new UserController();
