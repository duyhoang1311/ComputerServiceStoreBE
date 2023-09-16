const DichVu = require('../models/dichvu.model');

class DichVuController {
    async getAllDichVu(req, res) {
        try {
            const allDichVu = await DichVu.find();
            res.json({ success: true, message: 'Lấy tất cả dịch vụ thành công', data: allDichVu });
        } catch (error) {
            res.json({ success: false, message: 'Không thể lấy tất cả dịch vụ' });
        }
    }

    async themDichVu(req, res) {
        try {
            const { tendichvu, mota, chiphi, tgdukien, tgbaohanh, loaidichvu } = req.body;

            if (!tendichvu || !mota || !chiphi || !tgdukien || !tgbaohanh) {
                return res.json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin' });
            }

            const alreadyDichVu = await DichVu.findOne({ tendichvu });

            if (alreadyDichVu) {
                return res.json({ success: false, message: 'Tên dịch vụ đã tồn tại' });
            }

            // Chuyển đổi số thành chuỗi và định dạng chuỗi
            const formatChiPhi = chiphi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            console.log(formatChiPhi);

            const newDichVu = new DichVu(req.body);
            const savedDichVu = await newDichVu.save();

            res.json({ success: true, message: 'Thêm dịch vụ mới thành công', savedDichVu });
        } catch (error) {
            res.json({ success: false, message: 'Thêm dịch vụ mới thất bại', error });
        }
    }
}

module.exports = new DichVuController();
