# BÁO CÁO MÔN HỌC IS210 — HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU

## Đề tài: Thiết kế CSDL và Quản trị giao tác — SneakerShop E-commerce

**CSDL:** Oracle 19c Enterprise Edition  
**Backend:** .NET 10.0 + Entity Framework Core  
**Frontend:** React + TypeScript + Vite  

---

## PHẦN 1: THIẾT KẾ MÔ HÌNH DỮ LIỆU QUAN HỆ

### 1.1 Cơ sở lý thuyết

**Mô hình quan hệ (Relational Model)** do E.F. Codd đề xuất năm 1970, biểu diễn dữ liệu dưới dạng bảng (relation) với các đặc tính:
- Mỗi bảng có tên duy nhất
- Mỗi cột (attribute) có miền giá trị xác định
- Mỗi dòng (tuple) là duy nhất
- Thứ tự dòng/cột không quan trọng

**Chuẩn hóa dữ liệu** nhằm loại bỏ dư thừa và bất thường:
- **1NF:** Mỗi ô chứa giá trị nguyên tử (atomic)
- **2NF:** Không có phụ thuộc hàm bộ phận vào khóa chính
- **3NF:** Không có phụ thuộc bắc cầu (transitive dependency)

### 1.2 Áp dụng cho SneakerShop — Lược đồ 25 bảng

```
NGUOIDUNG ──┬── DONHANG ──── CHITIETDONHANG ──── SANPHAM ──┬── DANHMUC
            ├── GIOHANG ──── CHITIETGIOHANG                ├── THUONGHIEU
            ├── DANHGIA                                    ├── KICHCO_SANPHAM
            ├── THONGBAO                                   └── SANPHAM_KHUYENMAI ── KHUYENMAI
            ├── SANPHAM_YEUTHICH
            ├── LICHSUTIMKIEM         DONHANG ── THANHTOAN
            ├── DIACHI_GIAOHANG
            └── VOUCHER_NGUOIDUNG ── VOUCHER

NHACUNGCAP ── PHIEUNHAP ── CHITIETPHIEUNHAP
TINTUC ── BINHLUAN_TINTUC
BANG_MA_LOI (Error code lookup)
```

**Kiểm chứng chuẩn hóa:**

| Chuẩn | Yêu cầu | SneakerShop |
|-------|---------|-------------|
| 1NF | Giá trị nguyên tử | ✅ Tất cả cột đều atomic |
| 2NF | Không phụ thuộc bộ phận | ✅ Mỗi bảng dùng PK đơn (VD: Masanpham) |
| 3NF | Không phụ thuộc bắc cầu | ✅ ThanhTien tính tự động bởi trigger |

### 1.3 Đơn vị chương trình lưu trữ

#### 8 Triggers nghiệp vụ:

| # | Trigger | Bảng | Chức năng |
|---|---------|------|-----------|
| T1 | TRG_TINH_THANHTIEN | CHITIETDONHANG | Tự tính ThanhTien = SoLuong × DonGia |
| T2 | TRG_TRU_TONKHO | CHITIETDONHANG | Trừ tồn kho khi đặt hàng |
| T3 | TRG_CONG_LAI_TONKHO | CHITIETDONHANG | Cộng lại tồn kho khi hủy đơn |
| T4 | TRG_CAPNHAT_TRANGTHAI_SP | SANPHAM | Tự chuyển HETHANG ↔ CONHANG |
| T5 | TRG_CAPNHAT_TONGTIEN_DH | CHITIETDONHANG | Compound trigger cập nhật TongCong |
| T6 | TRG_TINH_THANHTIEN_PN | CHITIETPHIEUNHAP | Tính thành tiền phiếu nhập |
| T7 | TRG_CAPNHAT_PN_TONKHO | CHITIETPHIEUNHAP | Cập nhật tổng phiếu nhập + tồn kho |
| T8 | TRG_THONGBAO_DATHANG | DONHANG | Gửi thông báo khi đặt hàng |

#### 10 Stored Procedures:

