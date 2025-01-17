const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createReview = async (req, res) => {
  try {
    const { userId, petId, rating, text } = req.body;
    const review = await prisma.review.create({
      data: { userId, petId, rating, text }
    });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReviewsForPet = async (req, res) => {
  try {
    const petId = parseInt(req.params.petId);
    const reviews = await prisma.review.findMany({
      where: { petId },
      include: {
        user: { select: { email: true } },
        comments: true
      }
    });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const id = parseInt(req.params.reviewId);
    const { rating, text } = req.body;
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, text }
    });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = parseInt(req.params.reviewId);
    await prisma.review.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
