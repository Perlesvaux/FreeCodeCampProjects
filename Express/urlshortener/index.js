require('dotenv').config();
const express = require('express');
const dns = require('dns')
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;


// Connect to Atlas MongoDB 
const mySecret = process.env['MONGO_URI']
mongoose = require('mongoose')
mongoose.connect(mySecret, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.set('useFindAndModify', false);

// mongose schema modeled after an individual
// - defines the structure of the document in the MongoDB collection.
const urlSchema = mongoose.Schema({
  original_url: {type: String, required:true},
  short_url: {type: Number, required: true}
})

// Instantiation of Model
// - this object has all necessary methods to interact with the database
const Url = mongoose.model('Url', urlSchema)


// Configure body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.post('/api/shorturl', async function(req, res) {
  try {
    const host = new URL(req.body.url).hostname

    dns.lookup(host, async (err, address, family) => {
      if (err) return res.json({ error: 'invalid url' })

      const existing =  await Url.find({original_url:req.body.url})
      if (existing.length===0) {
        
        const allRecords = await Url.find({})
        const newIndex = allRecords.length+1

        await Url.create({ original_url:req.body.url, short_url:newIndex })
        return res.json({ original_url:req.body.url, short_url:newIndex });
      }
      return res.json({original_url:existing[0].original_url, short_url:existing[0].short_url})     
    })

    
  } catch(error){
    return res.json({ error: 'invalid url' })
  }
});

app.get('/api/shorturl/:short_url', async function (req, res){
  try
{
  const existing = await Url.find({short_url:parseInt(req.params.short_url)})
    
  if (existing.length===0) return res.json({"error":"No short URL found for the given input"})

  return res.redirect(existing[0].original_url)
  } catch (err){
    console.error(err)
    return res.json({"error":"Wrong format"})
  }

})

app.listen(port, function() {
  console.log(`Listening http://localhost:${port}`);
});
