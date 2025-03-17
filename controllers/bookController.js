const { Book } = require("../models");
const { BorrowedBook } = require("../models");

/**
 * @desc    Get all books
 * @route   GET /api/books
 * @access  Public
 */
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books!" });
    }
};

/**
 * @desc    Add a new book
 * @route   POST /api/books
 * @access  Public
 */
exports.addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, book });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Failed to add book!" });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found!" });
        }
        if (book.books_count <= 0) {
            return res.status(400).json({ error: "Book is not available!" });
        }
        else {
            book.books_count -= 1;
            await book.save();
            const borrowrecord = await BorrowedBook.create({ 
                userId: req.body.userId,
                bookId: book.id,
                borrowedAt: new Date(),
                returnBy: req.body.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                returnedAt: null
            });
            res.status(200).json({ success: true, borrowrecord});
        }
    } catch (error) {
        console.error("Error borrowing book:", error);
        res.status(500).json({ error: "Failed to borrow book!" });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const borrowrecord = await BorrowedBook.findByPk(req.params.id);
        if (!borrowrecord) {
            return res.status(404).json({ error: "Borrow record not found!" });
        }
        borrowrecord.returnedAt = new Date();
        await borrowrecord.save();
        const book = await Book.findByPk(req.params.id);
        book.books_count += 1;
        await book.save();
        res.status(200).json({ success: true, borrowrecord });
    } catch (error) {
        console.error("Error returning book:", error);
        res.status(500).json({ error: "Failed to return book!" });
    }
};

exports.overdueBooks = async (req, res) => {
    try {
        const overdueBooks = await BorrowedBook.findAll({
            where: {
                returnedAt: null,
                returnBy: { [Op.lt]: new Date() }
            }
        });
        res.status(200).json(overdueBooks);
    } catch (error) {
        console.error("Error fetching overdue books:", error);
        res.status(500).json({ error: "Failed to fetch overdue books!" });
    }
};