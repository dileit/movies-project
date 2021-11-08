const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// list
async function list(req, res, next) {
	const data = await moviesService.list(req.query.is_showing);
	res.json({ data });
}

// validation for movieId

async function movieExists(req, res, next) {
	const movie = await moviesService.movieById(Number(req.params.movieId));
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	next({ status: 404, message: `Movie does not exist in the database!` });
}

// read function for movieId
async function read(req, res, next) {
	const { movie: data } = res.locals;
	res.json({ data });
}

module.exports = {
	list,
	read: [movieExists, read],
};
