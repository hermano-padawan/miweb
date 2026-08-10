import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/content");

const passages = [
  [/ansiedad|preocupaci[oó]n|paz/, ["Filipenses 4", "PHP.4"]],
  [/perd[oó]n|perdonar|enemigos|reconciliaci[oó]n/, ["Mateo 18", "MAT.18"]],
  [/comenzar.el.d[ií]a|ma[nñ]ana/, ["Salmo 5", "PSA.5"]],
  [/dormir|descansar|descanso/, ["Salmo 4", "PSA.4"]],
  [/familia|hijos/, ["Salmo 127", "PSA.127"]],
  [/enferm/, ["Santiago 5", "JAS.5"]],
  [/decisi|sabidur/, ["Santiago 1", "JAS.1"]],
  [/trabajo|provisi[oó]n|cotidiano|servir/, ["Colosenses 3", "COL.3"]],
  [/protecci[oó]n|fortaleza|miedo|tormenta|amparo/, ["Salmo 46", "PSA.46"]],
  [/espera|esperanza|cambios|silencio/, ["Romanos 8", "ROM.8"]],
  [/orar|oraci[oó]n|padrenuestro|escucha/, ["Mateo 6", "MAT.6"]],
  [/gracia|salvaci[oó]n|pecado|arrepentimiento|volver.a.empezar|fracaso/, ["Efesios 2", "EPH.2"]],
  [/fe|abraham/, ["Hebreos 11", "HEB.11"]],
  [/reino|serm[oó]n.del.monte|bienaventuranzas/, ["Mateo 5", "MAT.5"]],
  [/amor.de.dios|no.eres.suficiente/, ["Romanos 8", "ROM.8"]],
  [/jes[uú]s/, ["Juan 1", "JHN.1"]],
  [/muerte|resurrecci[oó]n/, ["1 Corintios 15", "1CO.15"]],
  [/sufrimiento|pruebas/, ["Santiago 1", "JAS.1"]],
  [/david|goliat/, ["1 Samuel 17", "1SA.17"]],
  [/mois[eé]s/, ["Éxodo 3", "EXO.3"]],
  [/rut/, ["Rut 1", "RUT.1"]],
  [/el[ií]as/, ["1 Reyes 19", "1KI.19"]],
  [/ester/, ["Ester 4", "EST.4"]],
  [/jos[eé]/, ["Génesis 50", "GEN.50"]],
  [/mar[ií]a/, ["Lucas 1", "LUK.1"]],
  [/pablo|conversi[oó]n/, ["Hechos 9", "ACT.9"]],
  [/pedro|restauraci[oó]n/, ["Juan 21", "JHN.21"]],
  [/hijo.pr[oó]digo/, ["Lucas 15", "LUK.15"]],
  [/fruto.del.esp[ií]ritu/, ["Gálatas 5", "GAL.5"]],
  [/vid|p[aá]mpanos/, ["Juan 15", "JHN.15"]],
  [/salmo.23/, ["Salmo 23", "PSA.23"]],
  [/salmo.1|dos.caminos/, ["Salmo 1", "PSA.1"]],
];

const categoryAdvice = {
  "Devoción": "Escoge una idea, conviértela en una oración breve y concreta una acción pequeña para hoy.",
  "Diccionario bíblico": "Lee el término dentro de varios pasajes y observa su contexto antes de convertir la definición en una conclusión general.",
  "Estudios bíblicos": "Vuelve al pasaje completo, identifica su contexto y anota qué afirma el texto antes de buscar una aplicación personal.",
  "Oración": "Lee la oración despacio, adapta sus palabras a tu situación y deja un momento de silencio para responder con honestidad.",
  "Personajes bíblicos": "Distingue entre lo que la narración describe y lo que realmente presenta como ejemplo; después elige una lección concreta.",
  "Preguntas bíblicas": "Compara la respuesta con los pasajes citados y conversa las dudas restantes con una comunidad o persona madura.",
  "Sermón": "Resume el mensaje en una frase y decide qué conversación, límite o práctica responsable requiere en tu situación.",
  "Versículos": "Lee cada versículo dentro de su capítulo para no separar una promesa de su argumento, destinatarios y circunstancias.",
};

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)["']?\\s*$`, "m"));
  return match?.[1]?.trim() ?? "";
}

function passageFor(text) {
  const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  for (const [pattern, passage] of passages) if (pattern.test(normalized)) return passage;
  return ["Salmo 119", "PSA.119"];
}

for (const section of fs.readdirSync(root)) {
  const directory = path.join(root, section);
  if (!fs.statSync(directory).isDirectory()) continue;

  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith(".md"))) {
    const file = path.join(directory, filename);
    let source = fs.readFileSync(file, "utf8").trimEnd();
    const title = frontmatterValue(source, "title");
    const category = frontmatterValue(source, "category");
    const [passageName, passageCode] = passageFor(`${filename} ${title}`);
    const bibleUrl = `https://www.bible.com/es/bible/149/${passageCode}.RVR1960`;

    if (!source.includes("bible.com/es/bible/")) {
      const reading = `\n\n## Lectura bíblica online\n\nPara comprobar el contexto, puedes leer [${passageName} completo en Bible.com](${bibleUrl}). El acceso es externo, gratuito y sin anuncios.`;
      const faqIndex = source.search(/\n## Preguntas frecuentes\s*\n/i);
      source = faqIndex >= 0
        ? `${source.slice(0, faqIndex)}${reading}\n${source.slice(faqIndex)}`
        : `${source}${reading}`;
    }

    if (!/^## Preguntas frecuentes\s*$/im.test(source)) {
      const advice = categoryAdvice[category] ?? categoryAdvice["Estudios bíblicos"];
      source += `\n\n## Preguntas frecuentes\n\n### ¿Cuál es el pasaje recomendado para profundizar en este tema?\n\nUna buena puerta de entrada es ${passageName}. Conviene leer el capítulo completo y no solamente los versículos más conocidos.\n\n### ¿Cómo puedo aplicar hoy «${title}»?\n\n${advice}\n\n### ¿Qué debo evitar al interpretar este tema?\n\nEvita usar una frase aislada como respuesta automática para todas las situaciones. Considera el contexto bíblico, las circunstancias personales y, cuando corresponda, busca ayuda pastoral, médica o profesional.`;
    }

    fs.writeFileSync(file, `${source}\n`, "utf8");
  }
}

console.log("Lecturas externas y preguntas frecuentes revisadas en todas las colecciones.");
