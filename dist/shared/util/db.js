var config = require('config.json');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../../db/users/user.model')
};
//# sourceMappingURL=db.js.map