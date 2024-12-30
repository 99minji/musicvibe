import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./components/Callback";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </div>
  );
};

export default App;
