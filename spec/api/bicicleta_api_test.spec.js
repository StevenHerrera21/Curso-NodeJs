var Bicicleta= require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url= "http://localhost:3000/api/bicicleta";

describe("Bicicleta Api", ()=>{
    beforeEach(function(done){
        var mongoDB = 'mongodb:localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser:true});
        const db= mongoose.connection;
        db.on('error', console.error.bind(console, 'conection error'));
        db.once('open', function(){
            console.log('We are connected to test databse');
            done();
        });
    });
    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });
    describe("GET BICICLETAS /", ()=>{
        it('Status 200', (done)=>{
            request.get(base_url, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });
    
    describe("POST BICICLETAS /create", ()=> {
        it("Status 200", (done)=> {
            let headers = {'content-type': 'application/json'};
            let bicycle = '{"id":3,"color":"rojo","modelo":"Urbana","lat":-34,"lng":-54}';
            request.post({
                    headers: headers,
                    url: urlServer + '/create',
                    body: aBici
                }, function(error, response, body){
                    expect(response.statusCode).toBe(200);
                    var bici= JSON.parse(body).bicicleta;
                    console.log(bici);
                    expect(bici.color).toBe("rojo");
                    expect(bici.ubicacion[0]).toBe(-34);
                    expect(bici.ubicacion[1]).toBe(-54); 
                    done();
                });
            });
        });
});

/* describe('Bicicleta API', ()=>{
    describe('GET BICICLETAS /', ()=>{
        it('Status 200', ()=>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'negro', 'urbana', [-2.227201,-79.9394636]);
            Bicicleta.add(a);
            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create', ()=>{
        it('Status 200', (done)=>{
            var headers = {'content-type':'application/json'};
            var aBici= '{"id":10, "color":"rojo", "modelo":"urbana", "lat":-34, "lng":-34}';
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create', 
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");
                done();
            });
        });
    });

}); */