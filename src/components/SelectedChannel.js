import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import * as api from "../utils/api";

export default function SelectedChannel() {
  const [categoryList, setCategoryList] = useState();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const channelId = location.state;
  const params = useParams();

  useEffect(() => {
    api.getCategory().then((category) => {
      setCategoryList(category);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <h1>{params.channel}</h1>
      <ListGroup>
        {categoryList.map((category) => {
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
