import emptyPlaces from "@/assets/no-property.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <img src={emptyPlaces} alt="No places available" />

      <h1 className="font-extrabold text-2xl mt-4">Result Not Found</h1>
      <p className="text-gray-600 max-w-xs mt-2">
        Whoops... this information is not available at the moment.
      </p>

      <button
        onClick={() => window.history.back()}
        type="button"
        className="mt-6 px-8 py-3 bg-primary-blue text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
