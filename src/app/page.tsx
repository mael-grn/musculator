"use client";

import {Exercise, getExercises} from "@/app/exercises/exercisesUtils";
import ExerciseComponent from "@/app/components/exercise";
import {useEffect, useState} from "react";
export default function Home() {
    const pallierItem : number = 10;
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    const [nbrExoToShow, setNbrExoToShow] = useState<number>(pallierItem);

    useEffect(() => {
        getExercises().then((exercises) => {
            setExerciseList(exercises);
        });
    }, []);

    const showMoreItem = () => {
        setNbrExoToShow(nbrExoToShow + pallierItem);
    }

    const onSearch = async (event : any) => {
        const value = event.target.value;
        let exos = await getExercises();
        const filteredList = exos.filter((exercise : Exercise) => {
            return exercise.name.includes(value);
        });
        setExerciseList(filteredList);
    }

  return (
    <div className={"flex flex-col justify-center gap-10 items-center"}>
      <h1>Musculator 💪</h1>
        <input className={"text-center w-full md:w-1/3 font-[inherit] "} onKeyUp={onSearch} type={"text"} placeholder={"Rechercher"}/>
        <div className={"flex flex-wrap justify-center gap-10"}>
            {
                exerciseList.slice(0, nbrExoToShow).map((exercise : Exercise, index : number) => {
                    return (
                        <ExerciseComponent exercise={exercise} key={index}/>
                    )
                })
            }
        </div>
        {
            exerciseList.length > nbrExoToShow && <button onClick={showMoreItem}>Voir plus</button>
        }

    </div>
  );
}
