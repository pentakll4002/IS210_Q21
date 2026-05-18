/* eslint-disable prettier/prettier */
const { getDataSource } = require("./../config/connection");
const { NguoiDung, SanPham, DonHang } = require("./../model/entities");

// Hàm helper để lấy repository động sau khi DB đã kết nối
const getRepository = (entity) => {
  return getDataSource().getRepository(entity);
};

// Định nghĩa các Repository cụ thể cho từng Model
const UserRepository = {
  getRepo: () => getRepository(NguoiDung),

  // Bạn có thể viết thêm các hàm xử lý logic riêng (Custom Method) tại đây
  async findByEmail(email) {
    return this.getRepo().findOne({ where: { Email: email } });
  },

  async checkExist(manguoidung) {
    const user = await this.getRepo().findOne({ where: { Manguoidung: manguoidung } });
    return !!user;
  }
};

const ProductRepository = {
  getRepo: () => getRepository(SanPham),

  async findAvailableProducts() {
    return this.getRepo().find({
      where: { TrangThai: "CONHANG" },
      relations: ["danhmuc", "thuonghieu"] // Tự động join bảng danh mục & thương hiệu
    });
  }
};

const OrderRepository = {
  getRepo: () => getRepository(DonHang),

  async getOrderDetails(madonhang) {
    return this.getRepo().findOne({
      where: { Madonhang: madonhang },
      relations: ["nguoiDung", "chiTietDonHang", "chiTietDonHang.sanpham"]
    });
  }
};

module.exports = {
  UserRepository,
  ProductRepository,
  OrderRepository
};