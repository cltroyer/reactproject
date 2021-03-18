import "./App.css";
import Sports from "./Components/Sports";
import Weather from "./Components/Weather";
import Sportsnews from "./Components/Sportsnews";
import Forcast from "./Components/Forcast";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { WeatherProvider } from "./Components/WeatherContext";
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

function App() {
  const [zip, setZip] = useState("33611");
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Primer App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Sports">Hockey</Nav.Link>
              <Nav.Link href="/Weather/33611">Forcast</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="p-3"></div>
        <Switch>
          <Route path="/" exact>
            <div className="container">
              <div className="row p-3">
                <Sports className="pe-2" />
                <WeatherProvider value={[zip, setZip]}>
                  {<Weather />}
                </WeatherProvider>
              </div>
            </div>
          </Route>
          <Route path="/Sports">
            <Sportsnews />
          </Route>
              <Route path="/Weather/:id">
                <Forcast />
              </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
