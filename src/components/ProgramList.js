import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import * as api from "../utils/api";

export default function ProgramList() {
  const [programList, setProgramList] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const params = useParams();
  const location = useLocation();
  const {
    category: { id: categoryId },
    channelId,
  } = location.state;

  useEffect(() => {
    api.getProgramsForChannelCategory(channelId, categoryId).then((data) => {
      setProgramList(data.programs);
      setPage(data.pagination.page);
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
      <Container className="p-1 m-auto ">
        <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-4 d-flex m-auto">
          {programList.map((program) => {
            return (
              <Col className="d-flex programs-col" key={program.id}>
                <Card border="dark programs-card">
                  <Card.Img
                    variant="top"
                    className="programs-image"
                    src={program.programimage}
                  />
                  <Card.Body className="p-1">
                    <Card.Title className="mb-0 programs-title">
                      {program.name}
                    </Card.Title>
                    <Card.Text className="mb-0 programs-text">
                      {program.description}
                    </Card.Text>
                    <Link to={program.id}>
                      <Button className="p-1 ps-2 pe-2 programs-button">
                        Avsnitt
                      </Button>
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
