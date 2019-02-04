const mongo = require('./connect');
const {DB_NAME} = require('./config');

module.exports = {
    getFilms: function(){
        const db = mongo.instance().db(DB_NAME); // connecting to db
        const resp = db.collection("films").find().toArray();
        return resp;
    },
    getFilmById: function(id){
        const db = mongo.instance().db(DB_NAME); // connecting to db
        const resp = db.collection("films").find({id}).toArray();
        return resp; // here, we return a promises wich will be handle for the function that call it
    },
    postFilm: function(film){
        const db = mongo.instance().db(DB_NAME); // connecting to db
        const resp = db.collection("films").insertOne(film);
        return resp;
    },
    deleteFilmById: function(id){
        const db = mongo.instance().db(DB_NAME); // connecting to db
        const resp = db.collection("films").deleteOne({id});
        return resp;
    }
}