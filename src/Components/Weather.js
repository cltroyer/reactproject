import { useState, useEffect, useContext } from "react";
import { WeatherContext, Alertprov } from "./WeatherContext";
import { Card } from "react-bootstrap";
import Alertzip from "./Alertzip";


const Weather = () => {
  const [rep, setRep] = useState(null);
  const [zip, setZip] = useContext(WeatherContext);
  const [show, setShow] = useState(false);

  const getWeather = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zip +
        "&appid=" + 
        process.env.REACT_APP_API_KEY  
        + "&units=imperial"
    )
      .then((res) => res.json())
      .then((weather) => {
        setRep(weather);
      });
  };

  const setWeather = (e) => {
    e.preventDefault();
    getWeather(zip);
    const interval = setInterval(() => {
      getWeather(zip);
    }, 600000);
    return () => clearInterval(interval);
  };

  const buttonHandler = (e) => {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    if (isValidZip === true) {
      setWeather(e);
      setShow(false);
    } else {
      e.preventDefault();
      setShow(true);
    }
  };

  useEffect(() => {
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, 600000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  if (!rep) {
    return (
      <form onSubmit={buttonHandler}>
        <label htmlFor="Zip">Zip Code</label>
        <input
          type="Zip"
          name="amount"
          id="Zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <>
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title>Weather</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {rep.name}, {rep.sys.country}
          </Card.Subtitle>
          <Card.Text>
            <img
              src={
                `http://openweathermap.org/img/wn/` +
                rep.weather[0].icon +
                `@2x.png`
              }
              alt=""
            />
            <div className="item1" id="local">
              {rep.weather[0].description}
            </div>
            <div className="item" id="temp">
              {rep.main.temp}°F
            </div>
            <div className="item3">Wind: {rep.wind.speed} MPH </div>
            <div className="item3">Pressure: {rep.main.pressure} mb</div>
            <Alertprov value={[show, setShow]}>{<Alertzip />}</Alertprov>
            <form onSubmit={buttonHandler}>
              <label htmlFor="Zip">Zip Code</label>
              <input
                type="Zip"
                name="amount"
                id="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </Card.Text>
          <Card.Link href={"/weather/" + zip}>Forcast</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Weather;
