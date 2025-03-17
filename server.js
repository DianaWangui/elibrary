const app = require("./app.js");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

const port = process.env.PORT || 5000;


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
module.exports = app;
