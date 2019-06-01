/* eslint-disable no-console */
// Express set up
const express = require('express');
const bodyParser = require('body-parse');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');

const keys = require('./keys');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres config
const pgClient = new Pool({
  user: keys.pgUser,
  hose: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on('error', () => console.log('Pg Client lost connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values(number INT)')
  .catch(error => console.log(error));

// Redis config
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();