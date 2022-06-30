import "./App.css";
import { useState, useEffect } from "react";
import * as api from "./utils/api";
import ChannelList from "./components/ChannelList";

function App() {
  const [channelList, setChannelList] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api.getChannels().then((channels) => {
      setChannelList(channels);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>"Loading"</div>;
  }

  return <ChannelList channels={channelList} />;
}

export default App;
