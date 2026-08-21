import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  // Vacanza Protect sends the buyer back here with ?protect=1 — that purchase is
  // a cover, not a membership, so the subscription flag must stay untouched.
  const isProtect = searchParams.get("protect") === "1";

  useEffect(() => {
    if (isProtect) return;

    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.isSubscribed = true;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {}
    }
  }, [isProtect]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="text-4xl">{isProtect ? "🛡️" : "✅"}</div>
      <h1 className="text-2xl font-semibold">
        {isProtect ? "You are covered" : "Thank you for your purchase"}
      </h1>

      <p className="text-gray-600">
        {isProtect
          ? "Your Vacanza Protect cover is active. A confirmation email with your cover details is on its way."
          : "Your payment was successful. You can now return to our website."}
      </p>

      <Link
        to={isProtect ? "/vacanzaprotect" : "/"}
        className="px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/80 transition"
      >
        {isProtect ? "Back to Vacanza Protect" : "Go to Homepage"}
      </Link>
    </div>
  );
};

export default Success;
