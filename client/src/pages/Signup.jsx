import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
	signUpStart,
	signUpFailure,
	signUpSuccess,
} from '../redux/authSlice.js';
import { axiosInstance } from '../utilities/utilities.js';

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signUpData, setSignUpData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	});
	const [toggle, setToggle] = useState(false);
	const { email, password, firstName, lastName } = signUpData;
	const { user, loading, error, accessToken } = useSelector(
		state => state.auth
	);

	console.log(user);
	const onChange = event => {
		setSignUpData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(signUpStart());
		if (email && password && firstName && lastName) {
			try {
				const res = await axiosInstance.post(
					'/auth/register-user',
					signUpData
				);
				if (res.status === 201 || res.statusText === 'OK') {
					dispatch(signUpSuccess(res.data));
					setSignUpData({
						email: '',
						password: '',
						firstName: '',
						lastName: '',
					});
					navigate('/account/login');
					// toast.success("Successfully Logged in🥇")
				}
				console.log(res);
			} catch (err) {
				if (err || !res.status === 200 || !res.statusText === 'OK') {
					dispatch(signUpFailure(err?.response?.data.msg));
					setSignUpData({
						email: '',
						password: '',
						firstName: '',
						lastName: '',
					});
					// toast.error(err?.response?.data?.msg)
				}
			}
		} else {
			// toast.error('Soory! • Cannot log you without credentials')
			console.log('error', error);
		}
	};
	return (
		<div className="flex flex-col bg-white h-screen justify-center items-center w-full px-3 md:px-10 lg:px-20">
			<div className="flex flex-col space-y-6 h-92 w-1/3">
				<div className="flex flex-col space-y-3">
					<p className="text-lg font-bold text-red-800">
						Sign up or create an account
					</p>
					<p className="text-sm font-normal text-gray-600">
						You can sign up using your Lancer.com account to access
						our services.
					</p>
				</div>
				<div className="flex flex-col space-y-6">
					<form action="" className="flex flex-col space-y-4">
						<span className="border border-gray-300 bg-white active:bg-white rounded-md w-full h-12 px-3 py-1">
							<input
								onChange={onChange}
								value={firstName}
								type="text"
								name="firstName"
								id="firstName"
								placeholder="First Name"
								className="border-none outline-none hover:outline-none bg-transparent active:bg-white w-full h-full text-gray-500 text-sm"
							/>
						</span>
						<span className="border border-gray-300 bg-white active:bg-white rounded-md w-full h-12 px-3 py-1">
							<input
								onChange={onChange}
								value={lastName}
								type="text"
								name="lastName"
								id="lastName"
								placeholder="Last Name"
								className="border-none outline-none hover:outline-none w-full h-full text-gray-500 text-sm"
							/>
						</span>
						<span className="border border-gray-300 bg-white active:bg-white rounded-md w-full h-12 px-3 py-1">
							<input
								onChange={onChange}
								type="email"
								value={email}
								name="email"
								id="email"
								placeholder="Email"
								className="border-none outline-none hover:outline-none w-full h-full text-gray-500 text-sm"
							/>
						</span>
						<span className="border border-gray-300 bg-white active:bg-white rounded-md w-full h-12 px-3 py-1">
							<input
								onChange={onChange}
								value={password}
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								className="border-none outline-none hover:outline-none bg-transparent w-full h-full text-gray-500 text-sm"
							/>
						</span>
						<button
							onClick={handleSubmit}
							type="submit"
							disabled={loading}
							className="bg-red-800 text-white rounded-md text-xs font-semibold w-full h-12 px-3 py-2 cursor-pointer"
						>
							{loading ? 'Signing in...' : 'SUBMIT'}
						</button>
						<div className="flex items-center text-xs text-gray-400 font-bold justify-self-center">
							Already have an account?
							<span
								onClick={() => navigate('/account/login')}
								className="cursor-pointer text-orange-400 hover:font-semibold transition-all delay-200 ml-2"
							>
								Login here
							</span>
						</div>
					</form>
					<div className="flex space-x-2 items-center my-4 w-full justify-center">
						<span className="h-0.25 bg-gray-300 w-1/5"></span>
						<p className="text-xs font-normal text-gray-600">
							or use one of these options
						</p>
						<span className="h-0.25 bg-gray-300 w-1/5"></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup