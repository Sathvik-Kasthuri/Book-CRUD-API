const Book = require("../models/book");

const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true },
    );

    if (!book) {
      res.status(403).json({ error: "Not allowed" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!book) {
      res.status(403).json({ error: "Not allowed" });
    }

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
