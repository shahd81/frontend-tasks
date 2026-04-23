import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">
        403 - Not Authorized
      </h1>

      <p className="mt-4 text-gray-600">
        You don’t have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go Sign In
      </Link>
    </div>
  );
}
