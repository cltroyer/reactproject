import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Alertzip from "./Alertzip";
import { Alertprov } from "./WeatherContext";

const Forcast = () => {
  const [rep, setRep] = useState(null);
  const { id } = useParams();
  const [zip, setZip] = useState(id);
  const [show, setShow] = useState(false);

  const getWeather = () => {
    console.log(zip);
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?zip=" +
        zip +
        "&appid=" + process.env.REACT_APP_API_KEY +"&units=imperial"
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
          onSubmit={(e) => setZip(e.target.value)}
        />
        <button type="submit" href={"/" + zip}>
          Submit
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="container">
        <h1>Weather</h1>
        <h2>
          {rep.city.name}, {rep.city.country}
        </h2>
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
        <div className="container">
          <div className="row">
            {rep.list.map((day) => (
              <Card style={{ width: "20%" }}>
                <Card.Body>
                  <Card.Title>Forcast For</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {day.dt_txt}
                  </Card.Subtitle>
                  <Card.Text>
                    <img
                      src={
                        `http://openweathermap.org/img/wn/` +
                        day.weather[0].icon +
                        `@2x.png`
                      }
                      alt=""
                    />
                    <div className="item1" id="local">
                      {day.weather[0].description}
                    </div>
                    <div className="item" id="temp">
                      {day.main.temp}°F
                    </div>
                    <div className="item3">Wind: {day.wind.speed} MPH </div>
                    <div className="item3">
                      Pressure: {day.main.pressure} mb
                    </div>
                    <div className="item4">{day.sys.dt_txt}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forcast;
