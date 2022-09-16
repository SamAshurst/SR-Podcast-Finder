import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import usePrograms from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";
import * as api from "../utils/api";

export default function ProgramList() {
  // const [programList, setProgramList] = useState();
  const [pageNum, setPageNum] = useState(1);
  // const [isLoading, setLoading] = useState(true);
  const params = useParams();
  const location = useLocation();
  const {
    category: { id: categoryId },
    channelId,
  } = location.state;
  const { isLoading, isError, error, results, hasNextPage } = usePrograms(
    channelId,
    categoryId,
    pageNum
  );

  // useEffect(() => {
  //   api.getProgramsForChannelCategory(channelId, categoryId).then((data) => {
  //     setProgramList(data.programs);
  //     setPage(data.pagination.page);
  //     setLoading(false);
  //   });
  // }, [categoryId, channelId]);

  if (isError) return <p className="error">Error: {error.message}</p>;

  const programs = results.map((program, i) => {
    if (results.length === i + 1) {
      console.log("last element");
    }
    return <ProgramCard program={program} />;
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <Container className="p-1 m-auto ">
      <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-4 d-flex m-auto">
        {programs}
      </Row>
    </Container>
  );

  // if (!programList) {
  //   return <div>No programs for this category</div>;
  // }

  // return (
  //   <>
  //     <div>{params.channel}</div>
  //     <div>{params.category}</div>
  //     <ProgramCard programList={programList} />
  //   </>
  // );
}
