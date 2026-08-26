import Layout from "./Layout/Layout";
import { CallProvider } from "./contexts/CallContext";
import IncomingCallModal from "./components/calls/IncomingCallModal";
import CallScreen from "./components/calls/CallScreen";

function App() {
  return (
    <CallProvider>
      <Layout></Layout>
      {/* Rendered above the router so calls surface from any page */}
      <IncomingCallModal />
      <CallScreen />
    </CallProvider>
  );
}

export default App;
