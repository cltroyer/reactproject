import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";


const Sportsnews = () => {
  const [sportsNews, setSportsNews] = useState(null);
  const [stories, setStories] = useState([]);

  const loadUrls = (info) => {
    let urlList = [];


    info.map((list) => urlList.push(list.links.api.news.href));
    return Promise.all( urlList.map((url) =>{
        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
                return data.headlines? data.headlines[0].description: "" ;
            })
        }))
  };

  const fetchSportsData = () => {
    const url = "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news";
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
          console.log('load');
        setSportsNews(data.articles);
        loadUrls(data.articles)
        .then((storyData)=> {
            setStories(storyData)
        })
      });
  };



  useEffect(() => {
    fetchSportsData();
    console.log(stories.length)
 // eslint-disable-next-line
  }, []);

  if (!sportsNews) {
    return "loading.....";
  }


  return (
    <>
    <div className="container">
    <h1>Sports</h1>
      <div className="container">
        <div className="row">
          {sportsNews.map((game, index) => (
            <Card style={{ width: "33.3%" }}>
              <Card.Img variant="top" src={game.images[0].url} />
              <Card.Body>
                <Card.Title>{game.headline}</Card.Title>
                <Card.Text>
                  {stories[index]}
                </Card.Text>
                <Button variant="primary" href={game.links.web.href}>
                  Go to ESPN
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Sportsnews;
