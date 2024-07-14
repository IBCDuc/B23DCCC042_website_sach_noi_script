const express = require("express");
const router = express.Router();

const bookscontroller = require("../app/controllers/BooksController");
module.exports = router;


//danhmuc
router.get("/phan-loai/nau-an", bookscontroller.Nau_an);
router.get("/phan-loai/ngon-tinh", bookscontroller.Ngon_tinh);
router.get("/phan-loai/tieu-thuyet", bookscontroller.Tieu_thuyet);
router.get("/phan-loai/triet-ly", bookscontroller.Triet_ly);
router.get("/phan-loai/cong-nghe", bookscontroller.Cong_nghe);

//tacgia
router.get("/phan-loai/christian-grenier", bookscontroller.grenier);
router.get("/phan-loai/ernesto-che-guevara", bookscontroller.guevara);
router.get("/phan-loai/nguyen-nhat-anh", bookscontroller.nguyen_nhat_anh);
router.get("/phan-loai/nguyen-thuy-linh", bookscontroller.nguyen_thuy_linh);
router.get("/phan-loai/barthes", bookscontroller.barthes);
router.get("/phan-loai/fumio", bookscontroller.fumio);


//trang sách
router.get("/mat-biec", bookscontroller.books_by_id);
router.get("/loi-song-toi-gian-nguoi-nhat", bookscontroller.books_by_id);
router.get("/mat-biec", bookscontroller.books_by_id);


router.get("/:slug", bookscontroller.show);
router.get("/", bookscontroller.index);
