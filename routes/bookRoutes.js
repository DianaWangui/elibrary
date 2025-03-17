const express = require("express");
const { getAllBooks, addBook, borrowBook, returnBook, overdueBooks } = require("../controllers/bookController.js");

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", addBook);
router.post("/:id/borrow", borrowBook);
router.post("/:id/return", returnBook);
router.get("/overdue", overdueBooks);

module.exports = router;
