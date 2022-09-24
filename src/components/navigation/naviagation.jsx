import { Link, Outlet } from 'react-router-dom';

const Navigation = () => {
	return (
		<>
			<header>
				<div>
					<Link to='/dir'>Directions</Link>
				</div>
				<div>
					<Link to='/'>Search</Link>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default Navigation;
