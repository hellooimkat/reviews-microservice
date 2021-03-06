/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');
const util = require('util');
const countries = require('./countries.js');

fs.readFile = util.promisify(fs.readFile);

const path = `${__dirname}/CSVs/users.txt`;
const wstream = fs.createWriteStream(path);
wstream.on('finish', () => {
  console.log('File has been written YAY');
});
wstream.on('error', (err) => {
  console.log('We errored :(', err);
});


// CREATE A CSV WITH 50 USERS
const createUsersCSV = async (number = 50) => {
  let users = [];
  const userIDs = `${__dirname}/CSVs/userIDs.txt`;
  const text = await fs.readFile(userIDs, 'utf8');
  const userIdArr = text.split(',');

  for (let i = 0; i < number; i += 1) {
    const user = [];
    // userId
    user.push(userIdArr[i]);
    // userCreatedAt
    const date = new Date(faker.date.between('2000-01-01', '2018-01-01'));
    user.push(date.toISOString());
    // firstname
    user.push(faker.name.firstName());
    // lastname
    user.push(faker.name.lastName());
    // username
    user.push(faker.internet.userName());
    // age
    user.push(18 + Math.floor(Math.random() * 40));
    // email
    user.push(faker.internet.email());
    // status
    user.push(faker.random.arrayElement([
      'Female',
      'Male',
      'Mixed Group',
      'Couple',
    ]));
    // country
    user.push(countries[Math.floor(Math.random() * countries.length)]);
    // numOfReviews
    user.push(Math.floor(Math.random() * 200));
    users.push(user);
  }
  users = users.join('\n');
  wstream.write(users);
  wstream.end();
};
createUsersCSV();

