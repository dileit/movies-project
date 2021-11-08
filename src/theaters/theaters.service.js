const knex = require("../db/connection");

function list() {
	return knex
		.raw(
			`
  SELECT *
  FROM movies m, theaters t, movies_theaters mt
  WHERE mt.movie_id = m.movie_id 
  AND mt.theater_id = t.theater_id
  `
		)
		.then((data) => data);
}

function listMovieId(movie_id) {
	return knex("theaters")
		.join(
			"movies_theaters",
			"theaters.theater_id",
			"movies_theaters.theater_id"
		)
		.join("movies", "movies_theaters.movie_id", "movies.movie_id")
		.select("theaters.*", "movies.movie_id")
		.where("movies.movie_id", "=", movie_id);
}

module.exports = {
	list,
	listMovieId,
};
