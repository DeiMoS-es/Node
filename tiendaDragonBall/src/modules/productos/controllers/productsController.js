// controllers/chatController.js
const { error } = require('node:console');
const heroes = require('../../common/utils/heroes.json');
const crypto = require('node:crypto');
const { validateItem, validatePartialItem } = require('../../common/utils/schemas/items'); 

ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://heroes-app.vercel.app'
];
exports.sendMessage = (req, res) => {
  const message = req.body.message;
  // Lógica para manejar el envío del mensaje
  res.json({ message: 'productsController' });
};

exports.getProducts = (req, res) => {
  req.header('Access-Control-Allow-Origin', '*');
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
  const result = validateItem(req.body);
  if(result.error) {
    return res.status(400).json({ error: result.error.errors});
  }
  // const { name, power, real_name, type, avatar } = req.body;
  const newItem = {
    id: crypto.randomUUID(),
    ...result.data
  };
  // Esto no sería REST, porque estamos guardando el estado de la aplicación en memoria
  heroes.push(newItem);
  res.status(201).json(newItem);
};

exports.updateProduct = (req, res) => {
  const result = validatePartialItem(req.body);
  if(!result.success) {
    return res.status(400).json({ error: result.error.errors});
  }
  const { id } = req.params;
  const itemsIndex = heroes.findIndex((heroe) => heroe.id ===  Number(id));
  if (itemsIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  const updateItem = {
    ...heroes[itemsIndex],
    ...result.data
  };
  heroes[itemsIndex] = updateItem;
  return res.json(updateItem);
}

exports.options = (req, res) => {
  const origin = req.header('origin');
  // const origin = req.headers.origin;
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  }
  res.send(200);
}