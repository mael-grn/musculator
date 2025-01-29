"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Exercise, getExercises, getSavedExercices} from "@/app/exercises/exercisesUtils";
import ExerciseComponent from "@/app/components/exercise";
import PageLoading from "@/app/components/loading";

export default function MyExercises() {
    const router = useRouter();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSavedExercices().then((exos) => {
            console.log(exos);
            setExercises(exos);
        }).finally(() => setLoading(false));
    }, []);

    return (
        <div className={"flex flex-col w-full h-full items-center justify-center gap-6 md:pt-10"}>
            <p className={"text-center"}>Cette fonctionnalité n'est pas encore développé. Revenez plus tard 🛠️</p>
            <button onClick={() => router.push("/")}>
                Retour à l'accueil
                <img src={"/icons/arrow-out.svg"} className={"h-6 invert"}/>
            </button>
        </div>

    );
}
