"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {addTraining, Training} from "@/app/myTrainings/trainingsUtils";
import NewTrainingFirstStep from "@/app/components/newTrainingFirstStep";
import NewTrainingSecondStep from "@/app/components/newTrainingSecondStep";
import PageLoading from "@/app/components/loading";

export default function newTraining() {
    const router = useRouter();

    const [training, SetTraining] = useState<Training | undefined>(undefined);
    const [isFirstStepComplete, setIsFirstStepComplete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onFirstStepComplete = (training : Training) => {
        SetTraining(training);
        setIsFirstStepComplete(true);
    }

    const onSecondStepComplete = (training : Training) => {
        setLoading(true);
        SetTraining(training);
        addTraining(training).then(
            () => {
                setLoading(false);
                router.push("/myTrainings");
            }
        )
    }

    return (
        <div>
            {
                loading ? <PageLoading/> :
                <div className={"flex-1 flex flex-col"}>
            <div className={"flex gap-3 mt-4 items-center"}>
                <img onClick={() => router.back()}
                     className={"w-12 h-12 p-2 rounded-3xl cursor-pointer bg-[var(--light)] md:hover:bg-[var(--hover-light)] active:scale-90"}
                     src={"/icons/arrow-left.svg"} alt={"back"}/>
                <h2 className={"md:text-3xl text-xl"}>Créer une nouvelle séance</h2>
            </div>

            {
                isFirstStepComplete && training ?
                    <NewTrainingSecondStep training={training} setTraining={onSecondStepComplete}/> :
                    <NewTrainingFirstStep setTraining={onFirstStepComplete}/>

            }
        </div>
}
</div>


)
        ;
}
