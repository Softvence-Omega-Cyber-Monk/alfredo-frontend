import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";
import { useState } from "react";
import Switch from "react-switch";

const Notification = () => {
  const [messageDelay, setMessageDelay] = useState("15 minutes");

  // Individual switch states
  const [switches, setSwitches] = useState({
    someoneTextsMe: true,
    forgotToRespondMsg: true,
    friendRequest: true,
    friendAccepted: true,
    referralJoined: true,
    houseFavourited: true,
    updateCalendar: true,
    forgotExchange: true,
    exchangeResponded: true,
  });

  const handleSwitchChange =
    (key: keyof typeof switches) => (value: boolean) => {
      setSwitches((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  return (
    <MiniWrapper>
      <div className="space-y-8">
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            Notification Settings
          </Button>
        </div>

        <div className="space-y-3">
          {/* Messaging */}
          <div className="mx-auto bg-[#FBFBFB] p-4 rounded-xl shadow space-y-6 text-sm">
            <h2 className="text-lg text-blue-600 font-DM-sans mb-2">
              Messaging
            </h2>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                Someone texts me
              </span>
              <Switch
                onChange={handleSwitchChange("someoneTextsMe")}
                checked={switches.someoneTextsMe}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                I forgot to respond to messages
              </span>
              <select
                value={messageDelay}
                onChange={(e) => setMessageDelay(e.target.value)}
                className="flex items-start gap-2 px-3 py-[6px] w-40 h-9 rounded border border-[#BFD4F0] bg-white text-base"
              >
                <option value="5 minutes">For 5 minutes</option>
                <option value="15 minutes">For 15 minutes</option>
                <option value="30 minutes">For 30 minutes</option>
              </select>
            </div>
          </div>

          {/* Friend/Referral */}
          <div className="mx-auto bg-[#FBFBFB] p-4 rounded-xl shadow space-y-6 text-sm">
            <h2 className="text-lg text-blue-600 font-DM-sans mb-2">
              Friend/Referral
            </h2>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                I have a friend request
              </span>
              <Switch
                onChange={handleSwitchChange("friendRequest")}
                checked={switches.friendRequest}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                Someone accepts my friend requests
              </span>
              <Switch
                onChange={handleSwitchChange("friendAccepted")}
                checked={switches.friendAccepted}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                Someone that I invited as a referral joined the platform
              </span>
              <Switch
                onChange={handleSwitchChange("referralJoined")}
                checked={switches.referralJoined}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
          </div>

          {/* Property Updates */}
          <div className="mx-auto bg-[#FBFBFB] p-4 rounded-xl shadow space-y-6 text-sm">
            <h2 className="text-lg text-blue-600 font-DM-sans mb-2">
              Property Updates
            </h2>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                Someone adds my house to favourites
              </span>
              <Switch
                onChange={handleSwitchChange("houseFavourited")}
                checked={switches.houseFavourited}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                I need to update the calendars for my properties
              </span>
              <Switch
                onChange={handleSwitchChange("updateCalendar")}
                checked={switches.updateCalendar}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
          </div>

          {/* Reminders */}
          <div className="mx-auto bg-[#FBFBFB] p-4 rounded-xl shadow space-y-6 text-sm">
            <h2 className="text-lg text-blue-600 font-DM-sans mb-2">
              Reminders
            </h2>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                I forgot to respond to an exchange request (after 12h)
              </span>
              <Switch
                onChange={handleSwitchChange("forgotExchange")}
                checked={switches.forgotExchange}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-[#505050] text-lg font-DM-sans">
                An exchange has been responded to (rejected/approved)
              </span>
              <Switch
                onChange={handleSwitchChange("exchangeResponded")}
                checked={switches.exchangeResponded}
                onColor="#4881FF"
                offColor="#505050"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
              />
            </div>
          </div>
        </div>

        <div>
          <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
            Update
          </Button>
        </div>
      </div>
    </MiniWrapper>
  );
};

export default Notification;
