// const db = require('./index.js');

// const Student = require('./models/student');

// const Campus = require('./models/campus');



// const campuses = [

//   { name: 'TowerCitadel', image: 'http://www.beneath-ceaseless-skies.com/wp-content/uploads/2012/09/LostCitadel_JonasDeRo_full.jpg' },

//   { name: 'Cactus', image: 'https://www.balboapark.org/sites/default/files/2017-01/Old%20Cactus%20Garden%20header.jpg'},

//   { name: 'TheForestary', image: 'https://www.forestholidays.co.uk/~/media/images/content%20block%20images/slideshow%20images/whats%20onsite/forestofdean%20intro%20(2).ashx' },

//   { name: 'Selius University', image: 'https://www.visitsealife.com/azure/media/4787/new-header-dory.jpg?quality=90' },

// ];



// const students = [{

//   name: 'Cody',

//   email: 'cody@gmail.com'

// }, {

//   name: 'Ben',

//   email: 'ben@gmail.com'

// }, {

//   name: 'Star',

//   email: 'star@gmail.com'

// }, {

//   name: 'Batman',

//   email: 'batman@yahoo.com'

// }, {

//   name: 'Elliott',

//   email: 'elliott@cell.com'

// }, {

//   name: 'Fira',

//   email: 'fira@gmail.com'

// }, {

//   name: 'Henry',

//   email: 'henry@gmail.com'

// }, {

//   name: 'Marcy',

//   email: 'marcy@gmail.com'

// }, {

//   name: 'Milton',

//   email: 'Milton@gmail.com'

// }, {

//   name: 'Murphy',

//   email: 'murphy@gmail.com'

// }, {

//   name: 'Raffi',

//   email: 'raffi@gmail.com'

// }, {

//   name: 'Tulsi',

//   email: 'tuli@gmail.com'

// }, {

//   name: 'Pork Chop',

//   email: 'porkchop@gmail.com'

// }, {

//   name: 'Ribs',

//   email: 'ribs@gmail.com'

// }, {

//   name: 'Stacey',

//   email: 'stacy@gmail.com'

// }, {

//   name: 'JD',

//   email: 'jd@gmail.com'

// }, {

//   name: 'BenBen',

//   email: 'benben@gmail.com'

// }, {

//   name: 'Odie',

//   email: 'odie@gmail.com'

// }];



// const seed = () =>

//   Promise.all(students.map(student =>

//     Student.create(student))


//   )

//   .then(() =>

//   Promise.all(campuses.map(campus =>

//     Campus.create(campus))

//   ));



// const main = () => {

//   console.log('Syncing db...');

//   db.sync({ force: true })

//     .then(() => {

//       console.log('Seeding databse...');

//       return seed();

//     })

//     .catch(err => {

//       console.log('Error while seeding');

//       console.log(err.stack);

//     })

//     .then(() => {

//       db.close();

//       return null;

//     });

// };



// main();

