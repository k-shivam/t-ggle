import "./App.css";
import ItemList from "./components/ItemList";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

function App() {
  const theme = {
    token: {
      colorBgSolid: "#000000", // Set background color to black
      colorPrimary: "#1890ff", // You can keep the primary color as blue
      colorText: "#ffffff", // Change text color to white for contrast
    },
  };

  return (
    <div>
      <ConfigProvider theme={{ theme }}>
        <ItemList />
      </ConfigProvider>
    </div>
  );
}

export default App;
