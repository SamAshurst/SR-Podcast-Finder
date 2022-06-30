import "./App.css";
import { useState, useEffect } from "react";
import * as api from "./utils/api";
import ChannelList from "./components/ChannelList";

function App() {
  const [channelList, setChannelList] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("effect called");
    api.getChannels().then((channels) => {
      setChannelList(channels);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>"Loading"</div>;
  }

  return <ChannelList channels={channelList} />;
  // channelList.map((channel) => {
  //   return (
  //     <div className="Channel-list" key={channel.id}>
  //       <img src={channel.image} className="Channel-logo" alt="logo" />
  //       <h4>{channel.name}</h4>
  //       <article>{channel.tagline}</article>
  //     </div>
  //   );
  // });
}

export default App;
