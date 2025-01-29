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
    if (exerciseList.length === 0) {
        const data = await fetch ("/exercises/exercises.json");
        let json = await data.json();
        exerciseList = json.exosWithDetails;
    }
    return exerciseList;
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
    let localStrorageSavedExercices = localStorage.getItem("savedExercices");
    let savedExercices : number[] = localStrorageSavedExercices && localStrorageSavedExercices[0] ? JSON.parse(localStrorageSavedExercices) : [];
    return exerciseList.filter(exo => savedExercices.includes(exo.id));
}

