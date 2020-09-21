let mongoose = require('mongoose');
let Usuario = require('../../models/usuariomodel');
let Bicicleta = require('../../models/bicicletamodel');
let Reserva = require('../../models/reservamodel');


describe('Testing Usuarios', () => {
    beforeEach( function(done){
        var mongoBD = 'mongodb://locashost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser:true});
        const db= mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are conneted to test database');
            done();
        });
    });

    afterEach( (done) => {
        Reserva.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function (err, success) {
                if (err) console.log(err);
                Bicycle.deleteMany({}, function (err, success) {
                    if (err) console.log(err);
                    done();
                });
            })
        });
    });

    describe('Cuando un Usuario reserva una Bici', () => {
        it('Debe existir la reserva', (done) => {
            const usuario = new User({ nombre: 'Steven' });
            usuario.save();

            const bicicleta = new Bicicleta({ codigo: 1, color: 'verde', modelo: 'urbana' });
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);

            usuario.reservar(bicicleta.id, hoy, mañana, function (err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function (err, reservas) {
                    console.log(reservas[0])
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);

                    done();
                });
            });
        });
    });


});