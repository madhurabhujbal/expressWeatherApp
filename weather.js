const express = require('express');
const axios = require('axios');
const {MongoClient} = require('mongodb');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');