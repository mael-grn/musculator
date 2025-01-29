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
        <div className={"w-full min-h-full mb-20  md:mb-0 md:pt-10 "}>
            {loading ? (<PageLoading/>) :
                (<div className={" w-full min-h-full"}>
                    {
                        exercises.length === 0 ? (
                            <div className={"flex flex-col w-full min-h-full items-center justify-center gap-6"}>
                                <p className={"text-center"}>Vous n'avez sauvegardé aucun exercice pour le moment 😢</p>
                                <button onClick={() => router.push("/exercises")}>
                                    Explorer des exercices
                                    <img src={"/icons/arrow-out.svg"} className={"h-6 invert"}/>
                                </button>
                            </div>

                        ) :
                            <div className={"flex flex-wrap gap-6 justify-center md:justify-start"}>
                                {
                                    exercises.map(exo => (
                                        <ExerciseComponent exercise={exo} key={exo.id}/>
                                    ))
                                }
                            </div>

                    }
                </div>)
            }
        </div>

    );
}
