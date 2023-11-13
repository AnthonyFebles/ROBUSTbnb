import "./NewSpot.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewSpot } from "../../store/spots";
import { addImage } from "../../store/images";
import { getSpots } from "../../store/spots";

const NewSpot = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [previewImg, setPreviewImg] = useState("");
	const [imageOne, setImageOne] = useState("");
	const [imageTwo, setImageTwo] = useState("");
	const [imageThree, setImageThree] = useState("");
	const [imageFour, setImageFour] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		dispatch(getSpots());
	}, [dispatch]);

	const spots = useSelector((state) => {
		return state.spots.list;
	});

    const spotId = spots.length + 1;
    

	//console.log(spots, "spots");

	const payload = {
		address,
		city,
		country,
		description,
		lat,
		lng,
		name: title,
		price,
		state,
	};

	const imgPayload = [previewImg, imageOne, imageTwo, imageThree, imageFour];

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(createNewSpot(payload))
			.catch(async (res) => {
				const data = await res.json();
				if (data) {
					if (data.message) {
						setErrors({ message: data.message });
						alert(data.message);
					}
					if (data.errors instanceof Object) {
						const derrors = data.errors;
                        console.log(derrors, "form errors")
						if (derrors) {
							setErrors({
								address: derrors.address,
								city: derrors.city,
								country: derrors.country,
								description: derrors.description,
								name: derrors.name,
								price: derrors.price,
								state: derrors.state,
							});

							if (lat.length > 0) {
								setErrors({
									...errors,
									lat: derrors.lat,
								});
							}
							if (lng.length > 0) {
								setErrors({
									...errors,
									lng: derrors.lng,
								});
							}
						}
					}
                    
                    if (typeof data.errors === typeof 'string') {
                        alert(data.errors)
                    }
                    
					if (!data.errors) {
						
                        return dispatch(addImage(imgPayload, spotId)).catch(async (res) => {
                            const data = await res.json()
                            if (data) {
                                if (data.message) {
                                    setErrors({message: data.message})
                                    alert(data.message)
                                }
                                if(data.errors) {
                                    const derrors = data.errors
                                    console.log(derrors, 'img errors')
                                }
                            }
                        }).then( () => [
                            history.push(`/spots/${spotId}`)
                        ])
						
					}
				}
			})
			
	};

	return (
		<>
			<div className="headers">
				<h1>Create a new Spot</h1>
				<h2>Where's your place located?</h2>
				<p>
					Guests will only get your exact address once the booked a reservation.
				</p>
			</div>
			<form className="newSpotForm" onSubmit={handleSubmit}>
				<div className="location-form">
					<label>
						Country
						<input
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></input>
					</label>
					{errors.country && <errors>{errors.country}</errors>}
					<label>
						Street Address
						<input
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></input>
					</label>
					{errors.address && <errors>{errors.address}</errors>}
					<span className="cityState-form">
						<label>
							City
							<input
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							></input>
						</label>
						{errors.city && <errors>{errors.city}</errors>}
						<label>
							State
							<input
								placeholder="State"
								value={state}
								onChange={(e) => setState(e.target.value)}
							></input>
						</label>
						{errors.state && <errors>{errors.state}</errors>}
					</span>
					<span className="latLong-form">
						<label>
							Latitude
							<input
								placeholder="Latitude"
								value={lat}
								onChange={(e) => setLat(e.target.value)}
							></input>
							,
						</label>
						{errors.lat && lat.length > 0 && <errors>{errors.lat}</errors>}
						<label>
							Longitude
							<input
								placeholder="Longitude"
								value={lng}
								onChange={(e) => setLng(e.target.value)}
							></input>
						</label>
						{errors.lng && lng.length > 0 && <errors>{errors.lng}</errors>}
					</span>
				</div>

				<div className="description-form">
					<div className="description-headers">
						<h2>Describe your place to guests</h2>
						<p>
							Mention the best features of your space, any special amenities
							like fast wifi, or parking, and what you love about the
							neighborhood.
						</p>
					</div>
					<textarea
						className="descriptionText-form"
						rows={10}
						placeholder="Please write at least 30 characters"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
					{errors.description && <errors>{errors.description}</errors>}
				</div>

				<div className="title-form">
					<div className="title-headers">
						<h2>Create a title for you spot</h2>
						<p>
							Catch guests' attention with a spot title that highlights what
							makes your place special.
						</p>

						<input
							placeholder="Name of your spot"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
				</div>

				<div className="price-form">
					<div className="price-headers">
						<h2>Set a base price for your spot</h2>
						<p>
							Competitive pricing can help your listing stand out and rank
							higher in search results.
						</p>
					</div>
					${" "}
					<input
						placeholder="Price per night(USD)"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					></input>
				</div>

				<div className="photos-form">
					<div className="photos-headers">
						<h2>Liven up your spot with photos</h2>
						<p>Submit a link to at least one photo to publish your spot.</p>
					</div>

					<input
						placeholder="Preview image URL)"
						value={previewImg}
						onChange={(e) => setPreviewImg({url: e.target.value,
		spotId,
		isPreview: true})}
					></input>
					<input placeholder="Image URL"></input>
					<input placeholder="Image URL"></input>
					<input placeholder="Image URL"></input>
					<input placeholder="Image URL"></input>
				</div>

				<div className="submitButton-form">
					<button className="createSpotButton-form">Create a spot</button>
				</div>
			</form>
		</>
	);
};

export default NewSpot;
