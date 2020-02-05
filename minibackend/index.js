const app = require('express')();
const bodyParser = require('body-parser');
const translate = require('google-translate-open-api');

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
})

app.post('/translate',async (req,res,next) => {
    const {data} = await translate.default(req.body.text, {
        from: req.body.from,
        to: req.body.to
      });
      
    res.send(data);
})

app.listen(8080,() => console.log('Server has started'))