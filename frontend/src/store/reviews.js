import { csrfFetch } from "./csrf";
const GET_REVIEWS = "reviews/GET_REVIEWS";
const POST_REVIEW = "reviews/POST_REVIEW";

const load = (list) => ({
	type: GET_REVIEWS,
	list,
});

const create = (payload) => ({
	type: POST_REVIEW,
	payload,
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
		dispatch(create(data));
		return data;
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
					...state,
					list: sortList(action.list.Reviews),
				};
			} else
				return {
					...action,
				};

		default:
			return state;
	}
};

export default ReviewReducer;
