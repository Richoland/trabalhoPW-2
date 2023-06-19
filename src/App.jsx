import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/cjs/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./componentes/telas/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componentes/telas/login/Login";
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";
import Serie from "./componentes/telas/serie/Serie";
import Review from "./componentes/telas/review/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPublico />}>
          <Route index element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route path="/privado" element={<MenuPrivado />}>
          <Route index element={<Home />} />
          <Route exact="true" path="series" element={<Serie />} />
          <Route exact="true" path="reviews" element={<Review />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
