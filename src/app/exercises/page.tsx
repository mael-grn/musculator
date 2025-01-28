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
    <div className={"flex flex-col justify-center gap-10 items-center mt-4 md:mt-16"}>
        <div className={"w-full md:w-1/3 relative"}>
            <input ref={inputRef} className={" w-full pt-2.5 pb-2.5 pl-3.5 pr-10"} onKeyUp={onSearch} type={"text"}
                   placeholder={"Rechercher"}/>
            <img alt={"icon"} className={"absolute top-0 right-0 w-fit h-full p-2"} src={"/icons/search.svg"} onClick={onSearch}/>
        </div>
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
            exerciseList.length > nbrExoToShow && <button onClick={showMoreItem} className={"mb-5"}>Voir plus</button>
        }

    </div>
  );
}
