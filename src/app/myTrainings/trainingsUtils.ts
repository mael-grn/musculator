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
    let localStrorageTrainings = localStorage.getItem("Trainings");
    trainingList = localStrorageTrainings && localStrorageTrainings[0] ? JSON.parse(localStrorageTrainings) : [];
    trainingList = sortTrainingsByDay(trainingList);
    return trainingList;
}

function sortTrainingsByDay(trainings: Training[]): Training[] {
    const dayOrder = {
        [joursSemaine.LUNDI]: 1,
        [joursSemaine.MARDI]: 2,
        [joursSemaine.MERCREDI]: 3,
        [joursSemaine.JEUDI]: 4,
        [joursSemaine.VENDREDI]: 5,
        [joursSemaine.SAMEDI]: 6,
        [joursSemaine.DIMANCHE]: 0, // Sunday is often considered the start of the week
    };

    return [...trainings].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
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