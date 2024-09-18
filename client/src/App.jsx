import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MyFlights from "./views/MyFlights";
import Header from "./ui/Header";

function App() {
  return (
    <div className="xl:overflow-hidden h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-flights/:id" element={<MyFlights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
