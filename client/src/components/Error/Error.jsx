import notFound from "assets/images/not-found.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="main-error container">
      <img src={notFound} alt="not found" />
      <div className="info">
        <h1 className="h3">Ohh! Page not found</h1>
        <p>We cant' seem to find the page you're looking for</p>
        <Link to="/">Back home</Link>
      </div>
    </main>
  );
};
export default Error;
