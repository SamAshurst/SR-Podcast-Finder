import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
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

  console.log(episodeList);
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
            <a
              className="episodes-list-link"
              href={episode.url}
              rel="noopener noreferrer"
            >
              <ListGroupItem className="p-0" key={episode.id}>
                <Container fluid className="episodes-container ps-2 pe-2 pb-2">
                  <Row className="d-grid">
                    <Col className="episodes-image-col">
                      <img
                        className="episodes-image"
                        src={episode.imageurl}
                        alt="episodes-thumbnail"
                      ></img>
                    </Col>
                    <Col>
                      <div>
                        <div className="fw-bold episodes-title">
                          {episode.title}
                        </div>
                        <div className=" episodes-text">
                          {episode.description}
                        </div>
                        <div className="text-muted episodes-published">
                          {publishedDate(episode.publishdateutc)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </ListGroupItem>
            </a>
          );
        })}
      </ListGroup>
      <Button
        className="episodes-link"
        href={`https://sverigesradio.se/avsnitt?programid=${params.programId}`}
        rel="noopener noreferrer"
      >
        Se alla avsnitt
      </Button>
    </>
  );
}
