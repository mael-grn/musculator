"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {deleteTraining, getTrainings, Training} from "@/app/myTrainings/trainingsUtils";
import {Exercise, getExercises} from "@/app/exercises/exercisesUtils";
import ExerciseComponent from "@/app/components/exercise";

export default function TrainingPage() {

    const { trainingId } = useParams<{ trainingId: string }>();
    const [training, setTraining] = useState<Training | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [askConf, setAskConf] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        getTrainings().then((training) => {
            const train = training.find((trainingElem) => trainingElem.id === parseInt(trainingId));
            if (train) {
                setTraining(train);
                getExercises().then((exercises) => {
                    let newExercises = exercises.filter(exo => train.exercises.includes(exo.id))
                    setExercises(newExercises);
                })
            }
        });

    }, [trainingId]);

    const actionDeleteTraining = () => {
        if (askConf) {
             deleteTraining(parseInt(trainingId)).then(() => {
                 router.back();
             })
        } else {
            setAskConf(true);
        }
    }


    return (
        <div className={"flex flex-col gap-0 md:mt-10 md:mb-10 mb-20 md:mb-0"}>
            <div className={"flex md:flex-row flex-col md:items-center gap-4"}>
                <div className={"flex gap-2"}>
                    <img onClick={() => router.back()}
                         className={"w-12 h-12 p-2 rounded-3xl cursor-pointer bg-[var(--light)] md:hover:bg-[var(--hover-light)] active:scale-90"}
                         src={"/icons/arrow-left.svg"} alt={"back"}/>
                </div>

                <h1>{training?.name}</h1>
            </div>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex gap-3 items-center"}>
                    <img className={"w-6 h-6"} src={"/icons/calendar.svg"} alt={"calendar"}/>
                    <h3>{training?.day}</h3>
                </div>
                <div className={"flex flex-wrap gap-2 flex-1 items-start justify-start"}>
                    {
                        training?.muscles.map((muscle, index) => {
                            return (
                                <span key={index}
                                      className={"bg-[var(--hover-light)] pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-2xl"}>{muscle}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"flex flex-wrap gap-6 justify-center md:justify-start mt-10"}>
                {
                    exercises.map(exo => (
                        <ExerciseComponent exercise={exo} key={exo.id}/>
                    ))
                }
            </div>
            <div className={"w-full flex justify-center items-center mt-16"}>
                <button className={"flex gap-1"} onClick={actionDeleteTraining}>
                    {
                        askConf ? "Réappuyez pour valider" : "Supprimer la séance"
                    }
                    <img src={"/icons/close.svg"} alt={"close"} className={"w-6 h-6 invert"}/>
                </button>
            </div>
        </div>
    );
}
