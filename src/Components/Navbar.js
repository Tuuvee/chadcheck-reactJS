import React from 'react';
import { Link, withRouter } from "react-router-dom";

function Navbar(props) {
	return (

<div className="Navbar">
		<ul className="menu">
			<li className="menu"> <Link to="./">Home</Link></li>
			<li className="menu"> <Link to="./Archives"> Archives</Link></li>
			<li className="menu"> <Link to="/Dorime"> Dorime</Link></li>
			<li className="menu"> <a href="https://google.com" target="blank">Gamer </a></li>
			<li className="menu"> <a href="https://www.urbandictionary.com/define.php?term=Pog" target="blank"> Pog </a></li>
			<li className="menu"> <a href="https://soundcloud.com" target="blank"> Zooommm</a></li>
		</ul>
	  </div>
	  
	  );
}
export default Navbar;