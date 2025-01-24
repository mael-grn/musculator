"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Exercise, getExercises} from "@/app/exercises/exercisesUtils";

export default function ExercisePage() {

    const { exId } = useParams<{ exId: string }>();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const router = useRouter();

    useEffect(() => {
        getExercises().then((exercises) => {
            const exo = exercises.find((exercise) => exercise.id === parseInt(exId));
            if (exo) {
                setExercise(exo);
            }
        });
    }, [exId]);

    return (
        <div className={"flex flex-col gap-10"}>
            <div className={"flex md:flex-row flex-col md:items-center gap-4"}>
                <img onClick={() => router.back()} className={"w-12 h-12 p-2 rounded-3xl cursor-pointer bg-[var(--light)] hover:bg-[var(--hover-light)]"} src={"/icons/arrow-left.svg"} alt={"back"}/>
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
                </div>
                <img className={"object-contain h-fit md:sticky md:top-0"} src={exercise?.img} alt={exercise?.name}/>
            </div>

        </div>
    );
}
