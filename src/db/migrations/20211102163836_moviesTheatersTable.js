const { table } = require("../connection");

exports.up = function (knex) {
	return knex.schema.createTable("movies_theaters", (table) => {
		table.integer("movie_id").unsigned();
		table.integer("theater_id").unsigned();
		table.boolean("is_showing");

		// forgeign key
		table.foreign("movie_id").references("movie_id").inTable("movies");
		table.foreign("theater_id").references("theater_id").inTable("theaters");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("movies_theaters");
};
