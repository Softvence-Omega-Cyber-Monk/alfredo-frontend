import { useState } from 'react';   
import mapImage from '@/assets/home/mapOverlay.png'; // Placeholder image, replace with actual map image if needed
import PrimaryButton from '../reusable/PrimaryButton';

interface MapProps {
  isLoggedIn?: boolean;
  location?: {
    lat: number;
    lng: number;
  };
}

const Map: React.FC<MapProps> = ({ 
  isLoggedIn = true,
  location = { lat: 23.8103, lng: 90.4125 } // Default to Dhaka coordinates
}) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  return (
    <div className="relative w-full h-[526px] rounded-2xl overflow-hidden">
      {/* Map Container */}
      <div className={`w-full h-full ${!isLoggedIn ? 'blur-[8px]' : ''}`}>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.lat},${location.lng}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Overlay for non-logged-in users */}
      {!isLoggedIn && (
        <div 
          className="absolute inset-0 bg-[#BFD4F026]/15 flex flex-col items-center justify-center text-white cursor-pointer"
          onClick={() => setShowLoginPrompt(true)}
        >
          <div className="max-w-sm"> 
            <img src={mapImage} alt="" />
          </div>
          <h3 className="text-xl font-medium text-primary-blue mb-2">Unlock This Home’s Location</h3>
          <p className="text-center text-lg max-w-xl text-dark-2">
            Create your account to view the map, connect with fellow members, and join our trusted community of like-minded travellers!
          </p>
          <PrimaryButton
            title="Join"
            textColor="text-white mt-4"
            bgColor="bg-primary-blue"
            
          />
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && !isLoggedIn && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div 
            className="bg-white p-6 rounded-2xl max-w-md mx-4 w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-dark-3 mb-4">
              Sign in to view location
            </h2>
            <p className="text-gray-600 mb-6">
              Create an account or sign in to see the exact location of this property.
            </p>
            <div className="flex gap-4">
              <button 
                className="flex-1 py-3 px-6 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {/* Add login handler */}}
              >
                Sign In
              </button>
              <button 
                className="flex-1 py-3 px-6 border border-primary-blue text-primary-blue rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => {/* Add register handler */}}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;