import { csrfFetch } from "./csrf";
const GET_REVIEWS = "reviews/GET_REVIEWS";

const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const load = (list) => ({
	type: GET_REVIEWS,
	list,
});

const remove = (reviewId) => ({
	type: DELETE_REVIEW,
	reviewId,
});

export const getReviews = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

	if (response.ok) {
		const list = await response.json();
		//console.log(list, "This is the list **********")
		//console.log(list, "***************")
		dispatch(load(list));
		return list;
	}

	// console.log('res not ok *********************')
	return response;
};

export const postReview = (spotId, spot) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(spot),
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data, "data from post review");
		dispatch(getReviews(data.spotId));
		return data;
	}

	return res;
};

export const deleteReview = (reviewId) => async (dispatch) => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});

	if (res.ok) {
		const review = await res.json();
		console.log(review, "res when deleting a review");
		dispatch(remove(reviewId));
		return review;
	}

	return res;
};

const initialState = {
	list: [],
};

const sortList = (list) => {
	return list
		.sort((SpotA, SpotB) => {
			return SpotA.number - SpotB.number;
		})
		.map((Spot) => Spot.id);
};

const ReviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEWS:
			console.log(action, "console log the action");
			const allReviews = {};
			if (action.list.Reviews) {
				action.list.Reviews.forEach((review) => {
					allReviews[review.id] = review;
				});
			}
			//console.log(action, "load review action *******************");

			if (action.list.Reviews) {
				return {
					...allReviews,
					list: sortList(action.list.Reviews),
				};
			} else
				return {
					...action,
				};

		case DELETE_REVIEW:
			//console.log(action, "action when deleting a review");
			const newState = { ...state };
			//console.log(state, "state when deleting a review");
			delete newState[action.reviewId];

			return newState;

		default:
			return state;
	}
};

export default ReviewReducer;
