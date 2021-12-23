import React from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import './Header.css';


// const options=[
// 	{ value: 'usd', label: 'USD' },
//   	{ value: 'inr', label: 'INR' },
//   	]

const Header = () => {

	const navigate = useNavigate();

	return (
		<div className="app-bar">
			<div className="container">
				<div className="toolbar ">
					<p className="title" onClick={() => navigate (`/`)}>Crypto Dashboard</p>
					{/*<Select options={options} />*/}
				</div>
			</div>
		</div>
	)
}

export default Header