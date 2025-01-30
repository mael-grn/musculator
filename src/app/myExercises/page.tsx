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
        <div className={"flex-1 flex flex-col"}>
            {loading ? (<PageLoading/>) :
                (<div className={"flex-1 flex flex-col"}>
                    {
                        exercises.length === 0 ? (
                            <div className={"flex flex-1 flex-col w-full min-h-full items-center justify-center gap-6"}>
                                <p className={"text-center"}>Vous n'avez sauvegardé aucun exercice pour le moment 😢</p>
                                <button onClick={() => router.push("/exercises")}>
                                    Explorer des exercices
                                    <img src={"/icons/arrow-out.svg"} className={"h-6 invert"}/>
                                </button>
                            </div>

                        ) :
                            <div className={"flex flex-col gap-10 md:mt-6"}>
                                <div className={"flex flex-col gap-3 justify-center items-center w-full"}>
                                    <h2 className={"text-center"}>Vos Exercices sauvegardés</h2>
                                    <p className={"text-center"}>Pour le moment, vous
                                        avez {exercises.length} exercices.</p>
                                    <button onClick={() => router.push("/exercises")}>
                                        Explorer des exercices
                                        <img src={"/icons/arrow-out.svg"} className={"h-6 invert"}/>
                                    </button>
                                </div>
                                <div className={"flex flex-wrap gap-6 justify-center md:justify-start"}>
                                    {
                                        exercises.map(exo => (
                                            <ExerciseComponent exercise={exo} key={exo.id}/>
                                        ))
                                    }
                                </div>
                            </div>


                    }
                </div>)
            }
        </div>

    );
}
