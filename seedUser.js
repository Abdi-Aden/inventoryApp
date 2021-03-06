const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {User} = require('./models');


const seedUser = async () => {

    await sequelize.sync({ force: true });

    const seedPath = path.join(__dirname, 'users.json'); // creates path to seed data
    const buffer = await fs.readFile(seedPath); // reads json
    const {data} = JSON.parse(String(buffer)); //parses data

    const dataPromises = data.map(user => User.create(user))
    await Promise.all(dataPromises)
    console.log("db populated!")
}


module.exports = seedUser