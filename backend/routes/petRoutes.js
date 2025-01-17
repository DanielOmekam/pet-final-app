const express = require('express');
const router = express.Router();
const {
  createPet,
  getAllPets,
  getPetById
} = require('../controllers/petController');

// POST /api/pets
router.post('/', createPet);

// GET /api/pets
router.get('/', getAllPets);

// GET /api/pets/:id
router.get('/:id', getPetById);

module.exports = router;
