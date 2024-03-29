import { Card, Button, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ChannelList({ channels }) {
  const regex = new RegExp("P4");

  const p4LocalChannels = channels.filter((channel) => {
    return regex.test(channel.name);
  });

  p4LocalChannels.forEach((channel, i) => {
    if (channel.name === "P4 Stockholm") {
      p4LocalChannels.splice(i, 1);
      p4LocalChannels.unshift(channel);
    }
  });
  const extraChannels = [];

  const mainChannels = channels.filter((channel, i) => {
    if (i >= 3 && !p4LocalChannels.includes(channel)) {
      extraChannels.push(channel);
    }
    return (
      !p4LocalChannels.includes(channel) && !extraChannels.includes(channel)
    );
  });

  return (
    <>
      <Container className="p-3 pt-4">
        <Row xs={2} sm={2} md={2} lg={3} xl={4} className="g-4 d-flex">
          {mainChannels.map((channel) => {
            return (
              <Col className="d-flex channels-col" key={channel.id}>
                <Card border="dark channels-card">
                  <Card.Img
                    variant="top"
                    className="channels-logo"
                    src={channel.image}
                  />
                  <Card.Body className="p-1">
                    <Card.Title className="mb-0 channels-title">
                      {channel.name}
                    </Card.Title>
                    <Card.Text className="mb-1 channels-text">
                      {channel.tagline}
                    </Card.Text>
                    <Link to={channel.name} state={channel.id}>
                      <Button
                        variant="primary"
                        className="mb-0 mt-0 channels-button"
                      >
                        Gå till kanalsidan
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
          <Col className="d-flex channels-col">
            <Card border="dark channels-card">
              <Card.Img
                variant="top"
                className="channels-logo"
                src={p4LocalChannels[0].image}
              ></Card.Img>
              <Card.Body className="p-1">
                <Card.Title className="mb-0 channels-title">
                  P4 Lokal
                </Card.Title>
                <Card.Text className="mb-1 channels-text">
                  Lokal radiokanalarna med nyheter, sport och kultur i en härlig
                  blandning.
                </Card.Text>
                <div className="dropdown">
                  <Button className="dropbtn channels-button">
                    Välj en kanal
                  </Button>
                  <div className="dropdown-content channels-button">
                    {p4LocalChannels.map((channel) => {
                      // create href link
                      return <div key={channel.id}>{channel.name}</div>;
                    })}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
