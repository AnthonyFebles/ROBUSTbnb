import { csrfFetch } from "./csrf";

const UPLOAD_IMAGE = "images/UPLOAD_IMAGE";

const uploadImage = (payload) => ({
	type: UPLOAD_IMAGE,
	payload,
});

export const addImage = (spot, image) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/spots/${spot}/images`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(image),
		});

		if (response.ok) {
			const image = await response.json();
			dispatch(uploadImage(image));
			//console.log(image, "image res")
			return image;
		}
		return response;
	} catch (error) {
		const res = error.json();
		//console.log(res, "res inside errors of addImage")
		throw res;
	}
};

// export const updateSpot = (spot) => async (dispatch) => {
// 	const response = await fetch(`/api/spot/${spot.id}`, {
// 		method: "PUT",
// 		body: JSON.stringify(spot),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});

// 	if (response.ok) {
// 		const Spot = await response.json();
// 		dispatch(updatedSpot(spot));
// 		return Spot;
// 	}

// 	return new Error("Failed to Update");
// };

const initialState = {
	list: [],
};

const ImageReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_IMAGE:
			//console.log(action, "console log the action part 1")
			//console.log(action.payload, "console.log dot payload")
			//console.log(state, "console.log the state")
			return action.payload;

		default:
			return state;
	}
};

export default ImageReducer;
