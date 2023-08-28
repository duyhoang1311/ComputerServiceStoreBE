const LoaiDichVuModel = require('../models/loaidichvu.model');

class loaiDichVu {
    async taoloaidv(req, res) {
        const { tenloai, mota } = req.body;

        try {
            const available_tenloai = await LoaiDichVuModel.findOne({ tenloai });

            if (available_tenloai) return res.json({ success: false, message: 'Tên loại dịch vụ đã tồn tại' });

            const newLoaiDV = new LoaiDichVuModel({
                tenloai,
                mota,
            });

            const getNewLoaiDV = await newLoaiDV.save();
            return res.json({success: true, message: 'Tạo loại dịch vụ mới thành công', getNewLoaiDV})
        } catch (err) {
            res.json({ success: false, err });
        }
    }
}

module.exports = new loaiDichVu();
