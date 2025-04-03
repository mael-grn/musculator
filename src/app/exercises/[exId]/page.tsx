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
    const [develop, setDevelop] = useState<boolean>(false)

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
        <div className={"flex flex-col"}>
            <div className={"flex flex-col items-center sticky top-0 left-0 w-full"}>
                <div className={"flex gap-4 items-center w-full bg-background pt-3"}>
                    <img onClick={() => router.back()}
                         className={"w-12 h-12 p-2 rounded-3xl cursor-pointer bg-primary active:scale-90 active:bg-primaryHover"}
                         src={"/icons/arrow-left.svg"} alt={"back"}/>
                    <h2>{exercise?.name}</h2>
                </div>
                <span className={"bg-gradient-to-b from-background to-transparent w-full h-14"}/>
            </div>
            <div className={"flex flex-col gap-4"}>
                {
                    exercise?.img !== "" &&
                    <img className={"object-contain h-fit rounded-xl"} src={exercise?.img}
                         alt={exercise?.name}/>
                }
                <div className={"flex flex-col gap-10"}>

                    <ul className={"flex flex-col gap-3"}>
                        <h3>Comment faire ?</h3>
                        {
                            exercise?.method.map((step, index) => {
                                return (
                                    <li className={"bg-backgroundHover text-xl p-4 rounded-2xl"} key={index}>{index + 1 + ". " + step}</li>
                                )
                            })
                        }
                        {
                            exercise?.method.length === 0 &&
                            <li className={"text-lg italic w-full text-center"}>Aucune méthode disponible</li>
                        }
                    </ul>

                    <ul className={"flex flex-col gap-3"}>
                        <h3>Conseils</h3>
                        {
                            exercise?.advices.map((advice, index) => {
                                return (
                                    <li className={"text-xl mb-6"}  key={index}>{advice}</li>
                                )
                            })
                        }
                        {
                            exercise?.advices.length === 0 &&
                            <li className={"text-lg italic w-full text-center"}>Aucun conseil disponible</li>
                        }
                    </ul>
                    {
                        exercise && exercise?.id >= 1000 &&
                        <div className={"w-full flex justify-center items-center mt-16"}>
                            <button className={"flex gap-1"} onClick={actionDeleteExo}>
                                {
                                    askConf ? "Réappuyez pour valider" : "Supprimer l'exercice"
                                }
                                <img src={"/icons/close.svg"} alt={"close"} className={"w-6 h-6 invert"}/>
                            </button>
                        </div>
                    }
                </div>



            </div>

        </div>
    );
    }
