const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/order-list')
  .then(db => console.log('db is connected'))
  .catch(err => console.log(err));
