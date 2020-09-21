var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = newSchema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion:{
        type: {Number}, index: {type:'2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color:color,
        modelo: modelo,
        ubicacion: ubicacion
    });
}

bicicletaSchema.methods.toString = function(){
    return 'code: '+this.code+'| color:'+this.dolor;
};

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function(aBici, cb){
    this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode}, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.delteOne({code: aCode}, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
