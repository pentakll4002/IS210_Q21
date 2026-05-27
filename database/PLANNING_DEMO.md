# KẾ HOẠCH DEMO TRỰC TIẾP — IS210

## Thứ tự demo (ước tính ~15 phút)

### Phần 1: Giới thiệu hệ thống (2 phút)
- [ ] Mở web app SneakerShop (`http://localhost:5173`)
- [ ] Show giao diện: trang chủ → sản phẩm → đặt hàng
- [ ] Login admin (`admin@sneakershop.com` / `123456`)
- [ ] Show Admin Dashboard: quản lý SP, đơn hàng, pagination
- [ ] Nói qua kiến trúc: React + .NET + Oracle 19c

### Phần 2: Demo Schema + Triggers (3 phút)
- [ ] Mở SQL Developer / SQLPlus
- [ ] Show lược đồ 25 bảng: `schema_new.sql`
- [ ] Demo trigger chain khi đặt hàng:
  ```
  INSERT CHITIETDONHANG → T1 tính ThanhTien
                        → T2 trừ tồn kho
                        → T4 cập nhật trạng thái SP
                        → T5 cập nhật TongCong đơn hàng
  INSERT DONHANG        → T8 gửi thông báo
  ```
- [ ] Show stored procedure DAT_HANG (kiểm tra tồn kho)

### Phần 3: Demo Dirty Read (3 phút)
```bash
sqlplus system/123456@localhost:1521/orcl2 @demo_dirty_read.sql
```
- [ ] **Demo 2.1:** Session A update chưa commit → Session B đọc giá trị cũ
- [ ] **Demo 2.2:** Autonomous Transaction chứng minh MVCC
- [ ] **Demo 2.4:** Lost Update → khắc phục bằng `SoLuong = SoLuong - N`
- [ ] Giải thích bảng Isolation Level

### Phần 4: Demo Recovery (3 phút)
```bash
sqlplus system/123456@localhost:1521/orcl2 @demo_recovery.sql
```
- [ ] Show cấu hình Redo Log thực tế (3 groups × 200MB)
- [ ] Demo T1 commit thành công → T2 crash giữa chừng
- [ ] Show bảng Undo/Redo Log: COMMITTED vs ROLLED_BACK
- [ ] Giải thích ARIES 3 phases: Analysis → Redo → Undo
- [ ] Show WAL rule

### Phần 5: Demo Benchmark (2 phút)
```bash
sqlplus system/123456@localhost:1521/orcl2 @demo_benchmark.sql
```
- [ ] Chạy 5 bài test tự động
- [ ] Show bảng tổng hợp kết quả
- [ ] Nhấn mạnh: tất cả < 1ms, throughput > 1000 ops/s

### Phần 6: Q&A (2 phút)
- [ ] Chuẩn bị câu hỏi thường gặp (xem bên dưới)

---

## Câu hỏi thường gặp & cách trả lời

**Q: Tại sao dùng Oracle mà không dùng MySQL/PostgreSQL?**
> Oracle có MVCC mạnh nhất, hỗ trợ tốt Redo/Undo built-in, phù hợp cho enterprise e-commerce.

**Q: MVCC hoạt động như thế nào?**
> Oracle lưu nhiều phiên bản của mỗi row trong Undo Segments. Reader đọc snapshot tại thời điểm query bắt đầu, không bị ảnh hưởng bởi writer.

**Q: Tại sao WRITE chậm hơn READ?**
> Mỗi INSERT đơn hàng kích hoạt chuỗi 5 triggers (T1→T2→T4→T5→T8), mỗi trigger thực hiện thêm DML operations.

**Q: Lost Update khác Dirty Read như thế nào?**
> Dirty Read = đọc dữ liệu chưa commit. Lost Update = 2 transaction ghi đè nhau. Oracle ngăn Dirty Read tự động, nhưng Lost Update cần dev xử lý (dùng atomic update hoặc SELECT FOR UPDATE).

**Q: Checkpoint dùng để làm gì?**
> Checkpoint đánh dấu thời điểm mà tất cả dirty pages đã được ghi xuống disk. Khi recovery, hệ thống chỉ cần redo từ checkpoint cuối → tiết kiệm thời gian.

---

## Checklist trước buổi demo

- [ ] Oracle 19c đang chạy (`lsnrctl status`)
- [ ] Backend .NET đang chạy (`dotnet run`)
- [ ] Frontend đang chạy (`npm run dev`)
- [ ] SQL Developer / SQLPlus sẵn sàng
- [ ] 3 file demo đã test thành công
- [ ] Git đã push code mới nhất
