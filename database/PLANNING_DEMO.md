# 📋 KẾ HOẠCH & HƯỚNG DẪN DEMO: SNEAKERSHOP (APP & DBEAVER)

Tài liệu này hướng dẫn chi tiết cách chạy hệ thống Web App và cách thiết lập DBeaver để thực thi 3 script demo giao tác, phục hồi và hiệu năng phục vụ buổi báo cáo.

---

## 💻 PHẦN 1: KHỞI ĐỘNG HỆ THỐNG WEB APP

Hệ thống SneakerShop đã được cấu hình chạy đồng thời cả Backend (.NET 10) và Frontend (Vite) chỉ bằng **1 lệnh duy nhất** ở thư mục gốc.

### Các bước chạy:
1. Mở ứng dụng **Terminal/PowerShell** trên máy tính.
2. Di chuyển đến thư mục project: `cd c:\HQT\sneaker-shop`
3. Chạy lệnh:
   ```bash
   npm run dev
   ```
4. **Kiểm tra trạng thái**:
   - Backend sẽ chạy tại: `http://localhost:5000`
   - Frontend sẽ chạy tại: `http://localhost:5173`
   - Mở trình duyệt web truy cập `http://localhost:5173`. Huy hiệu trạng thái kết nối ở trang chủ sẽ hiển thị màu xanh: **"Oracle DB - localhost:1521/orcl2 - Connected"**.

---

## 🗄 PHẦN 2: THIẾT LẬP VÀ CHẠY SCRIPT TRÊN DBEAVER

Để chạy các file SQL và hiển thị được kết quả in từ PL/SQL (`DBMS_OUTPUT`), làm theo các bước sau:

### Bước 1: Kết nối Oracle Database
*   **Host**: `localhost` | **Port**: `1521`
*   **Database/Service Name**: Chọn `Service Name` và điền `orcl2`
*   **Username**: `system` | **Password**: `123456`

### Bước 2: Bật tính năng hiển thị kết quả (DBMS Output) - BẮT BUỘC
Nếu không bật bước này, DBeaver sẽ không in các dòng phân tích chữ ra màn hình:
1. Nhấp chuột phải vào kết nối vừa tạo → Chọn **SQL Editor** → **Open SQL console**.
2. Tìm tab **Output** hoặc **DBMS Output** (Biểu tượng màn hình terminal nhỏ ở góc dưới hoặc thanh công cụ bên phải SQL Editor).
3. Nhấp vào nút **Enable DBMS Output** (Biểu tượng nút Play màu xanh hoặc icon nguồn màu cam trên thanh công cụ của tab đó) để chuyển trạng thái sang **Enabled**.

