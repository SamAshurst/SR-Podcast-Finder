import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import * as api from "../utils/api";

export default function P1() {
  const [categoryList, setCategoryList] = useState();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const channelId = location.state;

  useEffect(() => {
    api.getCategory().then((category) => {
      setCategoryList(category);
      setLoading(false);
    });
  }, []);
  let p1Catergories;
  if (isLoading) {
    return <div>Loading..</div>;
  }
  p1Catergories = [...categoryList].splice(2);
  return (
    <div>
      <h1>P1</h1>
      <ListGroup>
        {p1Catergories.map((category) => {
          return (
            <ListGroupItem tag="button" className="category" key={category.id}>
              <Link
                to={category.name.replace(/[/]/g, "-")}
                state={{ category, channelId }}
              >
                {category.name.replace(/[/]/g, "-")}
              </Link>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
