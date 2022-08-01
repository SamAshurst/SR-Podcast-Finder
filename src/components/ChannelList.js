import { Card, Button, Row, Container, Col } from "react-bootstrap";

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

  console.log(p4LocalChannels);
  console.log(mainChannels);
  console.log(extraChannels);
  return (
    <>
      <Container className="p-3 m-auto">
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 d-flex">
          {mainChannels.map((channel) => {
            return (
              <Col className="d-flex">
                <Card border="dark">
                  <Card.Img
                    variant="top"
                    className="Channel-logo"
                    src={channel.image}
                  />
                  <Card.Body>
                    <Card.Title>{channel.name}</Card.Title>
                    <Card.Text>{channel.tagline}</Card.Text>
                    {
                      //add a link to channel page
                    }
                    <Button variant="primary">Gå till kanalsidan</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
          <Col className="d-flex">
            <Card border="dark">
              <Card.Img
                variant="top"
                className="Channel-logo"
                src={p4LocalChannels[0].image}
              ></Card.Img>
              <Card.Body>
                <Card.Title>P4 Lokal</Card.Title>
                <Card.Text>
                  Lokal radiokanalarna med nyheter, sport och kultur i en härlig
                  blandning.
                </Card.Text>
                <div class="dropdown">
                  <Button class="dropbtn">Välj en kanal</Button>
                  <div class="dropdown-content">
                    {p4LocalChannels.map((channel) => {
                      // create href link
                      return <div>{channel.name}</div>;
                    })}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* add the extra stations list */}
    </>
  );
}
