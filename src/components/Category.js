import { useParams, useLocation } from "react-router-dom";

export default function Category() {
  const params = useParams();
  const location = useLocation();

  console.log(location.state);
  return (
    <>
      <div>{params.channel}</div>
      <div>{params.id}</div>
    </>
  );
}
