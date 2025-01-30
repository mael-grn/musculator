import {Exercise} from "@/app/exercises/exercisesUtils";
import {useRouter} from "next/navigation";
import {Training} from "@/app/myTrainings/trainingsUtils";

export default function TrainingComponent({training} : {training : Training}) {
    const router = useRouter();
    return (
        <div onClick={() => router.push("/myTrainings/view/" + training.id)} className={"w-60 bg-[var(--light)] p-3 rounded-2xl flex flex-col gap-2 cursor-pointer hover:bg-[var(--hover-light)] active:scale-90"}>
            <h2 className={"text-3xl w-full text-center"}>{training.name}</h2>
            <p className={"w-full text-center"}>{training.day}</p>
            <div className={"flex flex-wrap gap-3 flex-1 items-end items-center justify-center"}>
                {
                    training.muscles.map((muscle, index) => {
                        return (
                            <span key={index} className={"bg-[var(--hover-light)] pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-2xl"}>{muscle}</span>
                        )
                    })
                }
            </div>
        </div>
    );
}