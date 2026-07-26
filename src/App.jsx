import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import TitleLayout from "./layouts/TitleLayout";

import TitleScreen from "./pages/TitleScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {

    return (

        <Routes>

            <Route element={<TitleLayout />}>

                <Route
                    index
                    element={<TitleScreen />}
                />

            </Route>

            <Route element={<MainLayout />}>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

            </Route>

        </Routes>

    );

}

export default App;