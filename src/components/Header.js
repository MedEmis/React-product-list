import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css/dist/js/materialize.min.js';

const Header = () => {

	const navbar = useRef(null)


	useEffect(() => {
		M.Sidenav.init(navbar.current, {
			inDuration: 350,
			outDuration: 350,
			edge: 'left'
		})
	}, [])

	return (
		<>
			<nav className="nav-extended">
				<div className="nav-wrapper blue darken-4">
					<a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<Link to="/" >Products List</Link>
						</li>
					</ul>
				</div>
			</nav>
			{/* sidebar */}
			<ul ref={navbar} className="sidenav" id="mobile-demo">
				<li>
					<Link to="/" >Products List</Link>
				</li>
			</ul>
		</>
	);
}

export default Header;