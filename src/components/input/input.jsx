import { useState } from 'react';
import axios from 'axios';
import Map from '../map/map';
import History from '../history/history';

const InputComponent = (props) => {
	const [inputData, setData] = useState('');

	const [lat, setLat] = useState(35.6594945);
	const [lng, setLng] = useState(139.6999859)
	const [history, setHistory] = useState([])

	const [isClicked, setClick] = useState(false);


	const onInputChange = (e) => {
		setData(e.target.value);
	};

	const onClickChange = (lat, lng) => {
		setLat(lat);
		setLng(lng);
	}

	const clicked = () => {
		history.push(inputData);
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${inputData}%2024b&key=AIzaSyAnbAD_1D0e6jNmFTA6P8kBAA2zs4TOlx0`
			)
			.then((res) => {
				setLat(res.data.results[0].geometry.location.lat)
				setLng(res.data.results[0].geometry.location.lng)

				console.log(
					res.data.results[0].geometry.location.lat,
					res.data.results[0].geometry.location.lng
				)
			}

			)
			.catch((err) => console.log(err));
	};



	return (
		<div>
			<input onChange={onInputChange} type='search' />
			<button onClick={clicked}>Send</button>
			<Map lat={lat} lng={lng} />

			<History history={history} onClickChange={onClickChange} />
		</div>
	);
};

export default InputComponent;
