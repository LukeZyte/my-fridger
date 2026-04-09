import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Fridge from "./pages/Fridge";
import NewItem from "./pages/NewItem";
import EditItem from "./pages/EditItem";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/fridge" />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/newitem" element={<NewItem />} />
          <Route path="/edititem" element={<EditItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
