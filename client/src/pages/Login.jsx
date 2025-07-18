import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginFailure, loginSuccess } from '../redux/authSlice.js';
import { axiosInstance } from '../utilities/utilities.js';
import { icons } from "../assets/dummyData.js"

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [toggle, setToggle] = useState(false);
	const { email, password } = loginData;
	const { user, loading, error, accessToken } = useSelector(
		state => state.auth
	);

	console.log(user);
	const onChange = event => {
		setLoginData(prev => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	console.log(loginData)
	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(loginStart());
		if (email && password) {
			try {
				const res = await axiosInstance.post(
					'/auth/login-user',
					loginData
				);
				if (res.status === 200 || res.statusText === 'OK') {
					dispatch(loginSuccess(res.data));
					setLoginData({ email: '', password: '' });
					navigate('/');
					console.log(res);
					toast.success("Successfully Logged in🥇")
				}
			} catch (err) {
				if (err || !res.status === 200 || !res.statusText === 'OK') {
					dispatch(loginFailure(err?.response?.data.msg));
					setLoginData({ email: '', password: '' });
					toast.error(err?.response?.data?.msg)
					console.log(err);
				}
			}
		} else {
			toast.error('Soory! • Cannot log you without credentials')
			console.log('error', error);
		}
	};

	const togglePassword = () => {
		setToggle(prev => !prev);
	};
	return (
		<div className="flex flex-col bg-white h-screen justify-center items-center bg-red-400 w-full">
			<div className="grid grid-cols-12 ">
				<div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center space-y-3 px-8 w-full">
					<div className="flex flex-col space-y-3">
						<p className="text-2xl font-bold text-red-800">
							Log in and get <br/> productive
						</p>
						<p className="text-sm font-normal text-gray-600">
							You can Login using your Lancer.com account to access
							our services.
						</p>
					</div>
					<div className="flex flex-col space-y-6 w-full">
						<form
							// onSubmit={handleLogin}
							action=""
							className="flex flex-col space-y-2"
						>
							<label className="text-sm font-semibold text-gray-600" htmlFor="email">Email</label>
							{/*<span className="">*/}
							<input
								onChange={onChange}
								type="email"
								value={email}
								name="email"
								id="email"
								placeholder="Email"
								className="border border-gray-300 bg-white active:bg-white rounded-md outline-none hover:outline-none w-full h-12 px-3 py-1 text-gray-500 text-sm"
							/>
							{/*</span>*/}
							<label className="text-sm font-semibold text-gray-600" htmlFor="password">Password</label>
							<input
								onChange={onChange}
								type="password"
								value={password}
								name="password"
								id="password"
								placeholder="Password"
								className="border border-gray-300 bg-white active:bg-white rounded-md outline-none hover:outline-none w-full h-12 px-3 py-1 text-gray-500 text-lg"
							/>
							<button
								onClick={handleSubmit}
								type="submit"
								disabled={loading}
								className="bg-red-800 text-white rounded-md text-xs font-semibold w-full h-12 px-3 py-2 cursor-pointer my-4"
							>
								{loading ? 'Logging in...' : 'SUBMIT'}
							</button>
							<div className="flex items-center text-xs text-gray-400 justify-self-center">
								Don't have an account?
								<span
									onClick={() => navigate('/account/signup')}
									className="cursor-pointer text-orange-400 hover:font-semibold transition-all delay-200 ml-2"
								>
									SignUp here
								</span>
								<span
									onClick={() => navigate('/reset-password')}
									className="cursor-pointer text-blue-400 cursor-pointer font-semibold transition-all delay-200 ml-2 hover:underline hover:text-blue-600 transition-all delay-200"
								>
									Forgot Password?
								</span>
							</div>
						</form>
						<div className="flex space-y-6 my-4 w-full justify-center">
							<div className="flex space-x-2 items-center my-4 w-full justify-center">
								<span className="h-0.25 bg-gray-300 w-1/5"></span>
								<p className="text-xs font-normal text-gray-600">
									or use one of these options
								</p>
								<span className="h-0.25 bg-gray-300 w-1/5"></span>
							</div>
						</div>
						<div className="flex items-center space-x-3 justify-center">
							{icons.map(icon => (
								<img key={icon.id} src={icon.img} alt={icon.img} className="h-12 w-12" />
							))}
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-8 hidden lg:flex flex-col h-full">
					<img src="https://www.hercjobs.org/wp-content/uploads/2020/07/Is-now-a-good-time-to-look-for-a-job-HERC.jpg" alt="" />
				</div>
			</div>
		</div>
	)
}

export default Login