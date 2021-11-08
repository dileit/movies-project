const knex = require("../db/connection");

function list(is_showing) {
	return knex("movies as m")
		.select("*")
		.modify((queryBuilder) => {
			if (is_showing) {
				queryBuilder
					.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
					.where({ "mt.is_showing": true })
					.groupBy("m.movie_id");
			}
		});
}

function read(movie_id) {
	return knex("movies as m")
		.select("*")
		.where({ "m.movie_id": movie_id })
		.first();
}

function movieById(movie_id) {
	return knex("movies as m")
		.select("*")
		.where({ "m.movie_id": movie_id })
		.first();
}

module.exports = {
	list,
	read,
	movieById,
};
