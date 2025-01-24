
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


