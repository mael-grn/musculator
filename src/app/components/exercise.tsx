import {Exercise} from "@/app/exercises/exercisesUtils";
import {useRouter} from "next/navigation";

export default function ExerciseComponent({exercise, onClick} : {exercise : Exercise, onClick?: () => void}) {
    const router = useRouter();
    return (
        <div  onClick={onClick ? onClick : () => router.push("/exercises/" + exercise.id)} className={"w-full bg-backgroundHover p-6 rounded-3xl flex flex-col gap-8 cursor-pointer active:scale-90 relative"}>
            <div className={"relative  overflow-hidden rounded-t-2xl"}>
                {
                    exercise.img !== "" && <img src={exercise.img} alt={exercise.name}/>
                }
                <div className={"flex flex-wrap gap-3 flex-1 items-end absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-backgroundHover h-full p-4"}>
                    {
                        exercise.category.map((category, index) => {
                            return (
                                <span key={index}
                                      className={"bg-primary pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-2xl"}>{category}</span>
                            )
                        })
                    }
                </div>
            </div>

            <h2 className={"text-xl"}>{exercise.name}</h2>

        </div>
    );
}