"use client";

import {Exercise, getExercises} from "@/app/exercises/exercisesUtils";
import ExerciseComponent from "@/app/components/exercise";
import {RefObject, useEffect, useRef, useState} from "react";
export default function Explore() {
    const pallierItem : number = 10;
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    const [nbrExoToShow, setNbrExoToShow] = useState<number>(pallierItem);
    const inputRef : RefObject<HTMLInputElement|null>  = useRef(null);


    useEffect(() => {
        getExercises().then((exercises) => {
            setExerciseList(exercises);
        });
    }, []);

    const showMoreItem = () => {
        setNbrExoToShow(nbrExoToShow + pallierItem);
    }

    const onSearch = async () => {
        const value : string = inputRef && inputRef.current ? inputRef?.current?.value : "";
        let exos = await getExercises();
        const filteredList = exos.filter((exercise : Exercise) => {
            return exercise.name.includes(value) || exercise.category.includes(value);
        });
        setExerciseList(filteredList);
    }

  return (
    <div className={"flex flex-col justify-center gap-10 items-center relative"}>
        <div className={"w-full sticky -top-1 left-0 p-4 bg-gradient-to-t from-transparent to-background z-10"}>
            <div className={"w-full h-16 relative"}>
                <input ref={inputRef} className={" w-full pt-2.5 pb-2.5 pl-6 pr-10 h-16"} onKeyUp={onSearch}
                       type={"text"}
                       placeholder={"Rechercher"}/>
                <img alt={"icon"} className={"cursor-pointer absolute top-4 right-4 w-8 h-8 active:scale-90 invert"}
                     src={"/icons/search.svg"} onClick={onSearch}/>
            </div>
        </div>
        <div className={"flex flex-wrap justify-center gap-10"}>
            {
                exerciseList.slice(0, nbrExoToShow).map((exercise: Exercise, index: number) => {
                    return (
                        <ExerciseComponent exercise={exercise} key={index}/>
                    )
                })
            }
        </div>
        {
            exerciseList.length > nbrExoToShow && <button onClick={showMoreItem} className={"mb-5"}>Voir plus</button>
        }

    </div>
  );
}
