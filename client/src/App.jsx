import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MyFlights from "./views/MyFlights";

function App() {
  return (
    <div className="bg-[#F6F4F8]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-flights/:id" element={<MyFlights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
