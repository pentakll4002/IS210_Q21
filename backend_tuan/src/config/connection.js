const oracledb = require("oracledb");
const { DataSource } = require("typeorm");
// Import tất cả các model bạn đã viết vào đây
const entities = require("./../model/entities"); // Đường dẫn đến file chứa NguoiDung, SanPham...

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: "C##TUANLE",
  password: "1234",
  connectString: "localhost:1522/xe",
  poolMin: 1,
  poolMax: 5,
  poolIncrement: 1,
  poolTimeout: 30,
};

let oracledbPool;
let typeOrmDataSource;

// 1. Hàm khởi tạo kết nối (Gồm cả Pool thuần và TypeORM)
async function initializeDatabase() {
  try {
    // Khởi tạo Pool bằng node-oracledb thuần trước
    oracledbPool = await oracledb.createPool(dbConfig);
    console.log("🚀 1. Oracle Connection Pool thuần đã sẵn sàng!");

    // Khởi tạo TypeORM DataSource dựa trên kết nối hiện tại
    typeOrmDataSource = new DataSource({
      type: "oracle",
      // Cung cấp lại thông tin kết nối giống hệt Pool cho TypeORM
      host: "localhost",
      port: 1522,
      username: dbConfig.user,
      password: dbConfig.password,
      sid: "xe", // Hoặc serviceName tùy thuộc vào phiên bản của bạn
      synchronize: false, // Để false để tránh xung đột cấu hình bảng có sẵn
      logging: true,
      entities: Object.values(entities), // Tự động nạp toàn bộ EntitySchema từ file entities
    });

    await typeOrmDataSource.initialize();
    console.log("🎉 2. TypeORM DataSource đã kết nối thành công!");

  } catch (err) {
    console.error("❌ Lỗi khởi tạo Database:", err);
    process.exit(1);
  }
}

// 2. Hàm bốc kết nối thuần (Dùng khi cần viết raw SQL bằng node-oracledb)
async function getRawConnection() {
  return oracledb.getConnection();
}

// 3. Hàm lấy TypeORM DataSource (Dùng để tạo Repository)
function getDataSource() {
  if (!typeOrmDataSource) {
    throw new Error("Database chưa được khởi tạo!");
  }
  return typeOrmDataSource;
}

module.exports = {
  initializeDatabase,
  getRawConnection,
  getDataSource,
};