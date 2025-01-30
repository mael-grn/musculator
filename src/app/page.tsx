"use client";

import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

  return (
    <div className={"flex-1 items-center justify-center flex flex-col gap-6"}>
        <h1>Musculator 💪</h1>
        <p className={"w-2/3 mt-6 text-center"}>Explorer une toute nouvelle manière de réaliser vos séances, generez automatiquement des exercices adaptés à vos besoins et organisez vous afin de ne jamais tomber à cours de motivation.</p>
        <p className={"w-2/3 text-center"}>Obtenez de gros muscles ! 🗿</p>
        <button onClick={() => router.push("/exercises")}>
            Commencer à explorer
            <img src={"/icons/arrow-out.svg"} className={"h-6 invert"}/>
        </button>
    </div>
  );
}
