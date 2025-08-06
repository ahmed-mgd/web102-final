import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <h1><Link to="/">FitnessForum</Link></h1>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/new">
          <i className="fas fa-plus" aria-hidden="true"></i>
          New Post
        </Link>
      </div>
    </nav>
  );
}
