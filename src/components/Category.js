import { useParams } from "react-router-dom";

export default function Category() {
  const params = useParams();

  return (
    <>
      <div>{params.channel}</div>
      <div>{params.id}</div>
    </>
  );
}
