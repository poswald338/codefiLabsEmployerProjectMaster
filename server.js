const express = require('express');
const forceSsl = require('force-ssl-heroku');
const enforce = require('express-sslify');
const path = require('path');
const enableProdMode = require('@angular/core').enableProdMode
const compression = require('compression')

enableProdMode();

const app = express();

app.use(compression());

app.use(express.static('./dist'));

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});

app.listen(process.env.PORT || 8080, ()=>{
    console.log('Server started')
})
