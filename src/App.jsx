import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import TitleLayout from "./layouts/TitleLayout";
import TitleScreen from "./pages/TitleScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainMenuPage from "./pages/MainMenuPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route element={<TitleLayout />}>
        <Route index element={<TitleScreen />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/menu" element={<MainMenuPage />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
