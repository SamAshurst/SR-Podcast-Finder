import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import * as api from "../utils/api";

export default function ProgramList() {
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

  return (
    <>
      <div>{params.channel}</div>
      <div>{params.category}</div>
      <Container className="p-1 m-auto">
        <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-4 d-flex m-auto">
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
                    <Link to={program.id}>
                      <Button>Avsnitt</Button>
                    </Link>
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
