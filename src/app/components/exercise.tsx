import {Exercise} from "@/app/exercises/exercisesUtils";
import {useRouter} from "next/navigation";

export default function ExerciseComponent({exercise, onClick} : {exercise : Exercise, onClick?: () => void}) {
    const router = useRouter();
    return (
        <div  onClick={onClick ? onClick : () => router.push("/exercises/" + exercise.id)} className={"w-60 bg-[var(--light)] p-3 rounded-2xl flex flex-col gap-2 cursor-pointer hover:bg-[var(--hover-light)] active:scale-90"}>

            {
                exercise.img !== "" && <img src={exercise.img} alt={exercise.name} className={"rounded-xl"}/>
            }
            <h2 className={"text-xl"}>{exercise.name}</h2>
            <div className={"flex flex-wrap gap-3 flex-1 items-end"}>
                {
                    exercise.category.map((category, index) => {
                        return (
                            <span key={index} className={"bg-[var(--hover-light)] pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-2xl"}>{category}</span>
                        )
                    })
                }
            </div>
        </div>
    );
}