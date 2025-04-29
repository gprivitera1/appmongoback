const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const reservaRoutes = require('./routes/Reserva');
const clienteRoutes = require('./routes/Cliente');
const productoRoutes = require('./routes/Producto'); 
const pagoRoutes = require('./routes/Pago'); 
const equipamientoRoutes = require('./routes/Equipamiento');
const monedaRoutes = require('./routes/Moneda');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/doc.html'));
})

/* endpoints */
app.use('/api/v1/equipamientos', equipamientoRoutes);
app.use('/api/v1/pagos', pagoRoutes);
app.use('/api/v1/reservas', reservaRoutes);
app.use('/api/v1/clientes', clienteRoutes); 
app.use('/api/v1/productos', productoRoutes);
app.use('/api/v1/monedas', monedaRoutes);


module.exports = app

