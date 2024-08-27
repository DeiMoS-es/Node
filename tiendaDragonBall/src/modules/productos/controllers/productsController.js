// controllers/chatController.js
const heroes = require('../../common/utils/heroes.json');

exports.sendMessage = (req, res) => {
  const message = req.body.message;
  // Lógica para manejar el envío del mensaje
  res.json({ message: 'productsController' });
};

exports.getProducts = (req, res) => {
  res.json(heroes);
}