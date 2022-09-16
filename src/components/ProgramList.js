import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProgramCard from "./ProgramCard";
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
      <ProgramCard programList={programList} />
    </>
  );
}
