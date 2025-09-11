import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  acceptExchangeRequest,
  deleteExchangeRequest,
  fetchExchangeRequestDetails,
} from "@/store/Slices/ExchangeRequestSlice/ExchangeRequestSlice";
import { ArrowLeft, Calendar, MapPin, User, Home } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { MutatingDots } from 'react-loader-spinner'


const ExchangeRequestDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentRequest, loading, error } = useAppSelector(
    (state) => state.exchangeRequest
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchExchangeRequestDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#0d5b9bff"
  secondaryColor="#0d5b9bff"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!currentRequest) {
    return <div className="p-6">Exchange request not found.</div>;
  }

  if (!id) return;

  const handleAcceptRequest = (id: string) => {
    dispatch(acceptExchangeRequest(id));
  };

  const handleDeleteRequest = (id: string) => {
    dispatch(deleteExchangeRequest(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mb-6">
            <Link
              to="/exchange-request"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Requests
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Exchange Request Details
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentRequest.status === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : currentRequest.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : currentRequest.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {currentRequest.status}
              </span>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={16} className="mr-1" />
                Created:{" "}
                {new Date(currentRequest.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            {currentRequest.status === "PENDING" && (
              <>
                <PrimaryButton
                  title="Accept Request"
                  className="bg-green-600 hover:bg-blue-900"
                  onClick={() => handleAcceptRequest(id)}
                />
              </>
            )}
            <PrimaryButton
              title="Delete Request"
              className="bg-red-700 hover:bg-red-900"
              onClick={() => handleDeleteRequest(id)}
            />
            {/* <PrimaryButton
            title="Start Chat"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              // Handle chat logic
              console.log("Start chat with:", currentRequest.toUser?.id);
            }}
          /> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* From Property Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Home size={20} className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Your Property</h2>
            </div>
            {currentRequest.fromProperty && (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {currentRequest.fromProperty.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentRequest.fromProperty.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {currentRequest.fromProperty.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {currentRequest.fromProperty.country}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* To Property Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Home size={20} className="text-green-600 mr-2" />
              <h2 className="text-xl font-semibold">Requested Property</h2>
            </div>
            {currentRequest.toProperty && (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {currentRequest.toProperty.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentRequest.toProperty.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {currentRequest.toProperty.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {currentRequest.toProperty.country}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Users Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* From User Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <User size={20} className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">You</h2>
            </div>
            {currentRequest.fromUser && (
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  {currentRequest.fromUser.fullName}
                </p>
                <p className="text-gray-600">{currentRequest.fromUser.email}</p>
                {currentRequest.fromUser.phoneNumber && (
                  <p className="text-gray-600">
                    {currentRequest.fromUser.phoneNumber}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* To User Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <User size={20} className="text-green-600 mr-2" />
              <h2 className="text-xl font-semibold">Exchange Partner</h2>
            </div>
            {currentRequest.toUser && (
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  {currentRequest.toUser.fullName}
                </p>
                <p className="text-gray-600">{currentRequest.toUser.email}</p>
                {currentRequest.toUser.phoneNumber && (
                  <p className="text-gray-600">
                    {currentRequest.toUser.phoneNumber}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Message Section */}
        {currentRequest.message && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Message</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {currentRequest.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
      </div>
    </div>
  );
};

export default ExchangeRequestDetails;
