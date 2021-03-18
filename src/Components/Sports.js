import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Sports = () => {
  const [sportsData, setSportsData] = useState(null);

  const fetchSportsData = () => {
    const url =
      "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSportsData(data.events);
      });
  };

  useEffect(() => {
    fetchSportsData();
    const interval = setInterval(() => {
      fetchSportsData();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!sportsData) {
    return "loading.....";
  }
  return (
    <Card style={{ width: "40rem" }}>
      <Card.Body>
        <Card.Title>SPORTS</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Scores</Card.Subtitle>
        <Card.Text>
          <p>
            {sportsData.map((game, key) => (
              <div>
                {" "}
                {game.name} {game.competitions[0].competitors[0].score} -{" "}
                {game.competitions[0].competitors[1].score}{" "}
                {game.competitions[0].status.type.detail}{" "}
              </div>
            ))}
          </p>
        </Card.Text>
        <Card.Link href="/sports">Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Sports;
