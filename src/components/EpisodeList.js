import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import * as api from "../utils/api";

export default function Episodes() {
  const [episodeList, setEpisodeList] = useState();
  const [isLoading, setLoading] = useState();
  const params = useParams();

  useEffect(() => {
    api.getEpisodes(params.programId).then((episodes) => {
      setEpisodeList(episodes);
      setLoading(false);
    });
  }, [params.programId]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!episodeList) {
    return <div>No programs for this category</div>;
  }

  return (
    <>
      <div>{params.channel}</div>
      <div>{params.category}</div>
      <Container className="p-1 m-auto">
        <Row XS={2} sm={2} md={3} lg={4} xl={6} className="g-4 d-flex m-auto">
          {episodeList.map((episode) => {
            return (
              <Col className="d-flex" key={episode.id}>
                <Card border="dark">
                  <Card.Img
                    variant="top"
                    className="Episode-image"
                    src={episode.imageurl}
                  />
                  <Card.Body className="p-1">
                    <Card.Title>{episode.title}</Card.Title>
                    <Card.Text>{episode.description}</Card.Text>
                    <Card.Text>{`Published: ${episode.publishdateutc}`}</Card.Text>
                    <Button href={episode.url} rel="noopener noreferrer">
                      Se mer på SR
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

// {/* <Button
// href={`https://sverigesradio.se/avsnitt?programid=${program.id}`}
// rel="noopener noreferrer"
// >
// Se mer på SR
// </Button> */}
