
import {useRouter} from "next/navigation";
import {FormEvent, useEffect, useState} from "react";
import {Exercise, getMuscleGroups} from "@/app/exercises/exercisesUtils";
import {generateTrainingID, joursSemaine, saveTempTraining, Training} from "@/app/myTrainings/trainingsUtils";
import PageLoading from "@/app/components/loading";

export default function NewTrainingFirstStep({setTraining}: { setTraining: (training: Training) => void }) {

    const [trainingName, setTrainingName] = useState<string>("");
    const [muscleGroup, setMuscleGroup] = useState<string[]>([]);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string[]>([]);
    const [theMuscleTheUserWantToSearch, setTheMuscleTheUserWantToSearch] = useState<string>("");
    const [jour, setJour] = useState<joursSemaine>(joursSemaine.LUNDI);
    const [loading, setLoading] = useState<boolean>(true);

    const [showMuscleGroupResults, setShowMuscleGroupResults] = useState<boolean>(false);

    useEffect(() => {
        getMuscleGroups().then((muscleGroups) => {
            setMuscleGroup(muscleGroups);
            setLoading(false);
        });
    }, []);

    const onSubmit = (e : FormEvent) => {
        e.preventDefault();
        if (trainingName === null || trainingName === "" || selectedMuscleGroup.length === 0) {
            return;
        }
        generateTrainingID().then((id) => {
            let training : Training = {
                id: id,
                name: trainingName,
                day: jour,
                muscles: selectedMuscleGroup,
                exercises: []
            };
            setTraining(training);
        });

    }

    return (
        <div>
            {
                loading ? <PageLoading/> :
                    <form onSubmit={onSubmit} className={"flex flex-col gap-3 flex-1 items-center mt-14"}>
                        <p>Nommer la séance</p>
                        <input className={"pt-2.5 pb-2.5 pl-4 pr-4 w-full max-w-96"} type={"text"}
                               placeholder={"Nom de la séance"} value={trainingName}
                               onChange={(event) => setTrainingName(event.target.value)}/>
                        <p className={"mt-6"}>Groupe(s) Musculaire(s)</p>
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
                        <p className={"mt-6"}>Jour de la semaine</p>
                        <select
                            className={" pt-2.5 pb-2.5 pl-4 pr-4 w-full max-w-96 rounded-3xl bg-light outline-0 cursor-pointer md:hover:bg-hoverLight focus:hover:bg-light focus:cursor-default"}
                            value={jour} onChange={(event) => setJour(event.target.value as joursSemaine)}>
                            {
                                Object.values(joursSemaine).map((day) => (
                                    <option className={""} key={day} value={day}>{day}</option>
                                ))
                            }
                        </select>
                        <button
                            disabled={trainingName === null || trainingName === "" || selectedMuscleGroup.length === 0}
                            className={"mt-6"}>
                            Suivant
                        </button>
                    </form>
            }
        </div>

    )
        ;
}
