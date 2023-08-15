const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/all_friends_network_db');

// Connect to MongoDB
// mongoose.connect('mongodb://localhost/all_friends_network_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

module.exports = mongoose.connection;