import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, Container, Col, Row } from "react-bootstrap";
import * as api from "../utils/api";

export default function Category() {
  const [programList, setProgramList] = useState();
  const [isLoading, setLoading] = useState(true);

  const params = useParams();
  const location = useLocation();
  const {
    category: { id: categoryId },
    channelId,
  } = location.state;

  useEffect(() => {
    api
      .getProgramsForChannelCategory(channelId, categoryId)
      .then((programs) => {
        setProgramList(programs);
        setLoading(false);
      });
  }, [categoryId, channelId]);

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (!programList) {
    return <div>No programs for this category</div>;
  }
  console.log(programList);
  return (
    <>
      <div>{params.channel}</div>
      <div>{params.id}</div>
      <Container className="p-1 m-auto">
        <Row xs={2} sm={2} md={3} lg={4} xl={6} className="g-4 d-flex m-auto">
          {programList.map((program) => {
            return (
              <Col className="d-flex" key={program.id}>
                <Card border="dark">
                  <Card.Img
                    variant="top"
                    className="Program-image"
                    src={program.programimage}
                  />
                  <Card.Body className="p-1">
                    <Card.Title>{program.name}</Card.Title>
                    <Card.Text>{program.description}</Card.Text>
                    <Card.Text>{program.programurl}</Card.Text>
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
