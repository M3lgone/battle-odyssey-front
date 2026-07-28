import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import TitleLayout from "./layouts/TitleLayout";
import AdminLayout from "./layouts/AdminLayout";
import TitleScreen from "./pages/TitleScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainMenuPage from "./pages/MainMenuPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/admin/UsersPage";
import UserEditPage from "./pages/admin/UserEditPage";
import CharactersPage from "./pages/admin/CharactersPage";
import CharacterFormPage from "./pages/admin/CharacterFormPage";
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

      {/* Admin - Characters */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="characters" element={<CharactersPage />} />
        <Route path="characters/new" element={<CharacterFormPage />} />
        <Route path="characters/:id/edit" element={<CharacterFormPage />} />
      </Route>
    </Routes>
  );
}



export default App;
