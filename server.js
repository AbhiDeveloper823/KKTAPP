const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      fs = require('fs'),
      path = require('path'),
      cors       = require('cors'),
      app = express();
require('dotenv').config()

mongoose.connect(`mongodb+srv://abhi:${process.env.DB_PASS}@cluster0.ddjzu.mongodb.net/kkt_webapp?retryWrites=true&w=majority`, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log(`DATABASE CONNECTED!!`)
}).catch((err)=>{
    console.log(err)
})

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser({limit:'50mb'}))
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
});

fs.readdirSync('./routes').map((f)=>{
    app.use('/api', require(`./routes/${f}`));
})

app.listen(process.env.PORT, ()=>{
    console.log('KKT SERVER IS RUNNING!!')
})