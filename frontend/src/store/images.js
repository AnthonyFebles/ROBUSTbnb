import { csrfFetch } from "./csrf";

const UPLOAD_IMAGE = "images/UPLOAD_IMAGE";
const UPLOAD_IMAGES = "images/UPLOAD_IMAGES";
const DELETE_IMAGE = "images/DELETE_IMAGE";

const uploadImage = (payload) => ({
	type: UPLOAD_IMAGE,
	payload,
});

const uploadImages = (payloadArray) => ({
	type: UPLOAD_IMAGES,
	payloadArray,
});

export const addImage = (spot, image) => async (dispatch) => {

	try{
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
		console.log(image, "image res")
		return image;
	}
	return response;
} catch (error) {
	const res = error.json()
	console.log(res, "res inside errors of addImage")
	throw res
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

const sortList = (list) => {
	return list
		.sort((SpotA, SpotB) => {
			return SpotA.id - SpotB.id;
		})
		.map((Spot) => Spot.id);
};

const ImageReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_IMAGE:
			console.log(action, "console log the action part 1")
			console.log(action.payload, "console.log dot payload")
			console.log(state, "console.log the state")
			return (
				action.payload
			);

		default:
			return state;
	}
};

export default ImageReducer;
