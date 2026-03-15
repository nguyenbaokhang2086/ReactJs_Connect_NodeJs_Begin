import React from "react";
import Header from "./components/Header/index.jsx";
import UserTable from "./components/UserTable/index.jsx";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="main-content">
          <UserTable />
        </div>
        <footer className="text-center text-gray-500 text-sm mt-12 py-8 border-t border-gray-200">
          <p>© 2024 Quản lý người dùng - ReactJS + NodeJS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
