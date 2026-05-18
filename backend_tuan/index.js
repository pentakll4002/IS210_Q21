const express = require("express");
const { initializeDatabase } = require("./src/config/connection");
const {
  ProductRepository,
  UserRepository,
} = require("./src/repository/repositories");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Khởi chạy Database trước khi mở Port Server
initializeDatabase().then(() => {
  // API 1: Lấy danh sách sản phẩm còn hàng bằng Repository Custom Method
  app.get("/api/products", async (req, res) => {
    try {
      const products = await ProductRepository.findAvailableProducts();
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API 2: Tạo người dùng mới sử dụng Repository mặc định (dùng qua .getRepo())
  app.post("/api/users", async (req, res) => {
    try {
      const body = req.body;

      // Kiểm tra trùng mã
      const isExist = await UserRepository.checkExist(body.Manguoidung);
      if (isExist)
        return res.status(400).json({ message: "Mã người dùng đã tồn tại!" });

      // Lưu user
      const userRepo = UserRepository.getRepo();
      const userMoi = userRepo.create(body); // Tạo thực thể map với schema
      const kq = await userRepo.save(userMoi); // Lưu xuống Oracle

      res.json({ success: true, data: kq });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.listen(3000, () => {
    console.log("🚀 Server Express đang chạy tại cổng 3000");
  });
});
