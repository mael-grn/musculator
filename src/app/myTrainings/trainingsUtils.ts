export interface Training {
    id: number;
    name: string;
    day: joursSemaine;
    muscles: string[];
    exercises: number[];
}

export enum joursSemaine {
    DIMANCHE = "Dimanche",
    LUNDI = "Lundi",
    MARDI = "Mardi",
    MERCREDI = "Mercredi",
    JEUDI = "Jeudi",
    VENDREDI = "Vendredi",
    SAMEDI = "Samedi",

}

let trainingList: Training[] = [];

export async function getTrainings(): Promise<Training[]> {
    if (trainingList.length === 0) {
        let localStrorageTrainings = localStorage.getItem("Trainings");
        trainingList = localStrorageTrainings && localStrorageTrainings[0] ? JSON.parse(localStrorageTrainings) : [];
    }
    return trainingList;
}

export async function addTraining(training: Training): Promise<void> {
    await getTrainings();
    trainingList.push(training);
    localStorage.setItem("Trainings", JSON.stringify(trainingList));
}

export async function deleteTraining(trainingId: number): Promise<void> {
    await getTrainings();
    trainingList = trainingList.filter((training) => training.id !== trainingId);
    localStorage.setItem("Trainings", JSON.stringify(trainingList));
}

export async function getTraining(trainingId: number): Promise<Training | undefined> {
    await getTrainings();
    return trainingList.find((training) => training.id === trainingId);
}

export async function generateTrainingID(): Promise<number> {
    await getTrainings();
    let id = Math.floor(Math.random() * 100000);
    while (trainingList.find((training) => training.id === id)) {
        id = Math.floor(Math.random() * 100000);
    }
    return id;
}

export async function saveTempTraining(training: Training): Promise<void> {
    localStorage.setItem("TempTraining", JSON.stringify(training));
}

export async function getTempTraining(): Promise<Training | undefined> {
    let localStrorageTraining = localStorage.getItem("TempTraining");
    return localStrorageTraining ? JSON.parse(localStrorageTraining) : undefined;
}