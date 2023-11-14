
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageSpots.css";
import { getUserSpots } from "../../store/userSpot";
import { NavLink, useParams, Route, useHistory } from "react-router-dom";
import SpotDetails from "../SpotDetails";



//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY
//! LOADING PREVIOUS SPOTS IN STATE, SHOULD USE A NEW REDUCER CALLED USER SPOT TO GET RID OF THIS BUG MORE EASILY

const ManageSpots = () => {
	const dispatch = useDispatch();
    const history = useHistory()

	useEffect(() => {
		dispatch(getUserSpots());
	}, [dispatch]);

	const handleNewSpot = () => {
        history.push('/spots/new')
    }

	const spot = useSelector((state) => {
		//console.log( state, "console.log the state")
		return state.userSpots.userList.map((spotId) => state.userSpots[spotId]);
	});

    //console.log(spot, 'spot')

	if (!spot.length) {
		
		return (
            <div className="outer-div-manage">
				<h1 className="manage-spots-header">Manage Your Spots</h1>
            <button onClick={handleNewSpot} >Create New Spot</button>
            </div>
        )
	}

	//console.log(spot,'console.log spot')

	// spot.forEach(element => {
	//     <h2>{element.name}</h2>
	// });

	return (
		<>
			<div className="outer-div-manage">
				<h1 className="manage-spots-header">Manage Your Spots</h1>
				<nav>
					{spot.toReversed().map((spot) => {
						return (
							<div key={spot.id} className="all-spots">
								<NavLink to={`/spots/${spot.id}`}>
									<div className="thumbnail-container">
										<div>
											<img
												src={`${spot.previewImage}`}
												alt="Spot Preview Image"
												className="thumbnail-image"
												title={`${spot.name}`}
											/>
										</div>
										<div className="thumbnail">
											<div className="secondary-text">
												{spot.avgRating == 0 ? (
													<>
														<div className="address-text">
															{spot.city}, {spot.state}
														</div>
														<div className="star-text">
															<i className="fa-solid fa-star"></i> New {"   "}{" "}
														</div>
														<div className="price-text">
															<b>${spot.price}</b> night
														</div>
													</>
												) : (
													<>
														<div className="address-text">
															{spot.city}, {spot.state}
														</div>
														<div className="star-text">
															<i className="fa-solid fa-star"></i>{" "}
															{spot.avgRating}{" "}
														</div>
														<div className="price-text">
															<b>${spot.price}</b> night
														</div>
													</>
												)}
											</div>
										</div>
										<div className="update-delete-container">
											<span className="update-delete-buttons">
												<button className="update">Update</button>{" "}
												<button className="delete">Delete</button>
											</span>
										</div>
									</div>
								</NavLink>
							</div>
						);
					})}
				</nav>
			</div>
		</>
	);
};

export default ManageSpots;
