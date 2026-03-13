import React from "react";
import Header from "./components/Header/index.jsx"; // Import Header component
import UserTable from "./components/UserTable/index.jsx"; // Import UserTable component

function App() {
  return (
    <div className="App">
      <Header /> {/* Thêm Header ở đây */}
      {/* Các component khác bên cạnh hoặc bên dưới */}
      <div className="main-content">
        {/* Nội dung chính của bạn, ví dụ: danh sách người dùng */}
        <UserTable />
      </div>
    </div>
  );
}

export default App;
