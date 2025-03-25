import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
  return (
    <div className="container">
      <h1 className="my-4 display-5">Java基礎</h1>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}
