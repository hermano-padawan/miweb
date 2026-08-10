import type { QuizQuestion } from "../components/games/QuizGame.astro";

const link = { relatedHref: "/estudios-biblicos", relatedLabel: "Sigue aprendiendo con nuestros estudios" };
const q = (question: string, answers: string[], correct: number, explanation: string): QuizQuestion => ({ question, answers, correct, explanation, ...link });

export interface QuizGameDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export const quizGames: QuizGameDefinition[] = [
  {
    slug: "adivina-personaje-biblico", shortTitle: "Adivina el personaje", title: "Adivina el personaje bíblico", difficulty: "Media", image: "/images/personajes-biblicos/articles/david-goliat.webp", description: "Reconoce diez personajes a partir de pistas sobre sus decisiones, viajes e historias.",
    questions: [
      q("Construí un arca para proteger a mi familia del diluvio. ¿Quién soy?", ["Noé", "Abraham", "Lot"], 0, "Noé obedeció la instrucción de construir el arca en Génesis 6."),
      q("Vencí a un gigante con una honda y una piedra. ¿Quién soy?", ["Saúl", "David", "Sansón"], 1, "David derrotó a Goliat confiando en Dios."),
      q("Dios me llamó desde una zarza que ardía. ¿Quién soy?", ["Moisés", "Elías", "Josué"], 0, "Moisés recibió su llamado junto a la zarza ardiente."),
      q("Interpreté sueños en Egipto y llegué a gobernar. ¿Quién soy?", ["José", "Daniel", "Jacob"], 0, "José interpretó los sueños del faraón y fue puesto al frente de Egipto."),
      q("Fui reina y arriesgué mi vida por mi pueblo. ¿Quién soy?", ["Rut", "Débora", "Ester"], 2, "Ester intercedió ante el rey para salvar a su pueblo."),
      q("Perdí mi fuerza cuando cortaron mi cabello. ¿Quién soy?", ["Gedeón", "Sansón", "Samuel"], 1, "La historia de Sansón y Dalila aparece en Jueces 16."),
      q("Sobreviví una noche en un foso de leones. ¿Quién soy?", ["Daniel", "Jeremías", "Jonás"], 0, "Daniel fue protegido en el foso de los leones."),
      q("Negué tres veces conocer a Jesús. ¿Quién soy?", ["Pedro", "Tomás", "Judas"], 0, "Pedro negó a Jesús y después fue restaurado."),
      q("Perseguí a los cristianos antes de encontrarme con Jesús. ¿Quién soy?", ["Pablo", "Felipe", "Esteban"], 0, "Pablo cambió de rumbo después de su encuentro camino de Damasco."),
      q("Dejé mi tierra y acompañé a Noemí. ¿Quién soy?", ["Sara", "Rut", "Marta"], 1, "Rut permaneció junto a Noemí y comenzó una nueva vida en Belén."),
    ],
  },
  {
    slug: "verdadero-o-falso-biblia", shortTitle: "Verdadero o falso", title: "Verdadero o falso: Biblia", difficulty: "Fácil", image: "/images/preguntas-biblicas/articles/empezar-leer-biblia.webp", description: "Decide si diez afirmaciones conocidas de la Biblia son verdaderas o falsas.",
    questions: [
      q("Moisés construyó el arca.", ["Verdadero", "Falso"], 1, "Fue Noé quien construyó el arca."),
      q("David fue rey de Israel.", ["Verdadero", "Falso"], 0, "David sucedió a Saúl como rey."),
      q("El primer libro de la Biblia es Éxodo.", ["Verdadero", "Falso"], 1, "El primer libro es Génesis."),
      q("Jesús nació en Belén.", ["Verdadero", "Falso"], 0, "Mateo y Lucas sitúan su nacimiento en Belén."),
      q("Jonás pasó tres días dentro de un gran pez.", ["Verdadero", "Falso"], 0, "Así lo relata el libro de Jonás."),
      q("Pablo formó parte de los doce discípulos originales.", ["Verdadero", "Falso"], 1, "Pablo se convirtió después de la resurrección de Jesús."),
      q("El Salmo 23 comienza hablando de un pastor.", ["Verdadero", "Falso"], 0, "Comienza con la imagen del Señor como pastor."),
      q("Ester fue reina.", ["Verdadero", "Falso"], 0, "Ester llegó a ser reina de Persia."),
      q("Goliat venció a David.", ["Verdadero", "Falso"], 1, "David venció a Goliat."),
      q("Apocalipsis es el último libro del Nuevo Testamento.", ["Verdadero", "Falso"], 0, "Apocalipsis cierra el canon del Nuevo Testamento."),
    ],
  },
  {
    slug: "que-libro-de-la-biblia-es", shortTitle: "¿En qué libro aparece?", title: "¿En qué libro de la Biblia aparece?", difficulty: "Media", image: "/images/diccionario-biblico/articles/esperanza.webp", description: "Relaciona personajes, frases y acontecimientos con el libro bíblico correspondiente.",
    questions: [
      q("¿En qué libro aparece la creación del mundo?", ["Génesis", "Éxodo", "Job"], 0, "El relato de la creación abre el libro de Génesis."),
      q("¿Dónde se narran las diez plagas de Egipto?", ["Levítico", "Éxodo", "Números"], 1, "Las plagas y la salida de Egipto se narran en Éxodo."),
      q("¿En qué libro encontramos «El Señor es mi pastor»?", ["Proverbios", "Isaías", "Salmos"], 2, "La frase abre el Salmo 23."),
      q("¿Dónde se relata la historia de David y Goliat?", ["1 Samuel", "1 Reyes", "Jueces"], 0, "El enfrentamiento aparece en 1 Samuel 17."),
      q("¿Qué evangelio contiene el Sermón del Monte?", ["Marcos", "Mateo", "Juan"], 1, "Mateo reúne el Sermón del Monte en los capítulos 5 al 7."),
      q("¿Dónde aparece el fruto del Espíritu?", ["Gálatas", "Romanos", "Hebreos"], 0, "Gálatas 5 enumera el fruto del Espíritu."),
      q("¿En qué libro se encuentra la historia de la reina Ester?", ["Rut", "Ester", "Esdras"], 1, "El libro de Ester lleva el nombre de su protagonista."),
      q("¿Dónde se relata Pentecostés?", ["Hechos", "Lucas", "Romanos"], 0, "Pentecostés aparece en Hechos 2."),
      q("¿En qué libro aparece la armadura de Dios?", ["Efesios", "Filipenses", "Colosenses"], 0, "Efesios 6 presenta la armadura de Dios."),
      q("¿Qué libro contiene las visiones de la nueva Jerusalén?", ["Daniel", "Apocalipsis", "Ezequiel"], 1, "Apocalipsis culmina con la visión de la nueva Jerusalén."),
    ],
  },
  {
    slug: "jesus", shortTitle: "Test sobre Jesús", title: "¿Cuánto sabes sobre Jesús?", difficulty: "Media", image: "/images/preguntas-biblicas/articles/quien-es-jesus.webp", description: "Repasa la vida, las enseñanzas, las parábolas y los discípulos de Jesús.",
    questions: [
      q("¿Dónde nació Jesús?", ["Belén", "Nazaret", "Jerusalén"], 0, "Jesús nació en Belén."), q("¿Quién bautizó a Jesús?", ["Pedro", "Juan el Bautista", "Santiago"], 1, "Juan bautizó a Jesús en el Jordán."), q("¿Cuántos discípulos escogió?", ["7", "10", "12"], 2, "Jesús escogió a doce discípulos."), q("¿Cuál fue su primer milagro según Juan?", ["Calmar una tormenta", "Convertir agua en vino", "Multiplicar panes"], 1, "Juan 2 relata las bodas de Caná."), q("¿Qué oración enseñó como modelo?", ["Padrenuestro", "Magníficat", "Shema"], 0, "Jesús enseñó el Padrenuestro."), q("¿Quién lo traicionó?", ["Judas", "Tomás", "Mateo"], 0, "Judas Iscariote entregó a Jesús."), q("¿Qué discípulo caminó sobre el agua hacia Jesús?", ["Juan", "Pedro", "Andrés"], 1, "Pedro salió de la barca para caminar hacia Jesús."), q("¿Quién pidió el cuerpo de Jesús?", ["Nicodemo", "José de Arimatea", "Zaqueo"], 1, "José de Arimatea pidió el cuerpo a Pilato."), q("¿Qué parábola habla de un hijo que regresa?", ["El sembrador", "El hijo pródigo", "Los talentos"], 1, "Lucas 15 contiene la parábola del hijo pródigo."), q("¿Qué ocurrió al tercer día?", ["La ascensión", "La resurrección", "Pentecostés"], 1, "Los evangelios anuncian la resurrección de Jesús."),
    ],
  },
  {
    slug: "moises", shortTitle: "Test sobre Moisés", title: "¿Cuánto sabes sobre Moisés?", difficulty: "Media", image: "/images/personajes-biblicos/articles/abraham.webp", description: "Recorre el llamado de Moisés, el éxodo, el desierto y los Diez Mandamientos.",
    questions: [
      q("¿En qué país creció Moisés?", ["Egipto", "Babilonia", "Canaán"], 0, "Moisés creció en la casa del faraón."), q("¿Quién encontró al bebé Moisés?", ["La hija del faraón", "Miriam", "Séfora"], 0, "La hija del faraón lo encontró en el río."), q("¿Cómo llamó Dios a Moisés?", ["En un sueño", "Desde una zarza", "En el templo"], 1, "Dios habló desde una zarza ardiente."), q("¿Quién acompañó a Moisés ante el faraón?", ["Josué", "Aarón", "Caleb"], 1, "Aarón actuó como portavoz."), q("¿Cuántas plagas sufrió Egipto?", ["7", "10", "12"], 1, "Éxodo relata diez plagas."), q("¿Qué mar cruzó Israel?", ["Mar Muerto", "Mar Rojo", "Mediterráneo"], 1, "Israel cruzó el mar Rojo."), q("¿Qué alimento apareció en el desierto?", ["Maná", "Higos", "Trigo"], 0, "El pueblo recibió maná."), q("¿Dónde recibió los mandamientos?", ["Sinaí", "Carmelo", "Sion"], 0, "Moisés subió al monte Sinaí."), q("¿Quién sucedió a Moisés?", ["Aarón", "Josué", "Samuel"], 1, "Josué guio al pueblo después de Moisés."), q("¿Entró Moisés en la tierra prometida?", ["Sí", "No", "Solo durante un día"], 1, "La contempló desde lejos, pero no entró."),
    ],
  },
  {
    slug: "antiguo-testamento", shortTitle: "Antiguo Testamento", title: "Test del Antiguo Testamento", difficulty: "Difícil", image: "/images/versiculos/articles/salmo-23.webp", description: "Diez preguntas sobre patriarcas, reyes, profetas, sabiduría e historia de Israel.",
    questions: [
      q("¿Quién fue el padre de Isaac?", ["Jacob", "Abraham", "José"], 1, "Abraham y Sara fueron padres de Isaac."), q("¿Cuál fue el nuevo nombre de Jacob?", ["Israel", "Judá", "Efraín"], 0, "Jacob recibió el nombre Israel."), q("¿Quién ungió a David como rey?", ["Natán", "Samuel", "Elías"], 1, "Samuel ungió a David."), q("¿Quién construyó el primer templo de Jerusalén?", ["David", "Salomón", "Ezequías"], 1, "Salomón construyó el templo."), q("¿Qué profeta desafió a los profetas de Baal?", ["Elías", "Isaías", "Amós"], 0, "Elías los desafió en el Carmelo."), q("¿Qué ciudad cayó tras siete días de marcha?", ["Jericó", "Nínive", "Hebrón"], 0, "Jericó cayó en tiempos de Josué."), q("¿Quién interpretó la escritura en la pared?", ["Ezequiel", "Daniel", "Esdras"], 1, "Daniel explicó el mensaje al rey Belsasar."), q("¿Qué mujer fue jueza de Israel?", ["Débora", "Rut", "Ana"], 0, "Débora fue profetisa y jueza."), q("¿Cuál es el libro más largo por capítulos?", ["Isaías", "Salmos", "Génesis"], 1, "Salmos contiene 150 capítulos."), q("¿Quién reconstruyó los muros de Jerusalén?", ["Nehemías", "Esdras", "Zorobabel"], 0, "Nehemías dirigió la reconstrucción."),
    ],
  },
  {
    slug: "nuevo-testamento", shortTitle: "Nuevo Testamento", title: "Test del Nuevo Testamento", difficulty: "Difícil", image: "/images/estudios-biblicos/articles/sermon-del-monte.webp", description: "Pon a prueba lo que sabes de los evangelios, Hechos, las cartas y Apocalipsis.",
    questions: [
      q("¿Cuántos evangelios hay?", ["3", "4", "5"], 1, "Mateo, Marcos, Lucas y Juan son los cuatro evangelios."), q("¿Quién escribió Hechos?", ["Lucas", "Pablo", "Pedro"], 0, "Lucas escribió el evangelio que lleva su nombre y Hechos."), q("¿Quién sustituyó a Judas entre los doce?", ["Matías", "Bernabé", "Silas"], 0, "Matías fue escogido en Hechos 1."), q("¿En qué ciudad se llamó cristianos por primera vez a los discípulos?", ["Roma", "Antioquía", "Éfeso"], 1, "Ocurrió en Antioquía."), q("¿Quién acompañó a Pablo en prisión cantando himnos?", ["Silas", "Timoteo", "Tito"], 0, "Pablo y Silas cantaron en Filipos."), q("¿Cuál es el capítulo conocido por hablar del amor?", ["Romanos 8", "1 Corintios 13", "Hebreos 11"], 1, "1 Corintios 13 describe el amor."), q("¿Qué carta habla de la armadura de Dios?", ["Efesios", "Gálatas", "Santiago"], 0, "La armadura aparece en Efesios 6."), q("¿Quién recibió la visión de Apocalipsis?", ["Juan", "Pedro", "Pablo"], 0, "Apocalipsis identifica a Juan como receptor."), q("¿Cuál es el último libro?", ["Judas", "Hebreos", "Apocalipsis"], 2, "Apocalipsis cierra el Nuevo Testamento."), q("¿Qué apóstol dudó inicialmente de la resurrección?", ["Tomás", "Andrés", "Felipe"], 0, "Tomás pidió ver las heridas de Jesús."),
    ],
  },
];

export const gameCards = [
  ...quizGames,
  { slug: "ordena-historia-biblica", shortTitle: "Ordena la historia", title: "Ordena la historia bíblica", difficulty: "Media", image: "/images/sermones/articles/hijo-prodigo.webp", description: "Coloca acontecimientos bíblicos en su orden correcto." },
  { slug: "que-personaje-biblico-eres", shortTitle: "¿Qué personaje eres?", title: "¿Qué personaje bíblico eres?", difficulty: "Lúdico", image: "/images/personajes-biblicos/articles/ester.webp", description: "Elige cómo actuarías y descubre el personaje con el que compartes más rasgos." },
];
