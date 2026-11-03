const path = require('path');
const express = require('express');
const Datastore = require('@seald-io/nedb');

const app = express();
const port = 3000;
const databasePath = path.join(__dirname, '..', 'lab-nedb');

const streetsDb = new Datastore({
  filename: path.join(databasePath, 'streets.db'),
  autoload: true
});
const housesDb = new Datastore({
  filename: path.join(databasePath, 'houses.db'),
  autoload: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

function find(database, query) {
  return new Promise((resolve, reject) => {
    database.find(query, (error, documents) => {
      if (error) reject(error);
      else resolve(documents);
    });
  });
}

app.get('/', (req, res) => {
  res.redirect('/streets');
});

app.get('/streets', async (req, res, next) => {
  try {
    const streets = await find(streetsDb, {});
    streets.sort((first, second) => first.name.localeCompare(second.name, 'uk'));
    res.render('streets', { streets });
  } catch (error) {
    next(error);
  }
});

app.get('/houses', async (req, res, next) => {
  try {
    const streets = await find(streetsDb, {});
    const streetId = typeof req.query.streetId === 'string' ? req.query.streetId : '';
    const houses = await find(housesDb, streetId ? { streetId } : {});
    const streetById = new Map(streets.map((street) => [street._id, street]));

    houses.sort((first, second) => {
      const firstStreet = streetById.get(first.streetId)?.name || '';
      const secondStreet = streetById.get(second.streetId)?.name || '';
      return firstStreet.localeCompare(secondStreet, 'uk') || first.number - second.number;
    });

    res.render('houses', {
      houses,
      streets: streets.sort((first, second) => first.name.localeCompare(second.name, 'uk')),
      streetById,
      selectedStreetId: streetId
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error('Помилка читання бази даних:', error);
  res.status(500).send('Не вдалося прочитати дані. Спробуйте ще раз.');
});

app.listen(port, () => {
  console.log(`Застосунок запущено на http://127.0.0.1:${port}`);
});
