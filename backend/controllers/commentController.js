const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  try {
    const { userId, reviewId, text } = req.body;
    const comment = await prisma.comment.create({
      data: { userId, reviewId, text }
    });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommentsForReview = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.reviewId);
    const comments = await prisma.comment.findMany({
      where: { reviewId },
      include: {
        user: { select: { email: true } }
      }
    });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const id = parseInt(req.params.commentId);
    const { text } = req.body;
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { text }
    });
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = parseInt(req.params.commentId);
    await prisma.comment.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