### Bước 3: Mở và chạy các file SQL
1. Chọn **File** → **Open File...** → Tìm đến thư mục `c:\HQT\sneaker-shop\database\`.
2. Chọn lần lượt các file: `demo_dirty_read.sql`, `demo_recovery.sql`, `demo_benchmark.sql`.
3. Để thực thi toàn bộ file, nhấn tổ hợp phím **`Alt + X`** (hoặc nhấn nút *Execute SQL Script* - biểu tượng tờ giấy có nút Play nhỏ ở thanh công cụ bên trái).
4. Đọc kết quả chạy chi tiết ở tab **Output**.

---

## 🎭 PHẦN 3: KỊC BẢN DEMO ĐỐI CHIẾU APP ↔ DATABASE

Để buổi thuyết trình đạt điểm tối đa, anh hãy chia đôi màn hình: **1 bên là Web App, 1 bên là DBeaver**.

```
+------------------------------------+------------------------------------+
|                                    |                                    |
|          MÀN HÌNH WEB APP          |         MÀN HÌNH DBEAVER           |
|      (Giao diện đặt hàng, admin)   |    (Xem các bảng, chạy script SQL) |
|                                    |                                    |
+------------------------------------+------------------------------------+
```

### Kịch bản 1: Mua hàng & Kích hoạt chuỗi Trigger tự động (Trigger Chain)
*   **Trên Web App:**
    1. Đăng nhập tài khoản khách: `an.nguyen@email.com` / `123456`.
    2. Chọn 1 sản phẩm còn ít tồn kho (ví dụ: Nike P-6000), bấm **Đặt Hàng**.
*   **Trên DBeaver:**
    *   Chạy câu lệnh: `SELECT * FROM DONHANG ORDER BY NgayDat DESC;`
    *   **Giải thích với thầy cô:** Ngay khi app gọi lệnh đặt hàng, CSDL Oracle tự động kích hoạt chuỗi Trigger:
        - `TRG_TINH_THANHTIEN`: Tự tính tiền chi tiết sản phẩm.
        - `TRG_TRU_TONKHO`: Tự trừ số lượng giày trong kho.
        - `TRG_CAPNHAT_TONGTIEN_DH`: Tự cộng tiền, tính thuế VAT và phí ship cập nhật trực tiếp vào đơn hàng trên DB mà app không cần tính toán thủ công.
        - `TRG_THONGBAO_DATHANG`: Tự tạo một thông báo đặt hàng thành công gửi tới tài khoản.

---

### Kịch bản 2: Concurrency - Ngăn chặn Dirty Read bằng MVCC
*   **Câu hỏi đặt ra:** *"Khi khách A đang thực hiện đặt hàng (kho đang trừ từ 14 xuống 13 nhưng chưa commit), khách B vào xem thì thấy tồn kho bao nhiêu?"*
*   **Chứng minh trên DBeaver:**
    *   Mở file `demo_dirty_read.sql` và chạy **Demo 2.1 & 2.2**.
    *   **Giải thích:** Nhờ cơ chế **READ COMMITTED + MVCC** của Oracle, khách B khi load trang web sẽ đọc phiên bản dữ liệu cũ an toàn trong Undo Segment (vẫn thấy tồn kho là 14). Chỉ khi nào A bấm nút thanh toán hoàn tất (giao dịch `COMMIT`), số lượng 13 mới hiển thị cho người khác. Hiện tượng đọc dữ liệu bẩn (Dirty Read) hoàn toàn bị triệt tiêu.

---

### Kịch bản 3: Phòng chống Lost Update (Mua hàng đồng thời)
*   **Trên Web App:**
    1. Mở 2 tab trình duyệt (1 tab thường, 1 tab ẩn danh).
    2. Đăng nhập 2 tài khoản khác nhau, cùng mở sản phẩm chỉ còn 1 đôi cuối cùng.
    3. Cùng bấm **Đặt hàng** đồng thời.
*   **Giải thích bằng DBeaver (Demo 2.4):**
    *   Backend của app cập nhật kho bằng lệnh: `UPDATE SANPHAM SET SoLuong = SoLuong - N`.
    *   Do đó, Oracle sẽ khóa dòng (Row-level Lock). Người bấm trước 0.01 giây sẽ giữ khóa và mua thành công. Người bấm sau bị chặn bởi trigger trừ tồn kho và app trả về lỗi *"Sản phẩm đã hết hàng"* thay vì để kho bị âm.

---

### Kịch bản 4: Phân trang (Pagination) tối ưu hóa truy vấn
*   **Trên Web App:**
    1. Đăng nhập tài khoản admin: `admin@sneakershop.com` / `123456`.
    2. Vào trang quản lý của Admin, chỉ ra tính năng phân trang **12 sản phẩm/trang**.
*   **Giải thích bằng DBeaver (Demo 4 - Benchmark):**
    *   Show kết quả chạy `demo_benchmark.sql` ở tab Output. 
    *   Giải thích: Lệnh `SELECT` bình thường mất **0.03ms**, nhưng `SELECT JOIN` 3 bảng mất **0.12ms**. Nếu CSDL có hàng chục ngàn sản phẩm, việc load tất cả sẽ làm treo trang web. Phân trang bằng `OFFSET...FETCH NEXT` ở DB giúp thời gian phản hồi luôn ở mức cực nhanh (< 0.1ms).
