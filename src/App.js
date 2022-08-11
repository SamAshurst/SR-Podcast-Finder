import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "./utils/api";
import ChannelList from "./components/ChannelList";
import Title from "./components/Title";
import CategoryList from "./components/CategoryList";
import ProgramList from "./components/ProgramList";
import EpisodeList from "./components/EpisodeList";

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

  return (
    <BrowserRouter>
      <div className="App">
        <Title />
        <Routes>
          <Route path="/" element={<ChannelList channels={channelList} />} />
          <Route path="/:channel" element={<CategoryList />} />
          <Route path="/:channel/:category" element={<ProgramList />} />
          <Route
            path="/:channel/:category/:programId"
            element={<EpisodeList />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
