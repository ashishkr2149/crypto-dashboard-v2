import React,{ useState } from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import AuthModal from '../AuthModal/AuthModal';
import { CryptoState } from '../../CryptoContext';
import './Header.css';


// const options=[
// 	{ value: 'usd', label: 'USD' },
//   	{ value: 'inr', label: 'INR' },
//   	]

const Header = () => {
	
	const [show, setShow] = useState(false);
	const{ user } = CryptoState();

	const showModal = () => {
    	setShow(true);
  	};
 
	const hideModal = () => {
    	setShow(false);
  	};

	const navigate = useNavigate();

	return (
		<div className="app-bar">
			<div className="container">
				<div className="toolbar ">
					<p className="title" onClick={() => navigate (`/`)}>Crypto Dashboard</p>
					{/*<Select options={options} />*/}
				</div>
				<AuthModal show={show} handleClose={hideModal} />
				<div>
				{ user?
					<div className={`login`} type="button" >
          				Logout
          			</div>:
					<div className={`login ${show ? "active" : "inactive"}`} type="button" onClick={()=>showModal()}>
          				Login/SignUp
          			</div>
          		}	
				</div>
			</div>
		</div>
	)
}

export default Header