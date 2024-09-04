import { error } from 'node:console';
import heroes from '../../common/utils/heroes.json' assert { type: 'json' };
import crypto from 'node:crypto';
import { validateItem, validatePartialItem } from '../../common/utils/schemas/items.js';

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://heroes-app.vercel.app'
];

export const sendMessage = (req, res) => {
  const message = req.body.message;
  // Lógica para manejar el envío del mensaje
  res.json({ message: 'productsController' });
};

export const getProducts = (req, res) => {
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

export const getHeroe = (req, res) => {
  const { id } = req.params;
  const heroe = heroes.find((heroe) => heroe.id === parseInt(id, 10));
  return heroe
    ? res.json(heroe) // Enviar la respuesta si se encuentra el héroe
    : res.status(404).json({ message: 'Heroe not found' }); // Enviar la respuesta si no se encuentra el héroe
};

export const createProduct = (req, res) => {
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

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const result = validatePartialItem(req.body);
  if(result.error) {
    return res.status(400).json({ error: result.error.errors});
  }
  const index = heroes.findIndex((heroe) => heroe.id === parseInt(id, 10));
  if (index === -1) {
    return res.status(404).json({ message: 'Heroe not found' });
  }
  const updatedItem = {
    ...heroes[index],
    ...result.data
  };
  heroes[index] = updatedItem;
  res.json(updatedItem);
};

export const options = (req, res) => {
  res.set('Allow', 'GET, POST, PATCH, OPTIONS');
  res.sendStatus(204);
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const heroIndex = heroes.findIndex((heroe) => heroe.id === parseInt(id, 10));
  if (heroIndex === -1) {
    return res.status(404).json({ message: 'Heroe not found' });
  }
  heroes.splice(heroIndex, 1);
  return res.json({ message: 'Heroe deleted' });
}