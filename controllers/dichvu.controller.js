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

    async xoaDichVu(req, res) {
        try {
            const deletedDichVu = await DichVu.findByIdAndDelete(req.params._id, req.body);

            if (!deletedDichVu) {
                return res.json({ success: false, message: `Không tìm thấy dịch vụ với id ${req.params._id}` });
            }

            res.json({ success: true, message: 'Xóa dịch vụ thành công', deletedDichVu });
        } catch (error) {
            res.json({ success: false, message: 'Không thể xóa dịch vụ', error });
        }
    }

    async suaDichVu(req, res) {
        try {
            const idDichVu = req.params._id;
            const updatedDichVu = req.body;

            const checkedDichVu = await DichVu.findByIdAndUpdate(idDichVu, updatedDichVu, { new: true });

            if(!checkedDichVu) {
                res.json({success: false, message: `Không thể tìm thấy dịch vụ với ${idDichVu}`})
            }
            res.json({success: true, message: 'Cập nhật dịch vụ thành công', checkedDichVu})
        } catch (err) {
            res.json({ success: false, message: 'Không thể cập nhật dịch vụ', err });
        }
    }
}

module.exports = new DichVuController();
