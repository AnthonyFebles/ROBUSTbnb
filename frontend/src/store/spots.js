import { csrfFetch } from "./csrf";
const LOAD = "spot/LOAD";
const CREATE_SPOT = "spot/CREATE_Spot";
const UPDATE_SPOT = "spot/UPDATE_Spot";
const DELETE_SPOT = 'spot/DELETE'



const load = (list) => ({
	type: LOAD,
	list,
});


const createSpot = (spot) => ({
	type: CREATE_SPOT,
	spot,
});

const updatedSpot = (spot) => ({
	type: UPDATE_SPOT,
	spot,
});





export const getSpots = () => async (dispatch) => {
	const response = await fetch(`/api/spots`);

	if (response.ok) {
		const list = await response.json();
        //console.log(list, "This is the list **********")
		//console.log(list, "***************")
		dispatch(load(list));
	}

    

	return response;
};



export const createNewSpot = (spot) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(spot),
	});

	if (response.ok) {
		const newSpot = await response.json();
		dispatch(createSpot(newSpot));
		return newSpot;
	}

	return new Error("Failed to create Spot");
};

export const updateSpot = (spot) => async (dispatch) => {
	const response = await fetch(`/api/spot/${spot.id}`, {
		method: "PUT",
		body: JSON.stringify(spot),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const Spot = await response.json();
		dispatch(updatedSpot(spot));
		return Spot;
	}

	return new Error("Failed to Update");
};

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

const SpotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
            //console.log(action, "console log the action")
			const allSpots = {};
			action.list.Spots.forEach((spot) => {
				allSpots[spot.id] = spot;
			});
            console.log(action, "load action")
			return {
				...allSpots,
				...state,
				list: sortList(action.list.Spots),
			};
	
		
		default:
			return state;
	}
};

export default SpotsReducer;
