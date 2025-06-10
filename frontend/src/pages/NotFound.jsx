import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-main">
      <div className="not-found-container-main">
        <div className="not-found-content-main">
          <h1 className="not-found-title-main">404</h1>
          <h2 className="not-found-subtitle-main">Page Not Found</h2>
          <p className="not-found-text-main">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions-main">
            <Link to="/" className="not-found-button-primary-main">
              <FiHome className="not-found-button-icon-main" />
              Go to Homepage
            </Link>
            <Link to="/browse" className="not-found-button-secondary-main">
              <FiSearch className="not-found-button-icon-main" />
              Browse Products
            </Link>
          </div>
        </div>
        <div className="not-found-image-main">
          <img 
            src="https://illustrations.popsy.co/amber/falling.svg" 
            alt="404 illustration" 
            className="not-found-illustration-main"
          />
        </div>
      </div>
    </div>
  );
}