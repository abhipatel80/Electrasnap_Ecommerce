const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log("Error", e.message);
});
  