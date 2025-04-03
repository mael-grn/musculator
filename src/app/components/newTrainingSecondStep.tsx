import {Training} from "@/app/myTrainings/trainingsUtils";
import {Exercise, getExercises} from "@/app/exercises/exercisesUtils";
import ExerciseComponent from "@/app/components/exercise";
import {RefObject, useEffect, useRef, useState} from "react";
import PageLoading from "@/app/components/loading";


export default function NewTrainingSecondStep({training, setTraining} : {training: Training, setTraining: (training: Training) => void}) {
    const pallierItem : number = 10;
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    const [nbrExoToShow, setNbrExoToShow] = useState<number>(pallierItem);
    const inputRef : RefObject<HTMLInputElement|null>  = useRef(null);
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [isStrictFilter, setIsStrictFilter] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        getExercises().then((exercises) => {
            let newExercices = filterExercises(exercises);
            setExerciseList(newExercices);
            setLoading(false);
        });
    }, []);

    const filterExercises = (exercises: Exercise[]) => {
        const newExercises : Exercise[] = [];
        for (const exercise of exercises) {
            let isValid = true;
            for (const muscle of exercise.category) {
                if (!training.muscles.includes(muscle)) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                newExercises.push(exercise);
            }
        }
        return newExercises.sort((a, b) => b.category.length - a.category.length);
    }

    const filterExercisesLessStrict = (exercises: Exercise[]) => {
        return exercises.filter(exercise => {
            return exercise.category.some(muscle => training.muscles.includes(muscle));
        }).sort((a, b) => b.category.length - a.category.length);
    }

    const toggleLessStrictFilter = () => {
        setLoading(true);
        if (isStrictFilter) {
            getExercises().then((exercises) => {
                setIsStrictFilter(false);
                setExerciseList(filterExercisesLessStrict(exercises));
                setLoading(false);
            });
        } else {
            getExercises().then((exercises) => {
                setIsStrictFilter(true);
                setExerciseList(filterExercises(exercises));
                setLoading(false);
            });
        }
    }

    const showMoreItem = () => {
        setNbrExoToShow(nbrExoToShow + pallierItem);
    }

    const toggleSelectExercise = (exercise: Exercise) => {
        if (selectedExercises.includes(exercise)) {
            setSelectedExercises(selectedExercises.filter(e => e !== exercise));
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
        }
    }

    const onValidate = () => {
        if (selectedExercises.length > 0) {
            training.exercises = selectedExercises.map(exercise => exercise.id);
            setTraining(training);
        }
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
        <div>
            {
                loading ? <PageLoading/> :
                    <div className={"flex flex-col justify-center gap-10 items-center mt-14 md:mb-14 mb-20"}>
                        <div className={"flex flex-col gap-3 items-center"}>
                            <h3 className={"text-center"}>Sélectionnez les exercices</h3>
                            <p className={"text-center"}>{selectedExercises.length} exercices selectionnées</p>
                            <p className={"text-center"}>
                                {
                                    isStrictFilter ? "Les exercices affichés correspondent uniquement aux muscles ciblés" : "Les exercices affichés correspondent à au moins un muscle ciblé"
                                }
                            </p>
                            <button onClick={toggleLessStrictFilter}
                                    className={"flex gap-1 items-center justify-center"}>
                                {isStrictFilter ? "Voir des exercices moins pertinents" : "Voir des exercices plus pertinents"}
                                <img className={"w-6 h-6 invert"} src={"/icons/beaker-solid.svg"} alt={"beaker"}/>
                            </button>
                        </div>
                        <div className={"w-full md:w-1/3 relative"}>
                            <input ref={inputRef} className={" w-full pt-2.5 pb-2.5 pl-3.5 pr-10"} onKeyUp={onSearch}
                                   type={"text"}
                                   placeholder={"Rechercher"}/>
                            <img alt={"icon"}
                                 className={"opacity-50 cursor-pointer absolute invert  top-3 right-3 w-8 h-8 active:scale-90"}
                                 src={"/icons/search.svg"} onClick={onSearch}/>
                        </div>
                        <div className={"flex flex-wrap justify-center gap-10"}>
                            {
                                exerciseList.slice(0, nbrExoToShow).map((exercise: Exercise, index: number) => {
                                    return (
                                        <div className={`relative`} key={index}>
                                            <div
                                                className={`${selectedExercises.includes(exercise) ? "scale-90" : ""}`}>
                                                <ExerciseComponent exercise={exercise}
                                                                   onClick={() => toggleSelectExercise(exercise)}/>
                                            </div>
                                            {
                                                selectedExercises.includes(exercise) && (
                                                    <span
                                                        className={"absolute top-0 right-0 w-10 h-10 rounded-3xl bg-primary flex justify-center items-center"}>
                                            <img className={"w-6 h-6 invert"} src={"/icons/check-outline.svg"} alt={"check"}/>
                                        </span>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            exerciseList.length > nbrExoToShow &&
                            <button onClick={showMoreItem} className={"mb-5"}>Voir plus</button>
                        }
                        <div
                            className={"fixed bottom-[75px] w-full flex justify-center items-center p-6  bg-gradient-to-b from-transparent to-background"}>
                            <button className={"w-full md:w-1/2 flex flex-col gap-1 text-xl"}
                                    disabled={selectedExercises.length === 0}
                                    onClick={onValidate}>Valider <span
                                className={"text-xs"}>{selectedExercises.length} exercices</span></button>
                        </div>

                    </div>
            }
        </div>

    );

}