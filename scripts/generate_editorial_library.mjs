import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const date = "2026-08-09";
const author = "Equipo Nexo Bíblico";

// Los devocionales generados deben reescribirse y revisarse con la guía
// docs/voz-editorial-devocionales.md antes de publicarse.
// Los sermones generados deben reescribirse y revisarse con la guía obligatoria
// docs/voz-editorial-sermones.md antes de publicarse.

const sections = {
  devocionales: {
    category: "Devoción",
    images: [
      "/images/devocionales/articles/aprender-a-esperar.webp",
      "/images/devocionales/articles/ansiedad-descanso.webp",
      "/images/devocionales/articles/comenzar-dia-dios.webp",
    ],
    entries: [
      ["dios-esta-contigo-en-los-cambios", "Dios está contigo en los cambios", "Una reflexión para atravesar transiciones sin perder de vista la presencia y la fidelidad de Dios.", "Los cambios alteran rutinas, relaciones y expectativas. La fe no elimina esa sensación de desorientación, pero nos recuerda que la presencia de Dios no depende de que todo siga igual.", "Presencia en medio de lo nuevo", "Josué recibió una tarea nueva y exigente. La promesa central no fue que todo resultaría sencillo, sino que Dios estaría con él en cada etapa.", "Nombra qué termina y qué comienza. Agradece lo recibido, pide sabiduría para lo nuevo y atiende la responsabilidad más cercana.", "/sermones/confiar-en-dios-cuando-no-sabes-que-hacer"],
      ["cuando-te-cuesta-orar", "Cuando te cuesta orar", "Un devocional para acercarte a Dios cuando faltan palabras, concentración o ánimo.", "Hay días en que orar parece natural y otros en que incluso una frase resulta difícil. La oración no depende de nuestra elocuencia, sino de presentarnos con verdad.", "La oración también puede ser breve", "Los salmos contienen preguntas, silencios y peticiones directas. Dios no exige que escondamos el cansancio detrás de palabras religiosas.", "Comienza con tres frases: gracias por, necesito y entrego. Permanece un minuto en silencio y termina leyendo un salmo.", "/oraciones"],
      ["encontrar-proposito-en-lo-cotidiano", "Encontrar propósito en lo cotidiano", "Cómo reconocer valor espiritual en las tareas pequeñas, repetidas y poco visibles.", "A menudo relacionamos propósito con proyectos extraordinarios. Sin embargo, gran parte de la fidelidad cristiana se practica en conversaciones, tareas y decisiones que nadie celebra.", "Lo pequeño también forma el carácter", "Jesús utilizó imágenes de semillas, levadura y servicio. El reino crece muchas veces mediante acciones discretas y constantes.", "Escoge una tarea habitual y hazla hoy con atención, gratitud e intención de servir a una persona concreta.", "/estudios-biblicos/sermon-del-monte-bienaventuranzas"],
      ["descansar-sin-sentir-culpa", "Descansar sin sentir culpa", "Una reflexión bíblica sobre límites, descanso y la tentación de medir nuestro valor por la productividad.", "El cansancio prolongado puede hacernos pensar que descansar es una pérdida de tiempo. Pero reconocer límites no es pereza; es aceptar que no somos infinitos.", "El descanso es una forma de humildad", "El ritmo bíblico incluye trabajo y pausa. Jesús también se retiraba y atendía las necesidades del cuerpo sin convertir cada momento en producción.", "Define una pausa concreta, apaga una fuente de ruido y permite que el descanso no tenga que justificarse mediante un logro posterior.", "/personajes-biblicos/elias-cansancio-miedo-esperanza"],
      ["agradecer-en-dias-dificiles", "Agradecer en los días difíciles", "Cómo practicar gratitud sin negar el dolor ni fingir que todo está bien.", "La gratitud cristiana no llama bueno a lo que duele. Amplía la mirada para que el problema no borre toda evidencia de gracia presente.", "Gratitud y lamento pueden convivir", "Los salmos expresan pérdida y recuerdan la fidelidad de Dios dentro de la misma oración. No tenemos que escoger entre honestidad y agradecimiento.", "Escribe una dificultad real y tres ayudas concretas que sigan presentes: una persona, un recurso o una oportunidad para actuar.", "/versiculos/salmo-46-significado"],
      ["volver-a-empezar-con-dios", "Volver a empezar con Dios", "Un devocional sobre gracia, arrepentimiento y los primeros pasos después de un error.", "Después de fallar podemos escondernos, justificarnos o concluir que ya es demasiado tarde. La gracia abre un camino diferente: reconocer la verdad y regresar.", "El arrepentimiento mira hacia delante", "Pedro no quedó definido únicamente por su negación. Recibió una conversación restauradora y una responsabilidad renovada.", "Nombra el error sin excusas, repara lo posible y decide una acción distinta para la próxima ocasión.", "/sermones/parabola-hijo-prodigo-gracia"],
      ["cultivar-paz-en-un-dia-ocupado", "Cultivar paz en un día ocupado", "Prácticas sencillas para recuperar atención y vivir un día exigente delante de Dios.", "La prisa puede fragmentar la atención hasta hacernos reaccionar sin pensar. La paz bíblica no requiere una agenda vacía, pero sí un centro estable.", "Vuelve a lo que tienes delante", "Jesús enseña a no cargar hoy con todos los problemas posibles de mañana. Cada día posee responsabilidades y gracia suficientes.", "Antes de cambiar de tarea, detente treinta segundos, respira, nombra tu siguiente responsabilidad y entrégale a Dios lo demás.", "/diccionario-biblico/paz-significado-biblico"],
    ],
  },
  "diccionario-biblico": {
    category: "Diccionario bíblico",
    images: [
      "/images/diccionario-biblico/articles/fe-significado-biblico.webp",
      "/images/diccionario-biblico/articles/shalom.webp",
      "/images/diccionario-biblico/articles/gracia.webp",
    ],
    entries: [
      ["esperanza-significado-biblico", "Esperanza: significado bíblico", "Qué significa esperanza en la Biblia y por qué es más profunda que una expectativa optimista.", "La esperanza bíblica es una confianza orientada al futuro que descansa en el carácter y las promesas de Dios, incluso cuando las circunstancias permanecen abiertas.", "Esperar con fundamento", "No se trata de imaginar el mejor desenlace, sino de confiar en que Dios sigue siendo fiel y que el mal no tendrá la última palabra.", "La esperanza produce perseverancia, oración y una manera responsable de vivir el presente.", "/sermones/que-hacer-cuando-dios-parece-guardar-silencio"],
      ["misericordia-significado-biblico", "Misericordia: significado bíblico", "Definición de misericordia y su relación con compasión, perdón, justicia y acción.", "La misericordia bíblica responde al sufrimiento y a la culpa con compasión activa. No es indiferencia ante el mal, sino una disposición a restaurar.", "Compasión que se mueve", "En los evangelios, Jesús siente compasión y actúa: enseña, alimenta, sana y recibe a quienes otros excluyen.", "Practicar misericordia puede significar escuchar, ayudar, perdonar o establecer una oportunidad real de cambio.", "/sermones/parabola-hijo-prodigo-gracia"],
      ["arrepentimiento-significado-biblico", "Arrepentimiento: significado bíblico", "Qué significa arrepentirse y por qué implica más que sentir culpa o remordimiento.", "El arrepentimiento es un cambio de mente y dirección. Reconoce la verdad sobre el daño y produce una respuesta concreta.", "De la tristeza al cambio", "El remordimiento puede quedarse centrado en cómo nos sentimos. El arrepentimiento mira también a Dios, a la persona afectada y a la reparación posible.", "Confesar, abandonar la conducta y reparar son expresiones prácticas de un cambio interior.", "/sermones/el-poder-del-perdon-cristiano"],
      ["salvacion-significado-biblico", "Salvación: significado bíblico", "Una explicación clara de salvación, rescate, reconciliación y vida nueva en la Biblia.", "La salvación describe la iniciativa de Dios para rescatar del pecado, reconciliar y conducir hacia una vida renovada.", "Rescate y restauración", "La Biblia presenta dimensiones pasadas, presentes y futuras: hemos recibido gracia, estamos siendo transformados y esperamos la restauración completa.", "Recibir salvación produce gratitud, confianza y una vida que aprende a amar y servir.", "/preguntas-biblicas/quien-es-jesus-segun-biblia"],
      ["reino-de-dios-significado", "Reino de Dios: significado bíblico", "Qué quiso decir Jesús al anunciar el reino de Dios y cómo transforma prioridades y relaciones.", "El reino de Dios es el gobierno activo de Dios, anunciado y encarnado por Jesús. No se limita a un territorio político.", "Una realidad presente y futura", "Jesús muestra el reino mediante sanidad, perdón, justicia y comunidad, mientras enseña a esperar su plenitud.", "Buscar el reino significa ordenar la vida bajo los valores y la autoridad de Dios.", "/estudios-biblicos/sermon-del-monte-bienaventuranzas"],
      ["justicia-significado-biblico", "Justicia: significado bíblico", "Cómo entiende la Biblia la justicia personal, social y relacional.", "La justicia bíblica busca que las relaciones sean rectas y que el vulnerable no quede abandonado ante el poder.", "Más que cumplimiento externo", "Los profetas denuncian una religiosidad que mantiene ceremonias mientras tolera explotación y mentira.", "Practicar justicia incluye verdad, imparcialidad, reparación y cuidado responsable del prójimo.", "/estudios-biblicos/sermon-del-monte-bienaventuranzas"],
      ["sabiduria-significado-biblico", "Sabiduría: significado bíblico", "Qué es la sabiduría bíblica y cómo se diferencia de acumular información.", "La sabiduría es la capacidad de vivir bien delante de Dios, interpretando situaciones y escogiendo respuestas responsables.", "Conocimiento convertido en vida", "Proverbios relaciona sabiduría con humildad, consejo, dominio de las palabras y atención a las consecuencias.", "Crecer en sabiduría requiere Escrituras, experiencia, comunidad, oración y disposición a corregirse.", "/preguntas-biblicas/como-saber-voluntad-de-dios"],
    ],
  },
  "estudios-biblicos": {
    category: "Estudios bíblicos",
    images: [
      "/images/estudios-biblicos/articles/sermon-del-monte.webp",
      "/images/estudios-biblicos/articles/filipenses-4.webp",
      "/images/estudios-biblicos/articles/estudiar-biblia-contexto.webp",
    ],
    entries: [
      ["padrenuestro-estudio-mateo-6", "El Padrenuestro: estudio de Mateo 6", "Una guía para comprender la estructura y las peticiones de la oración que Jesús enseñó.", "El Padrenuestro forma parte del Sermón del Monte y enseña a orar sin convertir la oración en espectáculo o acumulación de palabras.", "Dios, su reino y nuestras necesidades", "La oración comienza con el nombre, el reino y la voluntad de Dios antes de presentar pan, perdón y protección.", "Ora cada petición lentamente y tradúcela en una necesidad concreta de tu día.", "/oraciones"],
      ["salmo-1-dos-caminos", "Salmo 1: estudio de los dos caminos", "Contexto, estructura y aplicación del salmo que abre todo el libro de los Salmos.", "El Salmo 1 presenta dos caminos y dos formas de arraigar la vida. Funciona como puerta de entrada al libro de oración de Israel.", "Árbol o paja", "El árbol recibe agua y produce fruto con paciencia; la paja carece de peso y dirección propia.", "Examina qué voces forman tus decisiones y establece un ritmo realista de meditación bíblica.", "/versiculos"],
      ["fruto-del-espiritu-galatas-5", "El fruto del Espíritu en Gálatas 5", "Estudio sobre las nueve cualidades del fruto del Espíritu y su desarrollo en comunidad.", "Pablo contrasta las obras de la carne con un fruto producido por el Espíritu. El singular sugiere una vida integrada, no talentos aislados.", "Carácter formado", "Amor, gozo, paz, paciencia y dominio propio se vuelven visibles especialmente en relaciones difíciles.", "Elige una cualidad y describe cómo se expresaría en una conversación concreta esta semana.", "/diccionario-biblico/paz-significado-biblico"],
      ["romanos-8-nada-nos-separara", "Romanos 8: nada nos separará del amor de Dios", "Un recorrido por la esperanza, el sufrimiento y la seguridad de Romanos 8.", "Romanos 8 no niega el sufrimiento. Habla de gemidos, debilidad y espera dentro de una seguridad más profunda.", "Seguridad en medio de preguntas", "Pablo culmina afirmando que ninguna fuerza puede separar a quienes están en Cristo del amor de Dios.", "Lee el capítulo completo y anota cada promesa junto a la dificultad que reconoce.", "/sermones/que-hacer-cuando-dios-parece-guardar-silencio"],
      ["santiago-1-pruebas-sabiduria", "Santiago 1: pruebas, paciencia y sabiduría", "Estudio práctico sobre cómo responder a pruebas sin simplificar el dolor.", "Santiago escribe a comunidades dispersas que enfrentan presión. Su llamado al gozo no celebra el sufrimiento, sino el fruto posible de la perseverancia.", "Pedir sabiduría", "La sabiduría ayuda a atravesar la prueba con integridad y sin respuestas impulsivas.", "Nombra la prueba, la reacción que produce y la sabiduría específica que necesitas pedir.", "/diccionario-biblico/sabiduria-significado-biblico"],
      ["juan-15-vid-pampanos", "Juan 15: la vid y los pámpanos", "Qué significa permanecer en Cristo y dar fruto según el discurso de despedida de Jesús.", "Jesús utiliza la imagen de una vid para describir dependencia, permanencia y fruto dentro de una relación viva.", "Permanecer antes de producir", "El fruto no nace de actividad desconectada. Surge de recibir vida y permitir que la palabra de Jesús forme deseos y acciones.", "Revisa qué prácticas te ayudan a permanecer y qué actividad está sustituyendo una relación real con Dios.", "/devocionales/cultivar-paz-en-un-dia-ocupado"],
      ["efesios-2-gracia-y-obras", "Efesios 2: gracia, fe y buenas obras", "Estudio sobre la relación entre salvación por gracia y una vida preparada para hacer el bien.", "Efesios 2 afirma que la salvación es regalo, no salario. Inmediatamente añade que hemos sido creados para buenas obras.", "Regalo que produce una nueva vida", "Las obras no compran la gracia; son el camino que la gracia abre después de recibirla.", "Agradece el regalo y escoge una acción de servicio que no utilizarás para demostrar superioridad.", "/diccionario-biblico/gracia-significado-biblico"],
    ],
  },
  oraciones: {
    category: "Oración",
    images: [
      "/images/oraciones/articles/oracion-decision.webp",
      "/images/oraciones/articles/oracion-familia.webp",
      "/images/oraciones/articles/oracion-ansiedad.webp",
    ],
    entries: [
      ["oracion-por-un-enfermo", "Oración por una persona enferma", "Una oración para pedir fortaleza, atención adecuada y compañía durante la enfermedad.", "La enfermedad puede traer miedo, cansancio y preguntas. Orar no obliga a negar la gravedad ni sustituye la atención médica.", "Oración", "Dios compasivo, acompaña a quien está enfermo. Da sabiduría al personal sanitario, descanso al cuerpo y fortaleza a quienes cuidan.", "Ayúdanos a estar presentes sin respuestas fáciles, a ofrecer ayuda concreta y a recibir cada día con esperanza.", "/versiculos/salmo-46-significado"],
      ["oracion-por-los-hijos", "Oración por los hijos", "Palabras para pedir protección, sabiduría y libertad responsable para los hijos en cada etapa.", "Orar por los hijos incluye pedir por ellos y permitir que Dios transforme nuestra manera de acompañarlos.", "Oración", "Padre, protege sus caminos, forma su criterio y rodéalos de personas seguras. Danos paciencia para escuchar y humildad para corregir nuestros errores.", "Enséñanos a cuidar sin controlar y a ofrecer límites claros junto con un amor constante.", "/oraciones/oracion-por-la-familia"],
      ["oracion-al-comenzar-el-dia", "Oración para comenzar el día", "Una oración breve de gratitud, entrega y sabiduría para la jornada que comienza.", "El inicio del día ofrece una oportunidad para ordenar la atención antes de que las urgencias hablen más fuerte.", "Oración", "Señor, gracias por este nuevo día. Guía mis palabras, mis decisiones y el trabajo que tengo delante.", "Dame atención para las personas, serenidad ante lo inesperado y valentía para hacer lo correcto.", "/devocionales/comenzar-el-dia-con-dios"],
      ["oracion-antes-de-dormir", "Oración antes de dormir", "Una oración para revisar el día, agradecer, pedir perdón y entregar las preocupaciones de la noche.", "Dormir implica aceptar que el mundo continúa sin nuestro control. Podemos cerrar el día delante de Dios con verdad y descanso.", "Oración", "Padre, gracias por la gracia recibida hoy. Perdona mis palabras y acciones equivocadas; muéstrame qué debo reparar mañana.", "Te entrego lo que quedó incompleto. Guarda a quienes amo y concede descanso a mi mente y mi cuerpo.", "/devocionales/cuando-la-ansiedad-no-te-deja-descansar"],
      ["oracion-por-el-trabajo", "Oración por el trabajo y la provisión", "Una oración para pedir empleo, integridad, provisión y relaciones laborales justas.", "El trabajo toca dignidad, recursos y servicio. La incertidumbre laboral necesita oración y también apoyo práctico.", "Oración", "Dios proveedor, abre oportunidades honestas y dame constancia para buscarlas. Ayúdame a trabajar con integridad y a no medir todo mi valor por un puesto.", "Protege de la explotación, enséñame a administrar y muéstrame cómo apoyar a quien atraviesa necesidad.", "/devocionales/encontrar-proposito-en-lo-cotidiano"],
      ["oracion-por-proteccion", "Oración por protección", "Una oración equilibrada para pedir cuidado, prudencia y paz frente al miedo.", "Pedir protección no significa vivir obsesionados con cada peligro posible. Reconoce nuestra fragilidad y busca sabiduría.", "Oración", "Señor, guarda nuestros caminos y decisiones. Danos prudencia para reconocer riesgos y humildad para aceptar ayuda.", "Líbranos del miedo que paraliza y de la imprudencia que ignora límites. Haznos también instrumentos de seguridad para otros.", "/sermones/como-vencer-el-miedo-con-fe"],
      ["oracion-para-perdonar", "Oración para aprender a perdonar", "Una oración para entregar el resentimiento sin negar el daño ni abandonar límites sanos.", "Perdonar puede ser un proceso. No significa justificar, olvidar ni reconciliarse sin verdad y cambio.", "Oración", "Dios de misericordia, conoces la herida y sus consecuencias. Líbrame de la venganza y dame sabiduría para mantener límites responsables.", "Ayúdame a entregar esta deuda una vez más, buscar apoyo y caminar hacia la libertad sin fingir que nada ocurrió.", "/sermones/el-poder-del-perdon-cristiano"],
    ],
  },
  "personajes-biblicos": {
    category: "Personajes bíblicos",
    images: [
      "/images/personajes-biblicos/articles/david-goliat.webp",
      "/images/personajes-biblicos/articles/elias-desierto.webp",
      "/images/personajes-biblicos/articles/rut.webp",
    ],
    entries: [
      ["moises-historia-lecciones", "Moisés: historia y lecciones de liderazgo", "Un recorrido por el llamado, las dudas y el liderazgo de Moisés.", "Moisés pasa de príncipe a exiliado y de pastor a líder. Su historia combina encuentro con Dios, resistencia y aprendizaje.", "Un llamado acompañado", "Moisés presenta objeciones honestas. Dios responde con presencia, señales y la ayuda de Aarón.", "El liderazgo bíblico no elimina límites; aprende a delegar, escuchar y depender.", "/preguntas-biblicas/como-saber-voluntad-de-dios"],
      ["ester-historia-valentia", "Ester: historia, valentía y propósito", "Cómo Ester enfrentó una amenaza colectiva con prudencia, ayuno y valentía.", "Ester vive entre dos identidades y recibe una oportunidad peligrosa para intervenir a favor de su pueblo.", "Valentía preparada", "No actúa impulsivamente: escucha, convoca ayuno, prepara encuentros y escoge el momento para hablar.", "La valentía responsable combina propósito, comunidad y estrategia.", "/sermones/como-vencer-el-miedo-con-fe"],
      ["jose-historia-perdon", "José: historia de sufrimiento, propósito y perdón", "Lecciones de Génesis 37–50 sobre adversidad, poder y reconciliación.", "José atraviesa traición, esclavitud y prisión antes de recibir autoridad. El desenlace no hace insignificante el sufrimiento.", "Poder utilizado para preservar", "Cuando sus hermanos dependen de él, José posee capacidad de vengarse, pero escoge probar la verdad y preservar vida.", "El perdón puede incluir tiempo, lágrimas, límites y un proceso de reconocimiento.", "/sermones/el-poder-del-perdon-cristiano"],
      ["pedro-historia-restauracion", "Pedro: impulsividad, fracaso y restauración", "La transformación de Pedro desde su llamado hasta su liderazgo en la iglesia.", "Pedro habla y actúa con rapidez. Ama a Jesús sinceramente y, aun así, lo niega bajo presión.", "Restauración después del fracaso", "Jesús no ignora la negación. Pregunta tres veces por su amor y vuelve a confiarle responsabilidad.", "Un error grave requiere verdad, gracia y una nueva forma de caminar.", "/devocionales/volver-a-empezar-con-dios"],
      ["pablo-historia-conversion", "Pablo: conversión, misión y perseverancia", "La historia del perseguidor que se convirtió en apóstol y servidor del evangelio.", "Pablo perseguía a la iglesia convencido de actuar correctamente. Su encuentro con Jesús reorganiza identidad y misión.", "Convicción corregida", "La sinceridad no garantiza que una dirección sea correcta. Pablo necesita luz, comunidad y tiempo de formación.", "La gracia puede transformar incluso fortalezas mal orientadas en instrumentos de servicio.", "/estudios-biblicos/filipenses-4-ansiedad-y-paz"],
      ["maria-madre-jesus-historia", "María, madre de Jesús: fe y disponibilidad", "Qué enseñan los evangelios sobre la respuesta, el canto y la perseverancia de María.", "María recibe un anuncio que altera sus planes y la expone a incertidumbre. Su respuesta combina preguntas y disponibilidad.", "Fe que reflexiona", "Lucas dice que guardaba y meditaba los acontecimientos. Su fe no consiste en comprender todo inmediatamente.", "La disponibilidad madura pregunta, escucha y permanece incluso cuando el camino incluye dolor.", "/devocionales/dios-esta-contigo-en-los-cambios"],
      ["abraham-historia-fe", "Abraham: historia, promesa y fe", "Un recorrido por la confianza, los errores y la promesa en la vida de Abraham.", "Abraham sale sin conocer el destino completo. Su historia muestra confianza real junto a decisiones nacidas del miedo.", "Fe imperfecta", "La Biblia no idealiza cada acción de Abraham. Muestra cómo Dios permanece fiel mientras forma su carácter.", "Caminar por fe significa responder a la promesa, aprender de errores y continuar confiando.", "/diccionario-biblico/fe-significado-biblico"],
    ],
  },
  "preguntas-biblicas": {
    category: "Preguntas bíblicas",
    images: [
      "/images/preguntas-biblicas/articles/discernir-voluntad-dios.webp",
      "/images/preguntas-biblicas/articles/pregunta-ansiedad.webp",
      "/images/preguntas-biblicas/articles/quien-es-jesus.webp",
    ],
    entries: [
      ["por-que-permite-dios-sufrimiento", "¿Por qué permite Dios el sufrimiento?", "Una respuesta bíblica prudente que reconoce el misterio, la libertad, el dolor y la esperanza.", "La Biblia no ofrece una explicación única para cada sufrimiento. Rechaza respuestas simples que culpan automáticamente a quien padece.", "Dolor, presencia y esperanza", "Job cuestiona explicaciones fáciles; los salmos lamentan; Jesús llora y entra en el sufrimiento humano.", "La fe puede buscar causas responsables, aliviar dolor y esperar restauración sin fingir comprenderlo todo.", "/sermones/que-hacer-cuando-dios-parece-guardar-silencio"],
      ["como-empezar-leer-biblia", "¿Cómo empezar a leer la Biblia?", "Una ruta sencilla para escoger una traducción, comenzar por un libro y comprender el contexto.", "Empezar desde la primera página y avanzar sin orientación puede resultar difícil. La Biblia es una biblioteca con géneros y contextos distintos.", "Una ruta inicial", "Comienza con un evangelio, continúa con Hechos y combina la lectura con salmos y una introducción al contexto.", "Lee unidades completas, anota preguntas y evita construir conclusiones sobre un verso aislado.", "/estudios-biblicos/como-estudiar-biblia-contexto"],
      ["que-es-pecado-segun-biblia", "¿Qué es el pecado según la Biblia?", "Qué significa pecado, cómo afecta relaciones y por qué la gracia no lo minimiza.", "El pecado incluye acciones, motivaciones y estructuras que contradicen el amor y la justicia de Dios.", "Más que romper una regla", "Daña la relación con Dios, con otros, con nosotros mismos y con la creación.", "Reconocer pecado abre camino a confesión, perdón, reparación y transformación.", "/diccionario-biblico/gracia-significado-biblico"],
      ["como-perdonar-alguien-hizo-dano", "¿Cómo perdonar a alguien que me hizo daño?", "Pasos bíblicos y límites responsables para iniciar un proceso de perdón.", "Perdonar no significa llamar bueno al daño, olvidar lo ocurrido ni recuperar confianza inmediatamente.", "Perdón y límites", "La reconciliación requiere verdad y participación de ambas partes. La seguridad puede exigir distancia y ayuda especializada.", "Nombra el daño, busca apoyo, entrega la venganza y establece límites adecuados.", "/sermones/el-poder-del-perdon-cristiano"],
      ["que-pasa-despues-muerte", "¿Qué dice la Biblia sobre la vida después de la muerte?", "Una introducción a resurrección, juicio, esperanza y nueva creación.", "La esperanza cristiana no consiste principalmente en escapar de la creación, sino en resurrección y restauración bajo el gobierno de Dios.", "Resurrección y nueva creación", "El Nuevo Testamento centra la esperanza en la resurrección de Jesús y la promesa de que la muerte no tendrá la última palabra.", "El tema invita a vivir con esperanza, responsabilidad y consuelo, evitando especulación innecesaria.", "/preguntas-biblicas/quien-es-jesus-segun-biblia"],
      ["por-que-orar-si-dios-sabe-todo", "¿Por qué orar si Dios ya lo sabe todo?", "Cómo entender la oración como relación, participación y transformación.", "La oración no informa a Dios de datos desconocidos. Nos permite relacionarnos, expresar dependencia y alinear la vida con su voluntad.", "Orar cambia nuestra participación", "Jesús enseña que el Padre conoce las necesidades y, aun así, invita a pedir el pan cotidiano.", "La oración abre espacio para gratitud, confesión, petición y una respuesta activa.", "/oraciones"],
      ["como-saber-si-dios-me-escucha", "¿Cómo saber si Dios escucha mi oración?", "Qué enseñan los salmos y Jesús sobre oración, silencio y respuestas diferentes a lo esperado.", "No percibir una respuesta inmediata no demuestra que Dios ignore la oración. La Biblia contiene largos periodos de espera.", "Escucha no significa control", "Orar no garantiza que cada petición produzca el resultado exacto solicitado. Confiamos en el carácter de Dios mientras seguimos discerniendo.", "Ora con honestidad, permanece atento y recibe apoyo de la comunidad durante la espera.", "/devocionales/cuando-te-cuesta-orar"],
    ],
  },
  sermones: {
    category: "Vida cristiana",
    images: [
      "/images/sermones/articles/hijo-prodigo.webp",
      "/images/sermones/articles/perdon-cristiano.webp",
      "/images/sermones/articles/silencio-de-dios.webp",
    ],
    entries: [
      ["cuando-sientes-que-no-eres-suficiente", "Cuando sientes que no eres suficiente", "Un sermón sobre identidad, límites y la gracia que no depende de demostrar valor.", "La comparación y la exigencia pueden convertir cada tarea en un examen de nuestro valor. El evangelio comienza en otro lugar: somos recibidos por gracia.", "Valor recibido, no fabricado", "Pablo reconoce debilidad sin concluir que su vida carece de propósito. La gracia permite servir sin fingir autosuficiencia.", "Nombra la medida imposible que utilizas contigo y reemplázala por una responsabilidad concreta y humana.", "/diccionario-biblico/gracia-significado-biblico"],
      ["amar-enemigos-jesus", "Amar a los enemigos: una enseñanza difícil de Jesús", "Qué significa amar al enemigo sin justificar abuso ni abandonar la justicia.", "Jesús llama a romper el ciclo de odio y venganza. Este amor busca el bien sin negar la verdad.", "Amor con verdad y límites", "Amar no exige permanecer expuesto a violencia. Puede incluir distancia, denuncia y deseo de que la persona cambie.", "Ora por libertad del odio y decide una respuesta que no reproduzca el daño.", "/estudios-biblicos/sermon-del-monte-bienaventuranzas"],
      ["dios-en-medio-tormenta", "Dios en medio de la tormenta", "Un mensaje para encontrar presencia y dirección cuando la vida pierde estabilidad.", "Las tormentas bíblicas no siempre desaparecen inmediatamente. En ellas se revela qué sostiene nuestra confianza.", "Presencia antes que explicación", "Los discípulos descubren que Jesús está con ellos en la barca, aunque su temor interpreta el silencio como indiferencia.", "Atiende el peligro real, pide ayuda y recuerda que la crisis no define toda la historia.", "/versiculos/salmo-46-significado"],
      ["servir-sin-buscar-reconocimiento", "Servir sin buscar reconocimiento", "Un sermón sobre motivaciones, humildad y el valor de las acciones que nadie ve.", "La necesidad de aprobación puede mezclarse incluso con buenas acciones. Jesús invita a servir delante del Padre, no como espectáculo.", "El lugar secreto", "Mateo 6 relaciona generosidad, oración y ayuno con una motivación que no depende del aplauso.", "Realiza esta semana una acción buena que no anunciarás ni utilizarás para obtener una deuda emocional.", "/devocionales/encontrar-proposito-en-lo-cotidiano"],
      ["reconstruir-despues-fracaso", "Cómo reconstruir después de un fracaso", "Un mensaje sobre verdad, responsabilidad, gracia y nuevos comienzos.", "El fracaso puede producir vergüenza o defensividad. Reconstruir comienza cuando dejamos de proteger la imagen y atendemos la verdad.", "Gracia que asume responsabilidad", "Pedro recibe restauración, pero también una nueva llamada a cuidar. La gracia no borra el aprendizaje.", "Reconoce, pide perdón, repara lo posible y establece una práctica que reduzca la repetición.", "/personajes-biblicos/pedro-historia-restauracion"],
    ],
  },
  versiculos: {
    category: "Versículos",
    images: [
      "/images/versiculos/articles/salmo-46.webp",
      "/images/versiculos/articles/versiculos-ansiedad.webp",
      "/images/versiculos/articles/salmo-23.webp",
    ],
    entries: [
      ["versiculos-sobre-fe", "Versículos sobre la fe y la confianza", "Pasajes explicados para comprender qué significa confiar en Dios en situaciones reales.", "La fe bíblica no es negar los hechos. Descansa en el carácter de Dios y produce pasos responsables.", "Pasajes centrales", "Hebreos 11, Proverbios 3 y Marcos 9 muestran confianza, límites y una fe que también pide ayuda.", "Elige un pasaje, léelo en contexto y conviértelo en una oración y una acción.", "/diccionario-biblico/fe-significado-biblico"],
      ["versiculos-sobre-esperanza", "Versículos sobre esperanza para tiempos difíciles", "Textos bíblicos explicados para sostener la esperanza sin negar el dolor.", "La esperanza bíblica mira el sufrimiento con honestidad y afirma que no tendrá autoridad definitiva.", "Pasajes para esperar", "Romanos 8, Lamentaciones 3 y el Salmo 42 unen gemido, memoria y confianza.", "Escribe qué reconoce cada texto y qué promesa permite sostener.", "/diccionario-biblico/esperanza-significado-biblico"],
      ["versiculos-sobre-perdon", "Versículos sobre el perdón y la reconciliación", "Pasajes para comprender la gracia, el arrepentimiento y los límites del perdón.", "La Biblia relaciona el perdón recibido con una disposición a perdonar, sin minimizar la justicia.", "Gracia y verdad", "Efesios 4, Colosenses 3 y Mateo 18 deben leerse junto a llamados al arrepentimiento y la reparación.", "Pregunta qué deuda entregas, qué límite mantienes y qué conversación necesita verdad.", "/sermones/el-poder-del-perdon-cristiano"],
      ["versiculos-para-tomar-decisiones", "Versículos para tomar decisiones con sabiduría", "Pasajes explicados sobre consejo, prudencia, motivaciones y dirección.", "La Biblia no ofrece una señal específica para cada opción, pero forma un criterio capaz de decidir.", "Sabiduría para escoger", "Santiago 1 invita a pedir sabiduría; Proverbios valora el consejo y Filipenses orienta los pensamientos.", "Reúne información, escucha consejo y descarta cualquier opción contraria a principios claros.", "/preguntas-biblicas/como-saber-voluntad-de-dios"],
      ["versiculos-sobre-amor-de-dios", "Versículos sobre el amor de Dios", "Textos fundamentales para comprender iniciativa, fidelidad y transformación en el amor divino.", "El amor de Dios no es una idea sentimental aislada. Se expresa mediante pacto, presencia, entrega y restauración.", "Amor demostrado", "Juan 3, Romanos 5 y 1 Juan 4 presentan un amor que toma la iniciativa y transforma la manera de amar.", "Lee cada pasaje preguntando qué revela sobre Dios y qué respuesta produce hacia otras personas.", "/preguntas-biblicas/quien-es-jesus-segun-biblia"],
      ["versiculos-sobre-fortaleza", "Versículos sobre fortaleza y ánimo", "Pasajes para pedir fuerzas, reconocer límites y perseverar con ayuda.", "La fortaleza bíblica no exige autosuficiencia. Muchas veces comienza reconociendo debilidad y recibiendo apoyo.", "Fuerza recibida", "Isaías 40, 2 Corintios 12 y el Salmo 46 sitúan la fortaleza en Dios, no en una imagen invulnerable.", "Nombra tu límite y la ayuda concreta que necesitas recibir hoy.", "/devocionales/descansar-sin-sentir-culpa"],
      ["versiculos-sobre-gratitud", "Versículos sobre gratitud", "Pasajes para practicar agradecimiento de forma honesta en días buenos y difíciles.", "La gratitud bíblica recuerda dones y fidelidad sin obligarnos a negar pérdidas.", "Memoria agradecida", "Los salmos, Filipenses 4 y 1 Tesalonicenses 5 muestran gratitud dentro de comunidades con problemas reales.", "Anota tres regalos concretos y una dificultad que todavía presentarás con honestidad.", "/devocionales/agradecer-en-dias-dificiles"],
    ],
  },
};

