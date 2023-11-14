//aka Landing Page

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageSpots.css";
import { getUserSpots } from "../../store/spots";
import { NavLink, useParams, Route } from "react-router-dom";
import SpotDetails from "../SpotDetails";

const ManageSpots = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserSpots());
	}, [dispatch]);

	const { spotId } = useParams();

	const spot = useSelector((state) => {
		//console.log( state.spots, "console.log the state")
		return state.spots.list.map((spotId) => state.spots[spotId]);
	});

    console.log(spot, 'spot')

	if (!spot.length) {
		
		return (
            <button>Create New Spot</button>
        )
	}

	//console.log(spot,'console.log spot')

	// spot.forEach(element => {
	//     <h2>{element.name}</h2>
	// });

	return (
		<>
			<div className="outer-div-manage">
				<h1 className="manage-spots-header">Manage Spots</h1>
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