| # | Procedure | Chức năng |
|---|-----------|-----------|
| P1 | INSERT_SANPHAM | Thêm sản phẩm mới |
| P2 | UPDATE_NGUOIDUNG | Cập nhật thông tin người dùng |
| P3 | DOI_MAT_KHAU | Đổi mật khẩu (kiểm tra cũ) |
| P4 | DAT_HANG | Đặt hàng (kiểm tra tồn kho) |
| P5 | HUY_DONHANG | Hủy đơn + hoàn tồn kho |
| P6 | THANH_TOAN_DONHANG | Thanh toán đơn hàng |
| P7 | THEM_DANHGIA | Thêm đánh giá sản phẩm |
| P8 | THEM_VAO_GIOHANG | Thêm vào giỏ hàng |
| P9 | BAO_CAO_DOANH_THU | Báo cáo doanh thu theo tháng |
| P10 | NHAP_HANG | Nhập hàng từ NCC |

**Scripts:** `schema_new.sql`, `triggers_procedures.sql`, `seed_data.sql`

---

## PHẦN 2: KIỂM SOÁT BẤT NHẤT QUÁN DỮ LIỆU

### 2.1 Cơ sở lý thuyết

**Dirty Read** xảy ra khi Transaction B đọc được dữ liệu mà Transaction A đã sửa nhưng CHƯA COMMIT. Nếu A ROLLBACK, B sẽ sử dụng dữ liệu sai (dữ liệu "bẩn").

**Oracle MVCC (Multi-Version Concurrency Control):**
- Mỗi row có nhiều phiên bản (multi-version)
- Reader KHÔNG block Writer và ngược lại
- Uncommitted data chỉ visible trong session thay đổi
- Session khác luôn đọc Consistent Snapshot (dữ liệu đã COMMIT)

**Isolation Levels:**

| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|:---:|:---:|:---:|
| READ UNCOMMITTED | Có thể | Có thể | Có thể |
| READ COMMITTED ★ | Không | Có thể | Có thể |
| REPEATABLE READ | Không | Không | Có thể |
| SERIALIZABLE | Không | Không | Không |

★ Oracle mặc định dùng READ COMMITTED

### 2.2 Kết quả thực nghiệm — Dirty Read

**Script:** `demo_dirty_read.sql`

**Demo 2.1 — Ngăn chặn Dirty Read:**
```
Sản phẩm: SP2000 (Nike P-6000), Tồn kho: 14

Transaction A: UPDATE SoLuong = 13 (CHƯA COMMIT) → dữ liệu "bẩn"
Transaction B: Đọc SoLuong = 14 → đọc giá trị CŨ (sạch)

=> DIRTY READ BỊ NGĂN CHẶN bởi Oracle MVCC!
Sau ROLLBACK: SoLuong = 14 → TOÀN VẸN
```

**Demo 2.2 — Chứng minh bằng Autonomous Transaction (2 session độc lập):**
```
Session A: UPDATE DiaChi = 'GIẢ' (CHƯA COMMIT)
Session B: Đọc DiaChi = '123 Nguyễn Huệ...' → giá trị CŨ

=> Session B KHÔNG thấy dữ liệu bẩn
=> MVCC hoạt động đúng!
```

### 2.3 Kết quả thực nghiệm — Lost Update

**Kịch bản lỗi:**
```
Tồn kho = 5
Khách A đọc: 5 → mua 2 → SET SoLuong = 3
Khách B đọc: 5 → mua 1 → SET SoLuong = 4 (GHI ĐÈ A!)
Kết quả: 4 (sai! phải là 2) → LOST UPDATE
```

**Khắc phục:** Dùng phép trừ trực tiếp trên DB
```sql
UPDATE SANPHAM SET SoLuong = SoLuong - 2; -- Khách A
UPDATE SANPHAM SET SoLuong = SoLuong - 1; -- Khách B
-- Kết quả: 5 - 2 - 1 = 2 → CHÍNH XÁC
```

### 2.4 Kết quả thực nghiệm — Non-Repeatable Read

**Định nghĩa:** Trong cùng 1 transaction, đọc cùng 1 row 2 lần nhưng nhận kết quả KHÁC NHAU (do session khác đã COMMIT thay đổi).

```
Sản phẩm: SP2000 | Giá ban đầu: 3,250,000₫

[Lần 1] Đọc giá: 3,250,000₫
  → Session khác UPDATE giá = 3,750,000₫ rồi COMMIT
[Lần 2] Đọc giá: 3,750,000₫

=> NON-REPEATABLE READ XẢY RA!
   Lần 1 ≠ Lần 2 vì READ COMMITTED đọc lại sau khi session khác COMMIT
```

**Khắc phục:** `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`
→ Toàn bộ transaction đọc từ snapshot cố định tại thời điểm bắt đầu.

### 2.5 Kết quả thực nghiệm — Phantom Read

