import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import TitleLayout from "./layouts/TitleLayout";
import TitleScreen from "./pages/TitleScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainMenuPage from "./pages/MainMenuPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/admin/UsersPage";
import UserEditPage from "./pages/admin/UserEditPage";
import SelectCharacterPage from "./pages/SelectCharacterPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";

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

        {/* Admin */}
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/users/:id" element={<UserEditPage />} />

        <Route path="/characters" element={<SelectCharacterPage />} />

        <Route path="/characters/:id" element={<CharacterDetailsPage />} />
      </Route>
    </Routes>
  );
}



export default App;
