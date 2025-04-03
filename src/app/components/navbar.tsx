"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavBarLink {
    route: string;
    icon: string;
}
const links : NavBarLink[] = [
    {route: "/", icon: "home"},
    {route: "/search", icon: "circle-search"},
    {route: "/myTrainings", icon: "clipboard"},
]

export default function Navbar() {
    const pathname = usePathname(); // Pour obtenir l'URL actuelle

    const isActive = (path : string) => pathname === path || pathname.startsWith(path + "/");

    return (
        <nav className={"z-50 p-3 justify-around fixed flex gap-3 -bottom-1 left-0 w-full h-20 bg-background  items-center"}>

            {links.map((link, index) => (
                <Link key={index} className={`p-2 flex flex-row gap-2 w-14 h-14 justify-center items-center rounded-[100px] active:scale-90 ${isActive(link.route) ? "bg-primary" : "bg-transparent"}`} href={link.route}>
                    <img className={"w-8 invert"} alt={"icon"} src={isActive(link.route) ? `/icons/${link.icon}-solid.svg` : `/icons/${link.icon}-outline.svg`}/>
                </Link>
            ))}

        </nav>
    );
}
