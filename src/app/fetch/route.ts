import {Exercise} from "@/app/exercises/exercisesUtils";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {

        const exos = await fetchAllExosList();
        const exosWithDetails : Exercise[] = [];
        for (const exo of exos) {
            const newExo : Exercise = await fetchExoDetails(exo);
            exosWithDetails.push(newExo);
        }



        return new Response(JSON.stringify({exosWithDetails}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({message: 'server error : ' + error}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

async function fetchExoDetails(exo : Exercise) {
    const result = await fetch(exo.originalLink);
    const html = await result.text();

    if (html === null) {
        return exo;
    }

    //Récuperer la setion qui contient la description de l'exercice
    const section = html.match(/<section\s+class="entry-content">([\s\S]*?)<\/section>/g)?.[0] ?? '';
    //recuperer tous les elements p
    const pElements = section.match(/<p(?:\s+class="has-drop-cap")?>([\s\S]*?)<\/p>/g) ?? [];
    //Pour tous les elements p on supprime les balises, remplacer les &rsquo; par des ' et on les ajoute à la description
    for (const pElement of pElements) {
        let text = pElement.replace(/<\/?p[^>]*>|<\/?a[^>]*>/gi, '');
        text = text.replaceAll("&rsquo;", "'");
        text = text.replaceAll("<strong>", "");
        text = text.replaceAll("</strong>", "");
        if (text) {
            exo.description += " " + text;
        }
    }

    //extrait l'image
    exo.img = section.match(/<img[^>]*\s+src=["']([^"']*)["'][^>]*>/i)?.[1] ?? '';

    //Récuperer la section qui contient la méthode
    const methodSection = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/g)?.[0] ?? '';
    //recuperer tous les elements li
    for (const liElement of methodSection.match(/<li>([\s\S]*?)<\/li>/g) ?? []) {
        let text = liElement.replace(/<\/?li[^>]*>/gi, '');
        text = text.replace(/<\/?p[^>]*>|<\/?a[^>]*>/gi, '');
        text = text.replaceAll("<strong>", "");
        text = text.replaceAll("</strong>", "");
        text = text.replaceAll("&rsquo;", "'");
        if (text) {
            exo.method.push(text);
        }
    }

    //Récuperer la section qui contient les conseils
    const advicesSection = section.match(/<ul[^>]*>([\s\S]*?)<\/ul>/g)?.[0] ?? '';
    //recuperer tous les elements li
    for (const liElement of advicesSection.match(/<li>([\s\S]*?)<\/li>/g) ?? []) {
        console.log(liElement);
        let text = liElement.replace(/<\/?li[^>]*>/gi, '');
        text = text.replace(/<\/?p[^>]*>|<\/?a[^>]*>/gi, '');
        text = text.replaceAll("<strong>", "");
        text = text.replaceAll("</strong>", "");
        text = text.replaceAll("&rsquo;", "'");
        if (text) {
            exo.advices.push(text);
        }
    }
    return exo;
}

async function fetchAllExosList() {
    const exosPectoraux : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-pectoraux");
    const exosDos : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-dos");
    const exosAbdominaux : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-abdominaux");
    const exosEpaules : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-epaules");
    const exosTriceps : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-triceps");
    const exosBiceps : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-biceps");
    const exosFessier : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-fessiers");
    const exosQuadriceps : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-quadriceps");
    const exosIschioJambier : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-ischio-jambiers");
    const exosMollets : Exercise[] = await fetchExosListPage("https://www.docteur-fitness.com/exercices-ischio-jambiers");

    exosPectoraux.map((exo) => exo.category.push("pectoraux"));
    const exos : Exercise[] = exosPectoraux;
    exosDos.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("dos");
        } else {
            exo.category.push("dos");
            exos.push(exo);
        }
    });
    exosAbdominaux.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("abdominaux");
        } else {
            exo.category.push("abdominaux");
            exos.push(exo);
        }
    });
    exosEpaules.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("epaules");
        } else {
            exo.category.push("epaules");
            exos.push(exo);
        }
    });
    exosTriceps.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("triceps");
        } else {
            exo.category.push("triceps");
            exos.push(exo);
        }
    });
    exosBiceps.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("biceps");
        } else {
            exo.category.push("biceps");
            exos.push(exo);
        }
    });
    exosFessier.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("fessier");
        } else {
            exo.category.push("fessier");
            exos.push(exo);
        }
    });
    exosQuadriceps.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("quadriceps");
        } else {
            exo.category.push("quadriceps");
            exos.push(exo);
        }
    });
    exosIschioJambier.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("ischioJambier");
        } else {
            exo.category.push("ischioJambier");
            exos.push(exo);
        }
    });
    exosMollets.map((exo) => {
        const existingExo = exos.find((e) => e.name === exo.name);
        if (existingExo) {
            exos[exos.indexOf(existingExo)].category.push("mollets");
        } else {
            exo.category.push("mollets");
            exos.push(exo);
        }
    });
    return exos;
}
let id:number = 0;
async function fetchExosListPage(link : string)  {
    const result = await fetch(link);
    const html = await result.text()
    const exos : Exercise[] = [];

    if (html === null) {
        return exos;
    }

    const articles = html.match(/<article\s+class="[^"]*">([\s\S]*?)<\/article>/g) ?? [];

    articles.map((article) => {
        const header = article.match(/<header\s+class="[^"]*">([\s\S]*?)<\/header>/g)?.[0] ?? '';

        const link = header.match(/<a href="(.*?)" title="(.*?)">/);
        if (link) {
            const href = link[1];
            const title = link[2];
            exos.push({
                id: id,
                name: title,
                img: "",
                description: "",
                category: [],
                method: [],
                advices: [],
                originalLink: href
            });
            id++;
        }
    });

    return exos;
}

