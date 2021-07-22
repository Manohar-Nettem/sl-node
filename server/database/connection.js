const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.mongoUrl, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((db) => {
    console.log("::connected to Mongo::");
}).catch(e => {
    console.log(e);
});