const express = require('express');
const app = express();
const cors = require('cors');

// SETTINGS
app.set('port', process.env.PORT || 4000);

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/v1/user',         require('./routes/users.routes'));
app.use('/api/v1/role',         require('./routes/roles.routes'));
app.use('/api/v1/category',     require('./routes/categories.routes'));
app.use('/api/v1/supplier',     require('./routes/suppliers.routes'));
app.use('/api/v1/product',      require('./routes/products.routes'));
app.use('/api/v1/salemaster',   require('./routes/sales.master.routes'));
app.use('/api/v1/saledetail',   require('./routes/sales.detail.routes'));
app.get('/', (req, res) => res.send("Index page"));

module.exports = app;