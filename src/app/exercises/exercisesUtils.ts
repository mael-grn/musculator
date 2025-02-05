import {list} from "postcss";

export interface Exercise {
    id: number;
    name: string;
    img: string;
    description: string;
    category: string[];
    method: string[];
    advices: string[];
    originalLink: string;
}

let exerciseList: Exercise[] = [];

export async function getExercises(): Promise<Exercise[]> {
    const data = await fetch ("/exercises/exercises.json");
    let json = await data.json();
    exerciseList = json.exosWithDetails;

    const item = localStorage.getItem("createdExercises");
    if (!item) return exerciseList;
    const createdExercises = JSON.parse(item);
    exerciseList = exerciseList.concat(createdExercises);

    return exerciseList;
}

export async function getMuscleGroups(): Promise<string[]> {
    await getExercises();
    let muscleGroups: string[] = [];
    exerciseList.forEach(exo => {
        exo.category.forEach(cat => {
            if (!muscleGroups.includes(cat)) {
                muscleGroups.push(cat);
            }
        });
    });
    return muscleGroups;
}

export function saveExercise(id: number) {
    let localStrorageSavedExercices = localStorage.getItem("savedExercices");
    let savedExercices : number[] = localStrorageSavedExercices && localStrorageSavedExercices[0] ? JSON.parse(localStrorageSavedExercices) : [];
    savedExercices.push(id);
    localStorage.setItem("savedExercices", JSON.stringify(savedExercices));
}

export function removeExercise(exId: number) {
    let localStrorageSavedExercices = localStorage.getItem("savedExercices");
    let savedExercices : number[] = localStrorageSavedExercices && localStrorageSavedExercices[0] ? JSON.parse(localStrorageSavedExercices) : [];
    savedExercices = savedExercices.filter(id => id !== exId);
    localStorage.setItem("savedExercices", JSON.stringify(savedExercices));
}

export function isExerciseSaved(id: number): boolean {
    let localStrorageSavedExercices = localStorage.getItem("savedExercices");
    let savedExercices : number[] = localStrorageSavedExercices && localStrorageSavedExercices[0] ? JSON.parse(localStrorageSavedExercices) : [];
    return savedExercices.includes(id);
}

export async function getSavedExercices(): Promise<Exercise[]> {
    await getExercises();
    console.log(exerciseList);
    let localStrorageSavedExercices = localStorage.getItem("savedExercices");
    let savedExercices : number[] = localStrorageSavedExercices && localStrorageSavedExercices[0] ? JSON.parse(localStrorageSavedExercices) : [];

    return exerciseList.filter(exo => savedExercices.includes(exo.id) || exo.id >= 1000);
}

export async function createExercice(exo: Exercise): Promise<void> {
    const item = localStorage.getItem("createdExercises");
    let createdExercises : Exercise[] = [];
    if (item) {
        createdExercises = JSON.parse(item);
    }
    createdExercises.push(exo);
    localStorage.setItem("createdExercises", JSON.stringify(createdExercises));
    await getExercises();
}

export async function deleteExercice(exId: number): Promise<void> {
    let item = localStorage.getItem("createdExercises");
    if (!item) return;
    let createdExercises = JSON.parse(item);
    createdExercises = createdExercises.filter((exo: Exercise) => exo.id !== exId);
    localStorage.setItem("createdExercises", JSON.stringify(createdExercises));
    await getExercises();
}

