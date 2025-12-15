import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { initGA } from "./utils/analytics";
import { AuthProvider } from "./context/AuthContext";
import ChatBotButton from "./components/ChatBotButton"; 


// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Initialize Google Analytics
initGA();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <App />

        {/* Floating Chatbot Button */}
        <ChatBotButton />

      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
