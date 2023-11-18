//aka Landing Page

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";

const AllSpots = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSpots());
	}, [dispatch]);

	const spot = useSelector((state) => {
		//console.log( state.spots, "console.log the state")
		return state.spots.list.map((spotId) => state.spots[spotId]);
	});

	if (!spot) {
		//console.log('nothing here')
		return null;
	}

	//console.log(spot,'console.log spot')

	// spot.forEach(element => {
	//     <h2>{element.name}</h2>
	// });

	const getDeciaml = (num) => {
		let final = 0;
		
		if (num > 0) {
			final = (Math.round(num* 100) / 100).toFixed(1);
		}

		
		return (final);
	};

	return (
		<div className="outer-nav-container">
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
														{getDeciaml(spot.avgRating)}{" "}
													</div>
													<div className="price-text">
														<b>${spot.price}</b> night
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</NavLink>
						</div>
					);
				})}
			</nav>
		</div>
	);
};

export default AllSpots;
