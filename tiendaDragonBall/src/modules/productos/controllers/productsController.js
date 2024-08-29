// controllers/chatController.js
const heroes = require('../../common/utils/heroes.json');
const crypto = require('node:crypto');

exports.sendMessage = (req, res) => {
  const message = req.body.message;
  // Lógica para manejar el envío del mensaje
  res.json({ message: 'productsController' });
};

exports.getProducts = (req, res) => {
  const { type } = req.query;
  if (type) {
    const filteredItems = heroes.filter(
      (item) => Array.isArray(item.type) && item.type.some((t) => t.toLowerCase() === type.toLowerCase())
    );
    return filteredItems.length > 0
      ? res.json(filteredItems)
      : res.status(404).json({ message: 'No items found' });
  }
  res.json(heroes);
};

exports.getHeroe = (req, res) => {
  const { id } = req.params;
  const heroe = heroes.find((heroe) => heroe.id === parseInt(id, 10));
  return heroe
    ? res.json(heroe) // Enviar la respuesta si se encuentra el héroe
    : res.status(404).json({ message: 'Heroe not found' }); // Enviar la respuesta si no se encuentra el héroe
};

exports.createProduct = (req, res) => {
  const { name, power, real_name, type, avatar } = req.body;
  const newItem = {
    id: crypto.randomUUID(),
    name,
    power,
    real_name,
    type,
    avatar,
  };
  // Esto no sería REST, porque estamos guardando el estado de la aplicación en memoria
  heroes.push(newItem);
  res.status(201).json(newItem);
};