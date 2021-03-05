import Header from './components/Header';
import AppBody from './components/AppBody';
import { BrowserRouter as Router } from 'react-router-dom'
import './assets/App.css';


function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<AppBody />
			</Router>
		</div>
	);
}

export default App;
