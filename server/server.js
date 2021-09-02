const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')
const ShortUrl = require('./models/shortUrl')
const cors = require('cors')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.use(cors({
  origin: '*',
  methods: ['GET','POST']
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.get('/url-shortener', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.json({ shortUrls: shortUrls})
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl, short: req.body.shortUrl||shortId.generate().substring(0,6) })
    res.status(200).send('OK')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);