**Định nghĩa:** Trong cùng 1 transaction, COUNT/query 2 lần cho kết quả khác do session khác INSERT thêm row mới (hàng "ma").

```
[Lần 1] COUNT sản phẩm giá > 500K: 497
  → Session khác INSERT sản phẩm mới giá 999,999₫ rồi COMMIT
[Lần 2] COUNT sản phẩm giá > 500K: 498

=> PHANTOM READ XẢY RA!
   497 → 498 (tăng 1 "bản ma")
   Nguyên nhân: INSERT + COMMIT giữa 2 lần đọc
```

**Khắc phục:** `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`
→ Snapshot cố định, INSERT từ session khác không ảnh hưởng.

### 2.6 Phân tích Deadlock

**Định nghĩa:** 2 transaction chờ đợi lẫn nhau vĩnh viễn (circular wait).

```
Session A                    Session B
─────────                    ─────────
LOCK SP2000                  LOCK SP2001
...chờ...                   ...chờ...
Muốn LOCK SP2001             Muốn LOCK SP2000
=> BỊ BLOCK!                 => BỊ BLOCK!
=> DEADLOCK!
```

**Oracle tự động xử lý:**
- Phát hiện deadlock sau vài giây
- Raise `ORA-00060: deadlock detected`
- ROLLBACK 1 trong 2 transaction, transaction còn lại tiếp tục

**4 cách phòng chống:**

| # | Phương pháp | Cú pháp |
|---|------------|---------|
| 1 | Lock theo thứ tự cố định | Lock SP2000 trước, rồi SP2001 |
| 2 | Dùng TIMEOUT | `SELECT ... FOR UPDATE WAIT 5` |
| 3 | Dùng NOWAIT | `SELECT ... FOR UPDATE NOWAIT` |
| 4 | Truy cập bảng theo cùng thứ tự | Quy ước trong code application |

### 2.7 Tổng hợp các hiện tượng bất nhất quán

| Hiện tượng | Oracle ngăn? | Demo | Cách khắc phục |
|:---|:---:|:---:|:---|
| Dirty Read | ✅ Tự động | 2.1, 2.2 | MVCC (mặc định) |
| Lost Update | ❌ App xử lý | 2.4 | `SET SoLuong = SoLuong - N` |
| Non-Repeatable Read | ❌ Có thể xảy ra | 2.5 | SERIALIZABLE |
| Phantom Read | ❌ Có thể xảy ra | 2.6 | SERIALIZABLE |
| Deadlock | ✅ Tự phát hiện | 2.7 | Lock thứ tự + TIMEOUT |


## PHẦN 3: MÔ PHỎNG PHỤC HỒI HỆ THỐNG

### 3.1 Cơ sở lý thuyết

**Recovery Mechanism** bảo vệ CSDL khỏi:
- Transaction Failure (lỗi logic, deadlock)
- System Crash (mất điện, OS crash)
- Disk Failure (hỏng ổ cứng)

**3 cơ chế chính của Oracle:**

| Cơ chế | Chức năng | Vị trí |
|--------|----------|--------|
| **Redo Log** | Ghi lại MỌI thay đổi → dùng để phục hồi | Redo Log Files |
| **Undo Segments** | Lưu giá trị CŨ → dùng để hoàn tác | UNDOTBS1 |
| **Checkpoint** | Đánh dấu điểm đồng bộ disk-memory | Control File |

**ARIES Recovery Algorithm (3 phases):**
1. **ANALYSIS:** Đọc checkpoint, xác định txn nào committed/active
2. **REDO:** Áp dụng lại TẤT CẢ thay đổi từ checkpoint → crash
3. **UNDO:** Hoàn tác các transaction chưa commit

**Write-Ahead Logging (WAL):** Phải ghi LOG TRƯỚC khi ghi data xuống disk.

### 3.2 Cấu hình thực tế trên Oracle 19c

**Script:** `demo_recovery.sql`

```
Redo Log: 3 groups × 200MB = 600MB
Undo Tablespace: UNDOTBS1 (auto-managed)
Undo Retention: 900 giây (15 phút)
```

### 3.3 Kết quả mô phỏng

**Kịch bản:** T1 đặt hàng thành công → T2 đặt hàng nhưng bị CRASH

```
Timeline:
T1 |---[INSERT DH]---[UPDATE SP]---[COMMIT]----|
T2 |---[INSERT DH]---[UPDATE SP]---X CRASH     |
CP |        ^CP1                     ^CP2      |
```

**Bảng Undo/Redo Log ghi lại:**

