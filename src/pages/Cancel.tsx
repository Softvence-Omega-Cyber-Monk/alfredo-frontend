const Cancel = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="text-4xl">✅</div>
      <h1 className="text-2xl font-semibold">Sorry!!</h1>

      <p className="text-gray-600">
        Your payment was cancelled. You can now return to our website.
      </p>

      <a
        href="https://vacanzagreece.gr"
        className="px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/80 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default Cancel;
