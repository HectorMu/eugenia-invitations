import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
      <h4 className="font-bold text-8xl animate-bounce">404</h4>
      <p className="font-medium text-2xl">Oops, that didn't work</p>
      <Link to={-1} className="underline">
        Back
      </Link>
    </div>
  );
};

export default NotFound;