function escapeYaml(value) {
  return JSON.stringify(value);
}

for (const [folder, config] of Object.entries(sections)) {
  const base = join("src", "content", folder);
  mkdirSync(base, { recursive: true });
  config.entries.forEach((entry, index) => {
    const [slug, title, description, intro, heading, explanation, practice, link] = entry;
    const path = join(base, `${slug}.md`);
    if (existsSync(path)) return;
    const image = config.images[index % config.images.length];
    const body = `---
title: ${escapeYaml(title)}
description: ${escapeYaml(description)}
image: ${escapeYaml(image)}
pubDate: ${date}
author: ${escapeYaml(author)}
category: ${escapeYaml(config.category)}
tags:
  - ${escapeYaml(title.split(":")[0].replace(/[¿?]/g, "").toLowerCase())}
  - ${escapeYaml(config.category.toLowerCase())}
  - "vida cristiana"
featured: false
readingTime: 6
---

${intro}

## ${heading}

${explanation}

## Cómo llevarlo a la práctica

${practice}

La aplicación bíblica no consiste en repetir una idea de manera abstracta. Requiere observar el contexto, examinar nuestras motivaciones y escoger una respuesta proporcionada. Algunas situaciones también necesitan consejo pastoral, profesional o médico; pedir esa ayuda no contradice la fe.

## Una pregunta para reflexionar

¿Qué parte de esta enseñanza necesitas convertir hoy en una conversación, una decisión o una práctica concreta?

## Para seguir profundizando

Continúa con esta [lectura relacionada](${link}) y compara ambos recursos. Anota una idea que se repite, una pregunta que permanece abierta y un paso que puedes dar durante esta semana.
`;
    writeFileSync(path, body, "utf8");
  });
}

console.log("Editorial library generated.");
