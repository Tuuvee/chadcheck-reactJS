import React from 'react';
import { Link, withRouter } from "react-router-dom";

function Navbar(props) {
	return (

<div className="Navbar">
		<ul className="menu">
			<li className="menu"> <Link to="./">Home</Link></li>
			<li className="menu"> <Link to="./Archives"> Archives</Link></li>
			<li className="menu"> <Link to="/Dorime"> Dorime</Link></li>
			<li className="menu"> <Link to="/Todo">Todo</Link></li>
		</ul>
	  </div>
	  
	  );
}
export default Navbar;