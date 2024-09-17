import React, { useContext } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import FileUpload from "../Pages/fileUpload"; // Import the fileUpload component

function ChatContainer() {
  const {
    setShowSlide,
    showSlide,
    setMobile,
    Mobile,
    chatValue,
    setChatValue,
    handleSend,
    handleKeyPress,
    currentConversationId,
    personalizedChatisSelected, // Fetch personalizedChatisSelected from context
  } = useContext(ContextApp);

  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div
      className={
        showSlide
          ? "h-screen w-screen  flex items-start justify-between flex-col p-2"
          : "h-screen w-full lg:w-[calc(100%-300px)]  flex items-start justify-between flex-col p-2"
      }
    >
      {showSlide && (
        <span
          className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-800 duration-200 bg-gray-600"
          title="Open sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftOpen fontSize={23} />
        </span>
      )}

      <span
        className="rounded-xl bg-gray-600 px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600 hover:bg-gray-800 duration-200"
        title="Open sidebar"
        onClick={() => setMobile(!Mobile)}
      >
        <LuPanelLeftOpen fontSize={24} />
      </span>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="bg-gray-600 text-white p-2 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300"
          title="Home"
          onClick={() => navigate("/")}
        >
          <FaHome fontSize={30} />
        </button>

        <button
          className="bg-gray-600 text-white p-2 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300"
          title="Logout"
          onClick={handleLogout}
        >
          <BiLogOut fontSize={30} />
        </button>
      </div>

      {personalizedChatisSelected ? (
        // Render fileUpload component if personalizedChatisSelected is true

        <div className="w-full">
          <FileUpload />
        </div>
      ) : currentConversationId ? (
        // Render Chat and Input if a conversation is selected
        <>
          <Chat />

          <div className="w-full m-auto flex items-center justify-center flex-col gap-2 my-2">
            <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-2/5 xl:w-1/2">
              <input
                type="text"
                placeholder="Send a message"
                className="h-full text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base"
                value={chatValue}
                onChange={(e) => setChatValue(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <RiSendPlane2Fill
                title="send message"
                className={
                  chatValue.length <= 0
                    ? "text-gray-400 cursor-auto mx-3 text-xl"
                    : "text-white cursor-pointer mx-3 text-3xl p-1 rounded shadow-md"
                }
                onClick={handleSend}
              />
            </span>
            <p className="lg:text-xs text-gray-400 text-center text-[10px]">
              *Ayurvedic Suggestions are based on AI and ML. Please consult a
              doctor if you have any health issues. We are not responsible for
              any wrong suggestions given by the AI*
            </p>
          </div>
        </>
      ) : (
        // Render branding if no conversation is selected and personalizedChatisSelected is false
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-4xl text-gray-600 font-bold">AyurGuru</h1>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
