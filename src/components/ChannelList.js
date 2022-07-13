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
      <Container className="p-4">
        <Row xs={1} sm={2} md={3} lg={3} className="m-1">
          {mainChannels.map((channel) => {
            return (
              <Col className="p-1 d-flex">
                <Card>
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
                    <Button variant="primary">Go to channel page</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <div class="dropdown">
        <button class="dropbtn">P4 Local Channels</button>
        <div class="dropdown-content">
          {p4LocalChannels.map((channel) => {
            // create href link
            return <div>{channel.name}</div>;
          })}
        </div>
      </div>
      {/* add the extra stations list */}
    </>
  );
}
