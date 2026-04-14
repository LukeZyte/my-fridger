import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EditItem from "./pages/EditItem";
import Fridge from "./pages/Fridge";
import NewItem from "./pages/NewItem";
import { ProductsProvider } from "./store/ProductsContext";

const App = () => {
  return (
    <ProductsProvider>
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
    </ProductsProvider>
  );
};

export default App;
