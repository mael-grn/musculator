"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {joursSemaine} from "@/app/myTrainings/trainingsUtils";
import {createExercice, Exercise, getMuscleGroups} from "@/app/exercises/exercisesUtils";

export default function Create() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [muscleGroup, setMuscleGroup] = useState<string[]>([]);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string[]>([]);
    const [theMuscleTheUserWantToSearch, setTheMuscleTheUserWantToSearch] = useState<string>("");
    const [newStep, setNewStep] = useState<string>("");
    const [newAdvice, setNewAdvice] = useState<string>("");
    const [steps, setSteps] = useState<string[]>([]);
    const [advices, setAdvices] = useState<string[]>([]);

    const [addingStep, setAddingStep] = useState<boolean>(false);
    const [addingAdvice, setAddingAdvice] = useState<boolean>(false);

    const [showMuscleGroupResults, setShowMuscleGroupResults] = useState<boolean>(false);

    useEffect(() => {
        getMuscleGroups().then((muscleGroups) => {
            setMuscleGroup(muscleGroups);
        });
    }, []);

    function onSubmit(e : React.FormEvent) {
        e.preventDefault();
        if (steps.length === 0 || advices.length === 0 || selectedMuscleGroup.length === 0 || name === "" || description === "") {
            return;
        }
        const exercise: Exercise = {
            id: 1000 + Math.floor(Math.random() * 1000),
            name: name,
            description: description,
            category: selectedMuscleGroup,
            method: steps,
            advices: advices,
            img: "",
            originalLink: ""
        }
        createExercice(exercise).then(() => router.push("/myExercises"));
    }

    return (
        <div className={"flex flex-col gap-10 w-full"}>
            <div className={"flex gap-3 mt-4 items-center"}>
                <img onClick={() => router.back()}
                     className={"w-12 h-12 p-2 rounded-3xl cursor-pointer bg-[var(--light)] md:hover:bg-[var(--hover-light)] active:scale-90"}
                     src={"/icons/arrow-left.svg"} alt={"back"}/>
                <h2 className={"md:text-3xl text-xl"}>Créer un nouvel exercice</h2>
            </div>
            <div className={"flex flex-col w-full items-center justify-center"}>
                <form className={"flex flex-col gap-6 w-full items-center justify-center"} onSubmit={onSubmit}>
                    <h3 className={"w-full max-w-96 text-2xl font-bold"}>Nom</h3>
                    <input className={"pt-2.5 pb-2.5 pl-4 pr-4 max-w-96 w-full"} type={"text"}
                           placeholder={"Nom de l'exercice"} value={name} onChange={(e) => setName(e.target.value)}/>
                    <h3 className={"w-full max-w-96 text-2xl font-bold"}>Groupe(s) musculaire(s)</h3>

                    <input className={"pt-2.5 pb-2.5 pl-4 pr-4 w-full max-w-96"} type={"text"}
                           onFocus={() => setShowMuscleGroupResults(true)}
                           onBlur={() => setShowMuscleGroupResults(false)}
                           placeholder={"Ajouter un groupe musculaire"} value={theMuscleTheUserWantToSearch}
                           onChange={(event) => setTheMuscleTheUserWantToSearch(event.target.value)}>

                    </input>
                    <div className={"flex flex-wrap gap-3"}>
                        {
                            selectedMuscleGroup.map((muscle) => (
                                <span
                                    className={"pt-1 pb-1 pl-3 pr-1 rounded-3xl bg-light flex items-center justify-center gap-1"}
                                    key={muscle}>
                                    {muscle}
                                    <span
                                        className={"w-6 h-6 flex items-center justify-center md:hover:bg-hoverLight active:scale-90 rounded-3xl"}
                                        onClick={() => setSelectedMuscleGroup(selectedMuscleGroup.filter(item => item !== muscle))}>
                                        <img className={"w-4 h-4"} src={"/icons/close.svg"} alt={"close"}/>
                                    </span>
                                </span>
                            ))
                        }
                    </div>
                    {
                        showMuscleGroupResults && muscleGroup.length !== selectedMuscleGroup.length &&
                        <div
                            className={`overflow-auto w-full bg-light p-3 rounded-2xl max-w-96`}>
                            {
                                muscleGroup.filter((muscle) => !selectedMuscleGroup.includes(muscle) && muscle.includes(theMuscleTheUserWantToSearch)).map((muscle) => (
                                    <div key={muscle} className={"flex gap-3 items-center"}>
                                        <span
                                            className={"cursor-pointer md:hover:bg-hoverLight active:scale-90 rounded-3xl p-1 w-full text-center"}
                                            onMouseDown={() => selectedMuscleGroup.push(muscle)}>{muscle}</span>
                                    </div>
                                ))
                            }
                        </div>
                    }

                    <h3 className={"w-full max-w-96 text-2xl font-bold"}>Description</h3>

                    <textarea placeholder={"Description de l'exercice"}
                              className={"max-w-96 w-full focus:outline-0 rounded-2xl bg-light p-3 max-h-36 min-h-14"}
                            value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <h3 className={"w-full max-w-96 text-2xl font-bold"}>Etapes</h3>

                    {
                        steps.map((step, index) => (
                            <div key={index}
                                 className={"flex gap-3 rounded-2xl bg-light max-w-96 w-full pt-2.5 pb-2.5 pl-3.5 pr-3.5"}>
                                <p className={"text-sm"}>{index + 1}. </p>
                                <p className={"text-sm"}>{step}</p>
                            </div>
                        ))
                    }
                    {
                        addingStep &&
                        <div className={"flex flex-col gap-3 justify-center items-center w-full max-w-96"}>
                            <input type={"text"} placeholder={"Description de l'étape"}
                                   className={"pt-2.5 pb-2.5 pl-3.5 pr-3.5 w-full"} value={newStep}
                                   onChange={(e) => setNewStep(e.target.value)}/>
                            <div className={"flex gap-3"}>
                                <button className={"h-10"} onClick={() => setAddingStep(false)}>Annuler</button>
                                <button className={"h-10"} disabled={newStep === ""} onClick={() => {
                                    setSteps([...steps, newStep]);
                                    setNewStep("");
                                    setAddingStep(false);
                                }}>
                                    Ajouter
                                    <img src={"/icons/plus.svg"} alt={"plus"} className={"h-full invert"}/>
                                </button>
                            </div>

                        </div>
                    }
                    {
                        !addingStep &&
                        <button className={"h-10"} onClick={() => setAddingStep(true)}>
                            Ajouter une étape
                            <img src={"/icons/plus.svg"} alt={"plus"} className={"h-full invert"}/>
                        </button>
                    }

                    <h3 className={"w-full max-w-96 text-2xl font-bold"}>Conseils</h3>


                    {
                        advices.map((advice, index) => (
                            <div key={index}
                                 className={"flex gap-3 rounded-2xl bg-light max-w-96 w-full pt-2.5 pb-2.5 pl-3.5 pr-3.5"}>
                                <p className={"text-sm"}>{index + 1}. </p>
                                <p className={"text-sm"}>{advice}</p>
                            </div>
                        ))
                    }
                    {
                        addingAdvice &&
                        <div className={"flex flex-col gap-3 justify-center items-center w-full max-w-96"}>
                            <input type={"text"} placeholder={"Description du conseil"}
                                   className={"pt-2.5 pb-2.5 pl-3.5 pr-3.5 w-full"} value={newAdvice}
                                   onChange={(e) => setNewAdvice(e.target.value)}/>
                            <div className={"flex gap-3"}>
                                <button className={"h-10"} onClick={() => setAddingAdvice(false)}>Annuler</button>
                                <button className={"h-10"} disabled={newAdvice === ""} onClick={() => {
                                    setAdvices([...advices, newAdvice]);
                                    setNewAdvice("");
                                    setAddingAdvice(false);
                                }}>
                                    Ajouter
                                    <img src={"/icons/plus.svg"} alt={"plus"} className={"h-full invert"}/>
                                </button>
                            </div>

                        </div>
                    }
                    {
                        !addingAdvice &&
                        <button className={"h-10"} onClick={() => setAddingAdvice(true)}>
                            Ajouter un conseil
                            <img src={"/icons/plus.svg"} alt={"plus"} className={"h-full invert"}/>
                        </button>
                    }

                    <button
                        type={"submit"}
                        className={"h-10 md:mb-0 mb-10"}
                        disabled={steps.length === 0 || advices.length === 0 || selectedMuscleGroup.length === 0 || name === "" || description === ""}
                    >
                        Valider
                        <img src={"/icons/check-solid.svg"} alt={"plus"} className={"h-full invert"}/>
                    </button>

                </form>
            </div>

        </div>
    )
}