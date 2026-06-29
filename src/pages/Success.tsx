import { useEffect } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.isSubscribed = true;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {}
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="text-4xl">✅</div>
      <h1 className="text-2xl font-semibold">Thank you for your purchase</h1>

      <p className="text-gray-600">
        Your payment was successful. You can now return to our website.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/80 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Success;
