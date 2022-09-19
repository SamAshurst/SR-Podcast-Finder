import { useState, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import usePrograms from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";

export default function ProgramList() {
  const [pageNum, setPageNum] = useState(1);
  const params = useParams();
  const location = useLocation();
  const {
    category: { id: categoryId },
    channelId,
  } = location.state;
  const { isLoading, isError, error, results, hasNextPage, isEmpty } =
    usePrograms(channelId, categoryId, pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (program) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((programs) => {
        if (programs[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (program) intObserver.current.observe(program);
    },
    [isLoading, hasNextPage]
  );
  if (isError) return <p className="error">Error: {error.message}</p>;

  const programs = results.map((program, i) => {
    if (results.length === i + 1) {
      return <ProgramCard ref={lastPostRef} key={i} program={program} />;
    }
    return <ProgramCard key={i} program={program} />;
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isEmpty) {
    return <div>No programs for this category</div>;
  }

  return (
    <>
      <Container className="p-1 m-auto ">
        <Row xs={2} sm={2} md={3} lg={4} xl={5} className="g-4 d-flex m-auto">
          {programs}
          {isLoading && programs.length > 9 ? <div>Loading..</div> : <></>}
        </Row>
      </Container>
    </>
  );
}
