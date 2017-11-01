const express    = require('express');    
const app        = express();             
const bodyParser = require('body-parser');

const request = require('request');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();     


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/whois', function(req, res){
    
    
    var domain 	= req.body.domain;
    var acao = req.body.acao;	
	var apikey 	= "c8b1aa069cb4c2bfe375350a32fc897e"; //api key

    // API call
    var propertiesObject = { 
        domain: domain,
        r:acao,
        apikey: apikey 
    };
    
    request({url:'http://api.whoapi.com', qs:propertiesObject}, function(err, response, body){
            console.log('Antes da request');
            console.log('Depois da request: body ->' + body);
            let result = JSON.parse(body);
            console.log('Apos o parse do JSON');
            res.json(result);
            console.log('FIM\n');
        }
    );
});
app.use('/api', router);

app.listen(port);
console.log('Servidor na porta ' + port + '. Rota a partir de "/api"');

