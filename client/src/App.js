import {useEffect} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Shorten from './components/Shorten';
import Nav from './components/Nav';
import Footer from './components/Footer'

function App() {

  return (
    <Router>
    <div className="wrapper">
      <div className="container">

        <Nav/>

        <Switch>
          <Route path="/shorten">
            <Shorten/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/:shortURL" children={<Redirect />} />{/*if the frontend app domain is same as the shortened links domain this will redirect those links to the backend*/}
        </Switch>

      </div>
      <Footer/>
    </div>
    </Router>
  );
}
export default App;

function Redirect() {
  let { shortURL } = useParams();
  useEffect(()=>{
    window.location.replace(`https://hkurl-api.herokuapp.com/${shortURL}`)
  },[])

  return (
    <div>
      <h3>redirecting...</h3>
    </div>
  );
}
