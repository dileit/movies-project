const theatersService = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res, next) {
	const { movieId } = req.params;

	if (movieId === undefined) {
		const data = await theatersService.list();
		const reduceMovies = reduceProperties("theater_id", {
			title: ["movies", null, "title"],
			rating: ["movies", null, "rating"],
			runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
		});
		res.json({ data: reduceMovies(data) });
	} else {
		let movie_id = Number(movieId);
		const theaters = await theatersService.listMovieId(movie_id);
		res.json({ data: theaters });
	}
}

module.exports = {
	list,
};