| Log | Bảng | Mã | Cột | Cũ → Mới | Trạng thái |
|-----|------|----|-----|----------|-----------|
| REDO | DONHANG | RV46878 | INSERT | NULL→RV46878 | COMMITTED |
| UNDO | DONHANG | RV46878 | INSERT | RV46878→DELETE | COMMITTED |
| REDO | SANPHAM | SP2000 | SoLuong | 14→13 | COMMITTED |
| UNDO | SANPHAM | SP2000 | SoLuong | 14→13 | COMMITTED |
| REDO | SANPHAM | SP2000 | SoLuong | 13→0 | ROLLED_BACK |
| UNDO | SANPHAM | SP2000 | SoLuong | 13→0 | ROLLED_BACK |

**Quy trình Recovery:**
1. ANALYSIS: T1=COMMITTED, T2=ACTIVE
2. REDO: Giữ nguyên T1
3. UNDO: Hoàn tác T2 → SoLuong khôi phục về 13
4. Hệ thống trở về trạng thái nhất quán

---

## PHẦN 4: ĐÁNH GIÁ HIỆU NĂNG HỆ THỐNG

### 4.1 Cơ sở lý thuyết

| Chỉ số | Định nghĩa | Đơn vị |
|--------|-----------|--------|
| **Response Time** | Thời gian từ gửi request → nhận response | millisecond (ms) |
| **Throughput** | Số thao tác xử lý trong 1 đơn vị thời gian | operations/second |

**Tiêu chí đánh giá:**
- Response Time < 100ms → Tốt cho Web Application
- Throughput > 100 ops/sec → Tốt cho hệ thống OLTP

### 4.2 Phương pháp đo

**Script:** `demo_benchmark.sql`

- Mỗi thao tác chạy 50-100 lần lặp
- Đo bằng `SYSTIMESTAMP` (độ chính xác microsecond)
- Tính: Trung bình, Min, Max, Throughput
- Dữ liệu thực: 501 sản phẩm, 13 đơn hàng, 6 người dùng

### 4.3 Kết quả Benchmark

| Test | Loại | Lần chạy | TB (ms) | Min | Max | Throughput |
|------|------|:---:|:---:|:---:|:---:|:---:|
| SELECT by PK | READ | 100 | 0.030 | 0.000 | 1.000 | 33,333 ops/s |
| SELECT JOIN 3 bảng | READ_JOIN | 100 | 0.120 | 0.000 | 6.000 | 8,333 ops/s |
| INSERT ĐơnHàng + Trigger | WRITE | 50 | 0.860 | 0.000 | 8.000 | 1,163 ops/s |
| SEARCH LIKE %NIKE% | SEARCH | 100 | 0.210 | 0.000 | 1.000 | 4,762 ops/s |
| Báo cáo doanh thu | AGGREGATION | 50 | 0.040 | 0.000 | 1.000 | 25,000 ops/s |

### 4.4 Đánh giá tổng thể

| Nhóm | TB Response | Đánh giá |
|------|:---:|:---:|
| READ (SELECT + JOIN) | 0.075 ms | ✅ XUẤT SẮC |
| WRITE (INSERT + Triggers) | 0.860 ms | ✅ XUẤT SẮC |
| SEARCH (LIKE full-scan) | 0.210 ms | ✅ XUẤT SẮC |
| AGGREGATION (SUM/COUNT) | 0.040 ms | ✅ XUẤT SẮC |

**Nhận xét:**
- Tất cả thao tác đều < 1ms, vượt trội tiêu chuẩn 100ms cho web app
- Throughput đều > 1000 ops/s, vượt xa yêu cầu OLTP (100 ops/s)
- WRITE chậm hơn READ ~10 lần do trigger chain (T1→T2→T4→T5→T8)
- SEARCH trên 501 sản phẩm vẫn nhanh nhờ Oracle buffer cache

---

## DANH SÁCH SQL SCRIPTS

| File | Nội dung |
|------|----------|
| `schema_new.sql` | Khởi tạo 25 bảng, sequences, constraints |
| `triggers_procedures.sql` | 8 triggers + 10 stored procedures + tests |
| `seed_data.sql` | Dữ liệu mẫu (users, products, orders...) |
| `demo_dirty_read.sql` | Demo Dirty Read + Lost Update |
| `demo_recovery.sql` | Demo Undo/Redo Log + Checkpoint |
| `demo_benchmark.sql` | Benchmark Response Time & Throughput |
