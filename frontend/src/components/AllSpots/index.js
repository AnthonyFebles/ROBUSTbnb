//aka homepage

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css";
import { getSpots } from "../../store/spots";
import { NavLink, useParams, Route } from "react-router-dom"
import SpotDetails from "../SpotDetails";




const AllSpots = () => { 

    const dispatch = useDispatch()

    useEffect (()=> {
        dispatch(getSpots())
    }, [dispatch])

    const {spotId} = useParams()

    const spot = useSelector(state => {
        //console.log( state.spots, "console.log the state")
        return state.spots.list.map(spotId => state.spots[spotId])
    })

    if (!spot) {
        //console.log('nothing here')
        return null
    }

    //console.log(spot,'console.log spot')

    // spot.forEach(element => {
    //     <h2>{element.name}</h2>
    // });



    return (
        <>
        <nav>
        {spot.map((spot) => {
			
				return (
					<NavLink key={spot.name} to={`/spots/${spot.id}`}>
						<div
							className={
								Number.parseInt(spotId) === spot.id
									? "nav-entry is-selected"
									: "nav-entry"
							}
						>
							<div
								className="nav-entry-image"
								
							></div>
							<div>
								
								<img src={`${spot.previewImage}`} alt="Spot Preview Image" />
								<div className="primary-text">{spot.name}</div>
								<div className="secondary-text">
                                    {spot.avgRating == 0 ? `New  ${'    '}  Price:$ ${spot.price} Night  Address: ${spot.city} ${spot.state}`:

									`Rating: ${spot.avgRating}     Price:$ ${spot.price} Night   Address: ${spot.city} ${spot.state}` 
                                    }
								</div>
							</div>
						</div>
					</NavLink>
				);
            })}
			</nav>
            <Route path='spots/:spotId'>
                <SpotDetails/>
            </Route>
            </>
		);
}


export default AllSpots