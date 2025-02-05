"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Exercise, getExercises, getSavedExercices} from "@/app/exercises/exercisesUtils";
import ExerciseComponent from "@/app/components/exercise";
import PageLoading from "@/app/components/loading";
import {getTrainings, Training} from "@/app/myTrainings/trainingsUtils";
import TrainingComponent from "@/app/components/training";

export default function MyTrainings() {
    const router = useRouter();
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrainings().then((training) => {
            setTrainings(training);
        }).finally(() => setLoading(false));
    }, []);

    return (
        <div className={"flex-1 flex flex-col"}>
            {loading ? (<PageLoading/>) :
                (<div className={"flex-1 flex flex-col"}>
                    {
                        trainings.length === 0 ? (
                                <div className={"flex flex-1 flex-col w-full min-h-full items-center justify-center gap-6"}>
                                    <p className={"text-center"}>Vous n'avez créé aucune séance pour le moment 😣</p>
                                    <button onClick={() => router.push("/myTrainings/new")}>
                                        Créer une séance
                                        <img src={"/icons/plus.svg"} className={"h-6 invert"}/>
                                    </button>
                                </div>

                            ) :

                            <div className={"flex flex-col gap-10 md:mt-6"}>
                                <div className={"flex flex-col gap-3 justify-center items-center w-full"}>
                                    <h2 className={"text-center"}>Vos séances</h2>
                                    <p className={"text-center"}>Pour le moment, vous
                                        avez {trainings.length} séances.</p>
                                    <button onClick={() => router.push("/myTrainings/new")}>
                                        Créer une séance
                                        <img src={"/icons/plus.svg"} className={"h-6 invert"}/>
                                    </button>
                                </div>
                                <div className={"flex flex-wrap gap-6 justify-center md:justify-start"}>
                                    {
                                        trainings.map(train => (
                                            <TrainingComponent training={train} key={train.id}/>
                                        ))
                                    }
                                </div>
                            </div>


                    }
                </div>)
            }
        </div>

    )
        ;
}
