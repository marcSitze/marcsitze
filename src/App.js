// import './App.css';
import "./New.css";
// import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <Router>
      <div className="App app-container">
        {/* <Home /> */}
        <div className="body-container">
          <Switch>
            <Route path="/" exact component={Profile} />
            <Route path="/resume" exact component={Resume} />
            <Route path="/portfolio" exact component={Portfolio} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
