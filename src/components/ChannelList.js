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
      <div>
        {mainChannels.map((channel) => {
          return (
            <>
              <div className="Channel-list" key={channel.id}></div>
              <img src={channel.image} className="Channel-logo" alt="logo" />
            </>
          );
        })}
      </div>
      <div class="dropdown">
        <button class="dropbtn">P4 Local Channels</button>
        <div class="dropdown-content">
          {p4LocalChannels.map((channel) => {
            // create href link
            return <a href="#">{channel.name}</a>;
          })}
        </div>
      </div>
      {/* add the extra stations list */}
    </>
  );
}
