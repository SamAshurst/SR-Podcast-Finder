import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import * as api from "../utils/api";
import publishedDate from "../utils/TimeConverter";

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
      <Button
        href={`https://sverigesradio.se/avsnitt?programid=${params.programId}`}
        rel="noopener noreferrer"
      >
        Se alla avsnitt
      </Button>
      <ListGroup>
        {episodeList.map((episode) => {
          return (
            <ListGroupItem className="Episodes-ListGroup">
              <Container fluid className="Episodes-Container">
                <Row className="d-grid">
                  <Col className="Episodes-image-col">
                    <img
                      className="Episodes-image"
                      src={episode.imageurl}
                      alt="episode thumbnail"
                    ></img>
                  </Col>
                  <Col>
                    <div>
                      <div className="fw-bold Episodes-title">
                        {episode.title}
                      </div>
                      <div className=" Episodes-text">
                        {episode.description}
                      </div>
                      <div className="text-muted Episodes-published">
                        {publishedDate(episode.publishdateutc)}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </ListGroupItem>
          );
        })}
      </ListGroup>
      {/* <Container className="p-1 m-auto">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 d-flex m-auto">
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
                    <Card.Text className="text-muted">
                      {publishedDate(episode.publishdateutc)}
                    </Card.Text>
                    <Button href={episode.url} rel="noopener noreferrer">
                      Se på SR
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container> */}
      <Button
        className="Episodes-link"
        href={`https://sverigesradio.se/avsnitt?programid=${params.programId}`}
        rel="noopener noreferrer"
      >
        Se alla avsnitt
      </Button>
    </>
  );
}
