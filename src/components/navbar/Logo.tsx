import { Link } from "react-router-dom";

const Logo = () => (
  <div className="flex-shrink-0 w-24 sm:w-28 md:w-32">
    <Link to="/">
      <img src="/logo.svg" alt="Logo" className="w-full h-auto" />
    </Link>
  </div>
);

export default Logo;
