import { NavLink, Outlet } from 'react-router-dom';

const Navigation = () => {
	return (
		<>
			<header>
				<div>
					<NavLink className={({ isActive }) =>
						isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin'
					} to='/dir'>Search</NavLink>
				</div>
				<div>
					<NavLink className={({ isActive }) =>
						isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin'
					} to='/'>Directions</NavLink>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default Navigation;
