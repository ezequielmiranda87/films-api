const API_PATH="/api";
//const films = require("../../resources/films.json")
const {getFilms, getFilmById, postFilm, deleteFilmById} = require("../../db/")


module.exports = (app) => {
    /* GET:ID endpoint => all-films
    ** (Here we use async/await to handle the async operation over mongo)
    */
    app.get(`${API_PATH}/films`, async(req, res)=>{
        const response = await getFilms(); // This function return a promise
        return res.json(response);
    })

    app.get(`${API_PATH}/film/:id`, async(req, res)=>{
    /* GET:ID endpoint => one-film
    ** 
    */
        const id = req.params.id;
        const film = await getFilmById(id); // getFilmById return a promises
        return res.json(film);
    })

    app.post(`${API_PATH}/film/`, async(req, res)=>{
    /* POST:FILM endpoint => one-film
    ** 
    */
        const film = JSON.parse(req.body.film)
        if(film){
            const response = await postFilm(film);
            return res.json(response)
        }
         return res.status(400).send({reason: "No film sent."})
    })

    app.delete(`${API_PATH}/film/:id`, async(req, res)=>{
        /* DELETE:ID endpoint => deleteone-film
        ** 
        */
       const id = req.params.id;
       if(id){
        const response = await deleteFilmById(id); // getFilmById return a promises
        return res.json(response);
       }
       res.status(400).send({reason:" No id film sent"})
    })
}

