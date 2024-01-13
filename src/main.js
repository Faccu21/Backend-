
const express = require('express');
const ProductManager = require("./product-manager.js");

const app = express();
const PORT = 3000;

const manager = new ProductManager("./src/productos.json");

app.get("/", (req, res) => {

  res.send("Bienvenido");
});

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
});


app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await manager.getProducts();

    if (!isNaN(limit)) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await manager.getProductById(id);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

