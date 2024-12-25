"use client";

import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  return (
    <div className="p-4 bg-white border-t relative">
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
          Chat with John Doe
        </div>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Example Messages */}
          <div className="mb-4 flex justify-start">
            <div className="max-w-[75%] p-3 bg-gray-300 rounded-lg">
              <p>Hi there! How are you?</p>
            </div>
          </div>
          <div className="mb-4 flex justify-end">
            <div className="max-w-[75%] p-3 bg-blue-500 text-white rounded-lg">
              <p>I’m good! What about you?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* + Button */}
        <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Attach Image Button */}
        <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0L2 9.828m19.586 2.586a2 2 0 010 2.828L12 22 2.414 12.414a2 2 0 010-2.828L5.172 7m13.586-4a2 2 0 112.828 2.828L15.172 7"
            />
          </svg>
        </button>

        {/* Emoji Picker Button */}
        <button
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 15.232a4 4 0 005.536 0m-9.034-.964a2 2 0 11-2.83 2.83 2 2 0 012.83-2.83zm-5.657-5.657a2 2 0 113.535 3.535 2 2 0 01-3.535-3.535zm14.142-3.536a4 4 0 010 5.656M9.88 12a4 4 0 105.656-5.656M7 7h.01M15.232 15.232a4 4 0 005.536 0m-9.034-.964a2 2 0 11-2.83 2.83 2 2 0 012.83-2.83zm-5.657-5.657a2 2 0 113.535 3.535 2 2 0 01-3.535-3.535zm14.142-3.536a4 4 0 010 5.656M9.88 12a4 4 0 105.656-5.656M7 7h.01"
            />
          </svg>
        </button>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-3 rounded-lg focus:outline-none"
        />

        {/* Send Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Send
        </button>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default ChatInput;

// "use client";

// const MessageUI = () => {
//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
//         Chat with John Doe
//       </div>

//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {/* Example Messages */}
//         <div className="mb-4 flex justify-start">
//           <div className="max-w-[75%] p-3 bg-gray-300 rounded-lg">
//             <p>Hi there! How are you?</p>
//           </div>
//         </div>
//         <div className="mb-4 flex justify-end">
//           <div className="max-w-[75%] p-3 bg-blue-500 text-white rounded-lg">
//             <p>I’m good! What about you?</p>
//           </div>
//         </div>
//       </div>

//       {/* Input Box */}
//       <div className="p-4 bg-white border-t">
//         <div className="flex items-center gap-2">
//           {/* Attach Image Button */}
//           <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="h-6 w-6 text-gray-600"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0L2 9.828m19.586 2.586a2 2 0 010 2.828L12 22 2.414 12.414a2 2 0 010-2.828L5.172 7m13.586-4a2 2 0 112.828 2.828L15.172 7"
//               />
//             </svg>
//           </button>

//           {/* Input Field */}
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 border p-3 rounded-lg focus:outline-none"
//           />

//           {/* Send Button */}
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageUI;

// "use client";

// import React, { useEffect, useState } from "react";

// interface Message {
//   id: string;
//   senderId: string;
//   content: string;
//   createdAt: string;
// }

// const Chat = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");

//   const userId = "currentUserId"; // Replace with actual logged-in user ID
//   const receiverId = "receiverId"; // Replace with the chat recipient's ID

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const response = await fetch(`/api/messages/${receiverId}`);
//       const data = await response.json();
//       setMessages(data);
//     };

//     fetchMessages();
//   }, [receiverId]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "") return;

//     const response = await fetch("/api/messages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         senderId: userId,
//         receiverId,
//         content: newMessage,
//       }),
//     });

//     if (response.ok) {
//       const sentMessage = {
//         id: Date.now().toString(),
//         senderId: userId,
//         content: newMessage,
//         createdAt: new Date().toISOString(),
//       };

//       setMessages((prev) => [...prev, sentMessage]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
//         Chat with {receiverId}
//       </div>

//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//         {messages.length > 0 ? (
//           messages.map((message) => (
//             <div
//               key={message.id}
//               className={`mb-4 flex ${
//                 message.senderId === userId ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[75%] p-3 rounded-lg ${
//                   message.senderId === userId
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-300 text-black"
//                 }`}
//               >
//                 <p>{message.content}</p>
//                 <span className="text-xs mt-1 block text-gray-500">
//                   {new Date(message.createdAt).toLocaleTimeString()}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No messages yet.</p>
//         )}
//       </div>

//       {/* Input Box */}
//       <div className="p-4 bg-white border-t">
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 p-3 border rounded-lg focus:outline-none"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React from "react";

// const MessagesPage = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Messages</h1>
//       <div className="border rounded p-4 shadow-sm">
//         <h2 className="font-semibold">Message with John Doe</h2>
//         <p>Last message: "Hello, how are you?"</p>
//         <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Reply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;
