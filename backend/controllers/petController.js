const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPet = async (req, res) => {
  try {
    const { name, species, breed, age } = req.body;
    const pet = await prisma.pet.create({
      data: { name, species, breed, age }
    });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await prisma.pet.findMany({});
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
