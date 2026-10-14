// Cấu hình đề: dùng bởi 02_Huong-dan-giai.html (master) và các trang 0x_cau-N.html, qua ../../00_chung/de-thi.js
window.DE = {
  id: "de01-hk1-2025",
  thuMuc: "02-de-thi/01-toan-9-hoc-ky-1/01_Toan9_HK1_2025-2026_THCS-Dang-Tran-Con_de-chinh-thuc/",   // tương đối 03-lop-9-6/, dùng bởi index.html
  ngan: "Đề 01 · HK1 2025–2026 · THCS Đặng Trần Côn (chính thức)",
  tieuDe: "Đề Toán 9 cuối kỳ I 2025–2026, THCS Đặng Trần Côn (đề chính thức)",
  lyThuyet: "../../../01-ly-thuyet/",
  // [id, tên, các phần, file (null = chưa biên soạn), nội dung]
  caus: [
    ["cau1", "Câu 1", ["a", "b"], "03_cau-1.html", "Phương trình chứa ẩn ở mẫu, hệ phương trình · 2,0 đ"],
    ["cau2", "Câu 2", ["a", "b"], "04_cau-2.html", "Rút gọn biểu thức chứa căn · 1,75 đ"],
    ["cau3", "Câu 3", [""], "05_cau-3.html", "Toán thực tế: lập hệ phương trình · 1,0 đ"],
    ["cau4", "Câu 4", [""], "06_cau-4.html", "Toán thực tế: bất phương trình · 0,75 đ"],
    ["cau5", "Câu 5", ["a", "b"], "07_cau-5.html", "Diện tích khu vườn theo x · 1,0 đ"],
    ["cau6", "Câu 6", [""], "08_cau-6.html", "Tỉ số lượng giác: chiều cao núi · 0,5 đ"],
    ["cau7", "Câu 7", ["a", "b", "c"], "09_cau-7.html", "Đường tròn: tiếp tuyến, góc ở tâm, hình quạt (câu thay thế theo sách mới) · 3,0 đ"],
  ],
  // [số bài, file tương đối 01-ly-thuyet/, tên, [[id mục, tên mục]…]]
  bais: [
    ["01", "01-he-hai-phuong-trinh-bac-nhat-hai-an/01-khai-niem-phuong-trinh-va-he-hai-phuong-trinh-bac-nhat-hai-an.html", "Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
      [["pt-bac-nhat-hai-an", "1.1 Phương trình bậc nhất hai ẩn"], ["he-hai-pt", "1.2 Hệ và nghiệm của hệ"], ["tu-luyen", "Tự luyện"]]],
    ["02", "01-he-hai-phuong-trinh-bac-nhat-hai-an/02-giai-he-hai-phuong-trinh-bac-nhat-hai-an.html", "Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn",
      [["phuong-phap-the", "2.1 Phương pháp thế"], ["phuong-phap-cong", "2.2 Phương pháp cộng đại số"], ["thu-lai-ket-luan", "2.3 Thử lại và kết luận"], ["tu-luyen", "Tự luyện"]]],
    ["03", "01-he-hai-phuong-trinh-bac-nhat-hai-an/03-giai-bai-toan-bang-cach-lap-he-phuong-trinh.html", "Bài 3. Giải bài toán bằng cách lập hệ phương trình",
      [["ba-buoc", "3.1 Ba bước"], ["chon-an", "3.2 Chọn ẩn và điều kiện"], ["lap-he", "3.3 Lập hai phương trình"], ["tu-luyen", "Tự luyện"]]],
    ["04", "02-phuong-trinh-bat-phuong-trinh-bac-nhat-mot-an/04-phuong-trinh-quy-ve-phuong-trinh-bac-nhat-mot-an.html", "Bài 4. Phương trình quy về phương trình bậc nhất một ẩn",
      [["pt-tich", "4.1 Phương trình tích"], ["mau-thuc-chung", "4.2 Mẫu thức chung"], ["pt-chua-an-o-mau", "4.3 Phương trình chứa ẩn ở mẫu"], ["tu-luyen", "Tự luyện"]]],
    ["05", "02-phuong-trinh-bat-phuong-trinh-bac-nhat-mot-an/05-bat-dang-thuc-va-tinh-chat.html", "Bài 5. Bất đẳng thức và tính chất",
      [["bat-dang-thuc", "5.1 Bất đẳng thức"], ["tinh-chat", "5.2 Tính chất"], ["tu-luyen", "Tự luyện"]]],
    ["06", "02-phuong-trinh-bat-phuong-trinh-bac-nhat-mot-an/06-bat-phuong-trinh-bac-nhat-mot-an.html", "Bài 6. Bất phương trình bậc nhất một ẩn",
      [["dinh-nghia", "6.1 Định nghĩa và nghiệm"], ["cach-giai", "6.2 Cách giải"], ["bai-toan-thuc-te", "6.3 Bài toán \"nhiều nhất, ít nhất\""], ["tu-luyen", "Tự luyện"]]],
    ["07", "03-can-bac-hai-can-bac-ba/07-can-bac-hai-va-can-thuc-bac-hai.html", "Bài 7. Căn bậc hai và căn thức bậc hai",
      [["can-bac-hai", "7.1 Căn bậc hai của một số"], ["can-binh-phuong", "7.2 √(A²) = |A|"], ["can-thuc", "7.3 Căn thức và điều kiện xác định"], ["binh-phuong-tong", "7.4 Căn trong căn"], ["tu-luyen", "Tự luyện"]]],
    ["08", "03-can-bac-hai-can-bac-ba/08-khai-can-bac-hai-voi-phep-nhan-va-phep-chia.html", "Bài 8. Khai căn với phép nhân và phép chia",
      [["khai-phuong-tich", "8.1 Khai phương một tích"], ["khai-phuong-thuong", "8.2 Khai phương một thương"], ["voi-bieu-thuc", "8.3 Với biểu thức chứa chữ"], ["tu-luyen", "Tự luyện"]]],
    ["09", "03-can-bac-hai-can-bac-ba/09-bien-doi-don-gian-va-rut-gon-bieu-thuc-chua-can.html", "Bài 9. Biến đổi và rút gọn biểu thức chứa căn",
      [["dua-ra-ngoai", "9.1 Đưa thừa số ra ngoài"], ["dua-vao-trong", "9.2 Đưa thừa số vào trong"], ["khu-mau", "9.3 Khử mẫu"], ["truc-can-thuc", "9.4 Trục căn thức ở mẫu"], ["can-dong-dang", "9.5 Căn đồng dạng, rút gọn"], ["tu-luyen", "Tự luyện"]]],
    ["11", "04-he-thuc-luong-trong-tam-giac-vuong/11-ti-so-luong-giac-cua-goc-nhon.html", "Bài 11. Tỉ số lượng giác của góc nhọn",
      [["dinh-nghia", "11.1 Định nghĩa"], ["goc-dac-biet", "11.2 Góc đặc biệt, góc phụ nhau"], ["may-tinh", "11.3 Máy tính cầm tay"], ["tu-luyen", "Tự luyện"]]],
    ["12", "04-he-thuc-luong-trong-tam-giac-vuong/12-mot-so-he-thuc-giua-canh-goc-trong-tam-giac-vuong-va-ung-dung.html", "Bài 12. Hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
      [["he-thuc", "12.1 Hệ thức cạnh-góc"], ["giai-tam-giac-vuong", "12.2 Giải tam giác vuông"], ["ung-dung-do-chieu-cao", "12.3 Đo chiều cao, khoảng cách"], ["tu-luyen", "Tự luyện"]]],
    ["13", "05-duong-tron/13-mo-dau-ve-duong-tron.html", "Bài 13. Mở đầu về đường tròn",
      [["duong-tron", "13.1 Đường tròn, vị trí điểm"], ["doi-xung", "13.2 Tính đối xứng"], ["tu-luyen", "Tự luyện"]]],
    ["14", "05-duong-tron/14-cung-va-day-cua-mot-duong-tron.html", "Bài 14. Cung và dây của một đường tròn",
      [["goc-o-tam-so-do-cung", "14.1 Góc ở tâm, số đo cung"], ["day-cung", "14.2 Dây cung, dây theo góc ở tâm"], ["tu-luyen", "Tự luyện"]]],
    ["15", "05-duong-tron/15-do-dai-cung-tron-dien-tich-hinh-quat-va-hinh-vanh-khuyen.html", "Bài 15. Độ dài cung tròn, diện tích hình quạt và hình vành khuyên",
      [["do-dai-duong-tron-cung", "15.1 Độ dài đường tròn, cung"], ["dien-tich-hinh-tron-quat", "15.2 Diện tích hình tròn, hình quạt"], ["hinh-vanh-khuyen", "15.3 Hình vành khuyên, phần còn lại"], ["tu-luyen", "Tự luyện"]]],
    ["16", "05-duong-tron/16-vi-tri-tuong-doi-cua-duong-thang-va-duong-tron.html", "Bài 16. Vị trí tương đối của đường thẳng và đường tròn",
      [["vi-tri-tuong-doi", "16.1 Ba vị trí tương đối"], ["tiep-tuyen", "16.2 Tiếp tuyến"], ["hai-tiep-tuyen-cat-nhau", "16.3 Hai tiếp tuyến cắt nhau"], ["tu-luyen", "Tự luyện"]]],
  ],
};
// Trang điều khiển index.html nạp nhiều cấu hình đề: gom vào danh sách
window.DE_LIST = window.DE_LIST || []; window.DE_LIST.push(window.DE);
