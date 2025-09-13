import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center justify-center">
        <SyncLoader color="#3072c9" />
      </div>
    </div>
  );
};

export default Loader;
