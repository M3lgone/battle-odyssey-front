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
import EnemiesPage from "./pages/admin/EnemiesPage";
import EnemyFormPage from "./pages/admin/EnemyFormPage";
import AdminSkillsPage from "./pages/admin/SkillsPage";
import SkillFormPage from "./pages/admin/SkillFormPage";
import SelectCharacterPage from "./pages/SelectCharacterPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";
import SkillsPage from "./pages/SkillsPage";
import BattlePage from "./pages/BattlePage";

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

        <Route path="/characters" element={<SelectCharacterPage />} />

        <Route path="/characters/:id" element={<CharacterDetailsPage />} />

        <Route path="/skills" element={<SkillsPage />} />

        <Route path="/battle/:gameId" element={<BattlePage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Admin - Users */}
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id/edit" element={<UserEditPage />} />

        <Route path="characters" element={<CharactersPage />} />
        <Route path="characters/new" element={<CharacterFormPage />} />
        <Route path="characters/:id/edit" element={<CharacterFormPage />} />

        {/* Admin - Enemies */}
        <Route path="enemies" element={<EnemiesPage />} />
        <Route path="enemies/new" element={<EnemyFormPage />} />
        <Route path="enemies/:id/edit" element={<EnemyFormPage />} />

        {/* Admin - Skills */}
        <Route path="skills" element={<AdminSkillsPage />} />
        <Route path="skills/new" element={<SkillFormPage />} />
        <Route path="skills/:id/edit" element={<SkillFormPage />} />
      </Route>
    </Routes>
  );
}



export default App;
