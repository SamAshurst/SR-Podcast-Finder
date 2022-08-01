import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../utils/api";

export default function P1() {
  const [categoryList, setCategoryList] = useState();
  const [isLoading, setLoading] = useState(true);

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

      {p1Catergories.map((category) => {
        return (
          <ul className="category" key={category.id}>
            <Link to={category.name.replace(/[/]/g, "-")}>
              {category.name.replace(/[/]/g, "-")}
            </Link>
          </ul>
        );
      })}
    </div>
  );
}
