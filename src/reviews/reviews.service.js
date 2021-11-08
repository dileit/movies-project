const knex = require("../db/connection");

function destroy(reviewId) {
	return knex("reviews").where({ review_id: reviewId }).del();
}

function list(movieId) {
	return knex("reviews as r")
		.join("critics as c", "r.critic_id", "c.critic_id")
		.select("*")
		.where({ movie_id: movieId });
}

function read(reviewId) {
	return knex("reviews").where({ review_id: reviewId }).first();
}

function readCritic(critic_id) {
	return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
	review.critic = await readCritic(review.critic_id);
	return review;
}

function update(newReview) {
	return knex("reviews as r")
		.select("*")
		.where({ review_id: newReview.review_id })
		.update(newReview, "*")
		.then(() => read(newReview.review_id))
		.then(setCritic);
}

module.exports = {
	list,
	read,
	update,
	destroy,
};
