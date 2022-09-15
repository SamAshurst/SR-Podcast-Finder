import { Link } from "react-router-dom";

export default function Title() {
  return (
    <header className="mt-3 mb-4 header-test">
      <Link to="/" className="header-title">
        <h1>Sveriges Radio Podcast Sökare</h1>
      </Link>
    </header>
  );
}
