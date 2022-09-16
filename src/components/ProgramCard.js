import { Link } from "react-router-dom";
import { Card, Container, Col, Row, Button } from "react-bootstrap";

export default function ProgramCard({ program }) {
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
            <Button className="p-1 ps-2 pe-2 programs-button">Avsnitt</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
