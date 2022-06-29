import "./App.css";
import { useState, useEffect } from "react";
import * as api from "./utils/api";

function App() {
  const [channelList, setChannelList] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getChannels().then((channels) => {
      setChannelList(channels);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>"Loading"</div>;
  }

  return channelList.map((channel) => {
    return (
      <div className="Channel-list" key={channel.id}>
        <img src={channel.image} className="Channel-logo" alt="logo" />
      </div>
    );
  });
}

export default App;
