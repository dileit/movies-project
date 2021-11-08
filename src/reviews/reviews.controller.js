const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceReviews = reduceProperties("review_id", {
	critic_id: ["critic", "critic_id"],
	preferred_name: ["critic", "preferred_name"],
	surname: ["critic", "surname"],
	organization_name: ["critic", "organization_name"],
	created_at: ["critic", "created_at"],
	updated_at: ["critic", "updated_at"],
});

async function list(req, res, next) {
	const data = await reviewsService.list(req.params.movieId);
	res.json({ data: reduceReviews(data) });
}

// validate reviewId
async function reviewExists(req, res, next) {
	const review = await reviewsService.read(req.params.reviewId);
	if (review) {
		res.locals.review = review;
		return next();
	}
	return next({ status: 404, message: `Review cannot be found.` });
}

// update

async function update(req, res) {
	const updatedReview = {
		...res.locals.review,
		...req.body.data,
		review_id: res.locals.review.review_id,
	};
	const data = await reviewsService.update(updatedReview);
	res.json({ data: data });
}

// destroy
async function destroy(req, res) {
	await reviewsService.destroy(res.locals.review.review_id);
	res.sendStatus(204).json("No Content");
}

module.exports = {
	list,
	update: [reviewExists, asyncErrorBoundary(update)],
	delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
