import ChatWindow from "./components/ChatWindow";
import SessionManager from "./components/SessionManager";

// This is the main page for the chat interface.
// It renders the ChatWindow component, which contains the entire chat UI.
const ChatPage = () => {
  return (
    // The main container for the chat page, styled to take up the full screen.
    <div className="h-screen w-screen flex">
      <SessionManager />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
