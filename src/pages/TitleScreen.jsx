import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo-battle-odissey.png";

export default function TitleScreen() {

    const navigate = useNavigate();

    useEffect(() => {

        const handleKeyDown = () => {
            navigate("/login");
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [navigate]);

    return (

        <div
            onClick={() => navigate("/login")}
            className="flex min-h-screen cursor-pointer select-none flex-col items-center justify-center"
        >

            <div className="flex flex-col items-center gap-12">

                <div className="w-full max-w-2xl px-6">

                    <img
                        src={logo}
                        alt="Battle Odyssey"
                        draggable="false"
                        className="h-auto w-full drop-shadow-[0_0_15px_rgba(255,165,0,.3)]"
                    />

                </div>

                <p
                    className="animate-pulse text-xl font-bold uppercase tracking-[0.3rem] text-yellow-200"
                    style={{ textShadow: "2px 2px 0 black" }}
                >
                    Press Any Button
                </p>

            </div>

        </div>

    );

}