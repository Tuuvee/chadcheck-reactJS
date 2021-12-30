import './App.css';
import {Header, Dorime, Navbar, Archives, Home, Game, Footer} from './Components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom';


function App() {
  return (
 
    <div className="App">
		<Router>
			<Header />
			<Navbar />
	  
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Archives" element={<Archives />} />
				<Route path="/Dorime" element={<Dorime />} />
			</Routes>
			<Footer />
		</Router>
		
		
		
	</div>

  );
}

export default App;
