"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {
    deleteExercice,
    Exercise,
    getExercises,
    isExerciseSaved,
    removeExercise,
    saveExercise
} from "@/app/exercises/exercisesUtils";

export default function ExercisePage() {

    const { exId } = useParams<{ exId: string }>();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [saved, setSaved] = useState(false);
    const router = useRouter();
    const [askConf, setAskConf] = useState<boolean>(false)

    function actionDeleteExo() {
        if (exercise && exercise.id >= 1000) {
            if (askConf) {
                deleteExercice(exercise.id);
                router.push("/myExercises");
            } else {
                setAskConf(true);
            }
        }
    }

    useEffect(() => {
        getExercises().then((exercises) => {
            const exo = exercises.find((exercise) => exercise.id === parseInt(exId));
            if (exo) {
                setExercise(exo);
                setSaved(isExerciseSaved(parseInt(exId)));
            }
        });
    }, [exId]);

    const toggleSave = () => {
        if (saved) {
            removeExercise(parseInt(exId));
        } else {
            saveExercise(parseInt(exId));
        }
        setSaved(!saved);
    }

    return (
        <div className={"flex flex-col gap-10 md:mt-10 md:mb-10 mb-20 md:mb-0"}>
            <div className={"flex md:flex-row flex-col md:items-center gap-4"}>
                <div className={"flex gap-2"}>

                    <img onClick={() => router.back()}
                         className={"w-12 h-12 p-2 rounded-3xl cursor-pointer bg-[var(--light)] md:hover:bg-[var(--hover-light)] active:scale-90"}
                         src={"/icons/arrow-left.svg"} alt={"back"}/>
                    <div onClick={toggleSave}
                         className={"flex gap-2 p-3 rounded-3xl bg-light w-fit cursor-pointer md:hover:bg-hoverLight active:scale-90"}>
                        <img className={"h-6"} src={saved ? "/icons/bookmark-solid.svg" : "/icons/bookmark-outline.svg"}
                             alt={"icon"}/>
                        <span>{saved ? "Supprimer" : "Enregister"}</span>
                    </div>
                </div>

                <h1>{exercise?.name}</h1>
            </div>
            <div className={"flex flex-col-reverse md:flex-row"}>
                <div className={"flex flex-col gap-10"}>
                    <p>{exercise?.description}</p>

                    <ul>
                        <h3>Comment faire ?</h3>
                        {
                            exercise?.method.map((step, index) => {
                                return (
                                    <li key={index}>{index + 1 + ". " + step}</li>
                                )
                            })
                        }
                    </ul>

                    <ul>
                        <h3>Conseils</h3>
                        {
                            exercise?.advices.map((advice, index) => {
                                return (
                                    <li key={index}>{advice}</li>
                                )
                            })
                        }
                    </ul>
                    {
                        exercise && exercise?.id >= 1000 &&
                        <div className={"w-full flex justify-center items-center mt-16"}>
                            <button className={"flex gap-1"} onClick={actionDeleteExo}>
                                {
                                    askConf ? "Réappuyez pour valider" : "Supprimer la séance"
                                }
                                <img src={"/icons/close.svg"} alt={"close"} className={"w-6 h-6 invert"}/>
                            </button>
                        </div>
                    }
                </div>
                {
                    exercise?.img !== "" &&
                    <img className={"object-contain h-fit md:sticky md:top-0"} src={exercise?.img}
                         alt={exercise?.name}/>
                }


            </div>

        </div>
    );
    }
