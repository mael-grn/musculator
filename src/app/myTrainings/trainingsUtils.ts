export interface Training {
    id: number;
    name: string;
    muscles: string[];
    exercises: number[];
}

let trainingList: Training[] = [];

export async function getTrainings(): Promise<Training[]> {
    if (trainingList.length === 0) {
        let localStrorageTrainings = localStorage.getItem("Trainings");
        trainingList = localStrorageTrainings && localStrorageTrainings[0] ? JSON.parse(localStrorageTrainings) : [];
    }
    return trainingList;
}

