var Usuario = require('../models/usuario');
var Bicicleta = require('../models/bicicleta'); 

module.exports = {

    list: function(req, res, next) {
        Usuario.find({}, (err, usuarios) => {  
            res.render('usuarios/index', { usuarios: usuarios }); 
        });
    },

    update_get: function(req, res, next) {
        Usuario.findById(req.params.id, function(err, usuario) {
            res.render('usuarios/update', { errors: {}, usuario: usuario} );
        });
    },
      
    update: function(req, res, next) { 
    
        var update_values = { 
            nombre: req.body.nombre
        };
    
        Usuario.findByIdAndUpdate(req.params.id, update_values, ( err, usuario ) => {
            if (err) {
                console.log(err);
                res.render('usuarios/update', {errors: erro.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email} )});
            }
            else {
                res.redirect('/usuarios');
                return;
            }
        }); 
     
    },

    create_get: function(req, res, next) {
        res.render('usuarios/create', {errors: {}, usuario: new Usuario()});
    },

    create: function(req, res, next) { 

        if (req.body.password != req.body.confirm_password) {
            res.render('usuarios/create', {errors: {confirm_password: {message: 'No coincide con el password ingresado.'}}, usuario: new Usuario({nombre: req.body.nombre,email:req.body.email})});
            return;       
        }
        
        Usuario.create({nombre: req.body.nombre, email: req.body.email, password:req.body.password}, ( err, newUsuario ) => {
        console.log("entra")    
            if(err) {
                console.log(err);
                res.render('usuarios/create',{errors: err.errors, usuario: new Usuario({nombre:req.body.nombre, email:req.body.email})});
            }
            else { 
                newUsuario.enviar_email_bienvenida();
                res.redirect('/usuarios');
            }
        });

    },
    
    delete: function(req, res, next) {
        Usuario.findByIdAndDelete(req.body.id, function(err) {
            if (err)
                next(err);
            else
                res.redirect('/usuarios');
        });
    },
 
    reservar_get: function(req, res) {
     
        let idUsuario = req.params.id;

        Bicicleta.allBicis((err, bicicletas) => {  
            console.log(bicicletas);
            res.render('./reservas/create', { listBicicletas: bicicletas, idUsuario: idUsuario });
        }); 

    },

}