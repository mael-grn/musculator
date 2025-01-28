"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter(); // Pour naviguer
    const pathname = usePathname(); // Pour obtenir l'URL actuelle

    const isActive = (path : string) => pathname === path || pathname.startsWith(path + "/");

    return (
        <nav className={"z-50 p-3 justify-around md:justify-start fixed flex gap-3 bottom-0 md:top-0 left-0 w-full h-20 md:h-14 bg-lightTransparent backdrop-blur items-center"}>
            <p className={"hidden md:block font-extrabold mr-3"}>Musculator 💪</p>
            <Link className={"p-2 flex flex-row gap-2 w-fit justify-center items-center h-full hover:no-underline md:hover:bg-hoverLight rounded-3xl active:scale-90"} href={"/"}>
                <img className={"w-8 md:w-6"} alt={"icon"} src={isActive("/") ? "/icons/home-solid.svg" : "/icons/home-outline.svg"}/>
                <span className={`${isActive("/") ? "text-lg" : "text-[0]"} md:text-sm`}>Accueil</span>
            </Link>
            <Link className={"p-2 flex flex-row gap-2 w-fit justify-center items-center h-full hover:no-underline md:hover:bg-hoverLight rounded-3xl active:scale-90"} href={"/exercises"}>
                <img className={"w-8 md:w-6"} alt={"icon"} src={isActive("/exercises") ? "/icons/circle-search-solid.svg" : "/icons/circle-search-outline.svg"}/>
                <span className={`${isActive("/exercises") ? "text-xl" : "text-[0]"} md:text-sm`}>Explorer</span>
            </Link>
            <Link className={"p-2 flex flex-row gap-2 w-fit justify-center items-center h-full hover:no-underline md:hover:bg-hoverLight rounded-3xl active:scale-90"} href={"/myExercises"}>
                <img className={"w-8 md:w-6"} alt={"icon"}
                     src={isActive("/myExercises") ? "/icons/bookmark-solid.svg" : "/icons/bookmark-outline.svg"}/>
                <span className={`${isActive("/myExercises") ? "text-xl" : "text-[0]"} md:text-sm`}>Exercices</span>
            </Link>
            <Link className={"p-2 flex flex-row gap-2 w-fit justify-center items-center h-full hover:no-underline md:hover:bg-hoverLight rounded-3xl active:scale-90"} href={"/myTrainings"}>
                <img className={"w-8 md:w-6"} alt={"icon"}
                     src={isActive("/myTrainings") ? "/icons/clipboard-solid.svg" : "/icons/clipboard-outline.svg"}/>
                <span className={`${isActive("/myTrainings") ? "text-xl" : "text-[0]"} md:text-sm`}>Séances</span>
            </Link>
        </nav>
    );
}
