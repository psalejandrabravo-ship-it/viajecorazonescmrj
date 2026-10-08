import type { Option, Situacion } from "@/types/game";

const S = "/assets/illustrations/scenes";
const C = "/assets/illustrations/cards";
const N = "/assets/illustrations/situaciones";

/**
 * Situaciones 1, 2, 3 y 9 usan ilustraciones originales que coinciden con el relato.
 * El resto tiene ilustraciones nuevas hechas para cada historia (libros, vaso, pelota, etc.).
 */
export const SITUACIONES: Situacion[] = [
  {
    id: 1,
    titulo: "Empatía - Niño nuevo",
    mecanica: "seleccionar_lamina_3",
    ilustracion: `${S}/mundo1_situacion1_escena1.jpg`,
    ilustracionAlt: "Mateo está parado solo en el patio mientras los demás niños juegan.",
    pregunta: "Mateo es nuevo en el colegio y está solito. ¿Cómo lo podríamos ayudar?",
    opciones: [
      {
        id: "a",
        imagen: `${C}/mundo1_situacion1_opcionA.jpg`,
        texto: "Invitarlo a jugar con nosotros",
        correcta: true,
        alt: "Los niños invitan a Mateo a jugar.",
        feedback: "¡Muy bien! Invitar a Mateo es la mejor manera de ayudarlo.",
        explicacion:
          "Cuando alguien está solo, lo mejor es invitarlo a jugar. Esto se llama EMPATÍA: ponernos en el lugar del otro. Mateo se sentirá feliz y bienvenido.",
      },
      {
        id: "b",
        imagen: `${C}/mundo1_situacion1_opcionB.jpg`,
        texto: "Ignorarlo y seguir jugando",
        correcta: false,
        alt: "El grupo sigue jugando sin Mateo.",
        feedback: "Mmm... esa no es la mejor opción.",
        explicacion:
          "Si ignoramos a Mateo, él se sentirá más solo y triste. Imaginen cómo se sentirían ustedes si nadie les hablara en un lugar nuevo. Todos necesitamos sentirnos bienvenidos.",
      },
      {
        id: "c",
        imagen: `${C}/mundo1_situacion1_opcionC.jpg`,
        texto: "Reírnos de él porque es nuevo",
        correcta: false,
        alt: "Niños se ríen de Mateo.",
        feedback: "No, eso no está bien.",
        explicacion:
          "Reírse de alguien que está triste es muy malo. Eso se llama BULLYING. Todos merecemos ser tratados con RESPETO. Ser nuevo no es algo malo.",
      },
    ],
    guion: {
      narracion:
        "Mateo es nuevo en el colegio. Es su primer día y no conoce a nadie. Está parado solo en el patio mientras los demás niños juegan. Se ve triste y un poco asustado. Camila lo ve desde lejos y piensa qué podría hacer para ayudarlo.",
      preguntas: [
        "¿Cómo creen que se siente Mateo?",
        "¿Alguna vez se han sentido así?",
        "¿Qué ven en la cara de Mateo que les dice que está triste?",
        "¿Qué está haciendo Camila?",
        "¿Qué podríamos hacer para ayudar a Mateo?",
      ],
    },
  },
  {
    id: 2,
    titulo: "Compartir",
    mecanica: "si_no",
    ilustracion: `${S}/mundo1_situacion4_escena1.jpg`,
    ilustracionAlt: "Valentina juega con un auto rojo. Tomás se acerca con interés.",
    pregunta:
      "Tomás quiere jugar con el auto de Valentina. Valentina se lo presta con gusto. ¿Estuvo bien lo que hizo Valentina?",
    opciones: [
      {
        id: "si",
        texto: "SÍ estuvo bien",
        correcta: true,
        feedback: "¡Excelente! Compartir es muy importante.",
        explicacion:
          "Valentina fue generosa. Cuando compartimos, todos pueden jugar y divertirse. Además, cuando compartimos, los demás también comparten con nosotros.",
      },
      {
        id: "no",
        texto: "NO estuvo bien",
        correcta: false,
        feedback: "No es así. Veamos por qué...",
        explicacion:
          "Compartir SÍ estuvo bien. Cuando compartimos, no perdemos nada, ganamos amigos. Si nunca compartiéramos, nadie querría jugar con nosotros.",
      },
    ],
    guion: {
      narracion:
        "Tomás quiere jugar con el auto de juguete de Valentina. Es un auto rojo muy bonito que a Valentina le gusta mucho. Tomás se lo pide con amabilidad: '¿Me prestas tu auto, por favor?'. Valentina piensa un momento y decide prestárselo con una sonrisa.",
      preguntas: [
        "¿Estuvo bien lo que hizo Valentina?",
        "¿Por qué creen que compartir es importante?",
        "¿Cómo se siente Tomás ahora?",
        "¿Ustedes comparten sus juguetes?",
      ],
    },
  },
  {
    id: 3,
    titulo: "Identificar tristeza",
    mecanica: "identificar_emocion_4",
    ilustracion: `${S}/mundo3_situacion1_escena.jpg`,
    ilustracionAlt: "Martín mira su mochila vacía mientras los demás comen.",
    pregunta: "Martín olvidó su almuerzo. Todos tienen comida menos él. ¿Cómo se siente Martín?",
    opciones: [
      {
        id: "feliz",
        emoji: "😊",
        texto: "FELIZ",
        correcta: false,
        feedback: "No, Martín no está feliz.",
        explicacion:
          "Cuando estamos felices, sonreímos y reímos. Martín está triste porque no tiene almuerzo. Miren su cara: ¿ven una sonrisa? No.",
      },
      {
        id: "triste",
        emoji: "😢",
        texto: "TRISTE",
        correcta: true,
        feedback: "¡Muy bien! Martín está triste.",
        explicacion:
          "Martín se siente TRISTE porque olvidó su almuerzo. Podemos reconocer la tristeza viendo su cara: boca hacia abajo, ojos llorosos. Cuando alguien está triste, podemos ayudarlo compartiendo o avisando a un adulto.",
      },
      {
        id: "asustado",
        emoji: "😨",
        texto: "ASUSTADO",
        correcta: false,
        feedback: "No exactamente. Veamos...",
        explicacion:
          "Martín no está asustado, está triste. El MIEDO es cuando algo nos da susto. Martín tiene hambre y se siente mal. Es diferente.",
      },
      {
        id: "enojado",
        emoji: "😠",
        texto: "ENOJADO",
        correcta: false,
        feedback: "No, no está enojado.",
        explicacion:
          "Martín no está enojado, está triste. El ENOJO es cuando algo nos molesta mucho. Martín está triste porque olvidó su comida. Son emociones diferentes.",
      },
    ],
    guion: {
      narracion:
        "Martín olvidó su almuerzo en casa. Todos sus compañeros tienen comida rica y están comiendo felices en la mesa. Martín mira su mochila vacía y se siente muy triste. Tiene hambre y no sabe qué hacer. Su cara muestra que está a punto de llorar.",
      preguntas: [
        "¿Cómo se siente Martín?",
        "¿Por qué está triste?",
        "¿Qué podríamos hacer para ayudarlo?",
        "¿Alguna vez han olvidado algo importante?",
        "¿Cómo se sintieron en ese momento?",
      ],
    },
  },
  {
    id: 4,
    titulo: "Ayudar a un compañero",
    mecanica: "seleccionar_lamina_3",
    ilustracion: `${N}/sit-04.jpg`,
    ilustracionAlt: "Sofía intenta llevar una torre de libros y se tambalea. Lucas la observa.",
    pregunta: "Sofía está llevando muchos libros pesados. ¿Cómo podría ayudar Lucas?",
    opciones: [
      {
        id: "a",
        imagen: `${N}/sit-04-a.jpg`,
        texto: "Ayudarla a llevar los libros",
        correcta: true,
        alt: "Lucas ayuda a Sofía a llevar los libros.",
        feedback: "¡Perfecto! Ayudar es lo correcto.",
        explicacion:
          "Cuando vemos que alguien necesita ayuda, debemos hacerlo. Sofía necesita ayuda porque los libros son pesados. Ayudar a los demás nos hace sentir bien.",
      },
      {
        id: "b",
        imagen: `${N}/sit-04-b.jpg`,
        texto: "Seguir jugando sin ayudar",
        correcta: false,
        alt: "Lucas sigue jugando y no ayuda.",
        feedback: "Esa no es la mejor opción.",
        explicacion:
          "Si Lucas no ayuda, Sofía podría dejar caer los libros y lastimarse. Imaginen si ustedes necesitaran ayuda y nadie los ayudara.",
      },
      {
        id: "c",
        imagen: `${N}/sit-04-c.jpg`,
        texto: "Reírse porque se le van a caer",
        correcta: false,
        alt: "Niños se ríen mientras se caen los libros.",
        feedback: "No, eso está muy mal.",
        explicacion:
          "Reírse de los problemas de otros es cruel. Sofía necesita ayuda, no burlas. Debemos ser SOLIDARIOS. Las burlas lastiman los sentimientos.",
      },
    ],
    guion: {
      narracion:
        "Sofía está tratando de llevar una torre de libros muy alta a la biblioteca. Los libros son pesados y ella es pequeña. Se tambalea y parece que los libros se van a caer en cualquier momento. Lucas ve la situación desde su mesa.",
      preguntas: [
        "¿Qué problema tiene Sofía?",
        "¿Qué podría hacer Lucas?",
        "¿Por qué es importante ayudar a los demás?",
        "¿Cuándo han ayudado ustedes a alguien?",
      ],
    },
  },
  {
    id: 5,
    titulo: "Decir la verdad",
    mecanica: "si_no",
    ilustracion: `${N}/sit-05.jpg`,
    ilustracionAlt: "Diego mira un vaso de vidrio que se rompió en el suelo de la sala.",
    pregunta:
      "Diego rompió un vaso sin querer. Nadie lo vio. La profesora pregunta quién fue. ¿Debe Diego decir la verdad?",
    opciones: [
      {
        id: "si",
        texto: "SÍ debe decir la verdad",
        correcta: true,
        feedback: "¡Muy bien! Decir la verdad es importante.",
        explicacion:
          "Diego debe decir la verdad aunque tenga miedo. Fue un accidente y la profesora entenderá. Cuando decimos la verdad, mostramos VALENTÍA y RESPONSABILIDAD.",
      },
      {
        id: "no",
        texto: "NO, mejor quedarse callado",
        correcta: false,
        feedback: "No, esa no es la mejor decisión.",
        explicacion:
          "Quedarse callado es como mentir. Alguien más podría ser culpado. Diego se sentirá mal por no haber sido honesto. La verdad siempre es mejor.",
      },
    ],
    guion: {
      narracion:
        "Durante el recreo, Diego accidentalmente rompe un vaso de vidrio en la sala. Nadie lo vio. La profesora entra y pregunta: '¿Quién rompió el vaso?'. Diego siente miedo pero sabe que debe decir la verdad.",
      preguntas: [
        "¿Qué debe hacer Diego?",
        "¿Por qué es importante decir la verdad?",
        "¿Cómo se siente Diego en este momento?",
        "¿Qué pasaría si Diego miente?",
        "¿Alguna vez han tenido que decir la verdad sobre algo difícil?",
      ],
    },
  },
  {
    id: 6,
    titulo: "Inclusión en juego",
    mecanica: "seleccionar_lamina_3",
    ilustracion: `${N}/sit-06.jpg`,
    ilustracionAlt: "Ana se acerca al grupo que juega a la pelota y espera una respuesta.",
    pregunta: "Ana quiere jugar a la pelota con el grupo. ¿Qué deberían hacer los niños?",
    opciones: [
      {
        id: "a",
        imagen: `${N}/sit-06-a.jpg`,
        texto: "Dejarla jugar con ellos",
        correcta: true,
        alt: "El grupo deja jugar a Ana con la pelota.",
        feedback: "¡Excelente! Incluir a todos es importante.",
        explicacion:
          "Cuando alguien quiere jugar, debemos dejarlo participar. La INCLUSIÓN significa que todos pueden jugar juntos. Ana se sentirá feliz y bienvenida.",
      },
      {
        id: "b",
        imagen: `${N}/sit-06-b.jpg`,
        texto: "Decirle que no puede jugar",
        correcta: false,
        alt: "El grupo le dice a Ana que no puede jugar.",
        feedback: "No, eso no está bien.",
        explicacion:
          "Decirle a Ana que no puede jugar la hará sentir muy triste. Todos tenemos derecho a jugar. Imaginen cómo se sentirían si no los dejaran jugar.",
      },
      {
        id: "c",
        imagen: `${N}/sit-06-c.jpg`,
        texto: "Irse a otro lugar para que no juegue",
        correcta: false,
        alt: "El grupo se va con la pelota y deja a Ana sola.",
        feedback: "Esa es una mala decisión.",
        explicacion:
          "Irse solo para que Ana no juegue es muy cruel. Es una forma de RECHAZO. Todos merecemos ser incluidos y tener amigos.",
      },
    ],
    guion: {
      narracion:
        "Un grupo de niños está jugando a la pelota en el patio. Ana se acerca y pregunta: '¿Puedo jugar con ustedes?'. Los niños se miran entre sí. Ana espera con esperanza una respuesta.",
      preguntas: [
        "¿Qué deberían responder los niños?",
        "¿Cómo se siente Ana esperando la respuesta?",
        "¿Por qué es importante incluir a todos?",
        "¿Alguna vez los han dejado fuera de un juego? ¿Cómo se sintieron?",
      ],
    },
  },
  {
    id: 7,
    titulo: "Identificar miedo",
    mecanica: "identificar_emocion_4",
    ilustracion: `${N}/sit-07.jpg`,
    ilustracionAlt: "Pablo está en la puerta de la sala nueva, tenso, sin querer entrar.",
    pregunta: "Es el primer día de clases. Pablo no quiere entrar a la sala nueva. ¿Cómo se siente Pablo?",
    opciones: [
      {
        id: "feliz",
        emoji: "😊",
        texto: "FELIZ",
        correcta: false,
        feedback: "No, Pablo no está feliz.",
        explicacion:
          "Cuando estamos felices, sonreímos y nos relajamos. Pablo está tenso y no quiere entrar. Eso nos dice que algo le preocupa.",
      },
      {
        id: "triste",
        emoji: "😢",
        texto: "TRISTE",
        correcta: false,
        feedback: "No exactamente.",
        explicacion:
          "Pablo no está triste, está asustado. La TRISTEZA es diferente al MIEDO. Pablo tiene miedo de algo nuevo, no está triste.",
      },
      {
        id: "asustado",
        emoji: "😨",
        texto: "ASUSTADO",
        correcta: true,
        feedback: "¡Correcto! Pablo tiene miedo.",
        explicacion:
          "Pablo se siente ASUSTADO. El miedo es normal cuando enfrentamos algo nuevo. Podemos ver el miedo: manos apretadas, ojos grandes. Cuando alguien tiene miedo, podemos ayudarlo tomándolo de la mano o diciéndole palabras amables.",
      },
      {
        id: "enojado",
        emoji: "😠",
        texto: "ENOJADO",
        correcta: false,
        feedback: "No, no está enojado.",
        explicacion:
          "Pablo no está enojado, está asustado. El ENOJO se ve diferente: cara roja, ceño fruncido. Pablo está asustado porque todo es nuevo.",
      },
    ],
    guion: {
      narracion:
        "Es el primer día de clases después de vacaciones. Pablo está en la puerta de la sala nueva, con una profesora que no conoce. Sus manos están apretadas, sus ojos están muy abiertos y su cuerpo está tenso. No quiere entrar.",
      preguntas: [
        "¿Cómo se siente Pablo?",
        "¿Qué cosas le dan miedo?",
        "¿Qué podemos hacer cuando sentimos miedo?",
        "¿Ustedes han sentido miedo alguna vez?",
        "¿Quién los ayudó a sentirse mejor?",
      ],
    },
  },
  {
    id: 8,
    titulo: "Respetar turnos",
    mecanica: "si_no",
    ilustracion: `${N}/sit-08.jpg`,
    ilustracionAlt: "Hay una fila para el tobogán. Martina se salta y se sube primero.",
    pregunta: "Hay una fila para el tobogán. Martina se salta la fila y se sube primero. ¿Estuvo bien lo que hizo Martina?",
    opciones: [
      {
        id: "si",
        texto: "SÍ estuvo bien",
        correcta: false,
        feedback: "No, eso no está bien.",
        explicacion:
          "NO estuvo bien. Imaginen si todos se saltaran la fila: habría peleas. Martina debe ir al final y esperar como todos. Eso es justo.",
      },
      {
        id: "no",
        texto: "NO estuvo bien",
        correcta: true,
        feedback: "¡Correcto! No estuvo bien saltarse la fila.",
        explicacion:
          "Saltarse la fila es IRRESPETUOSO. Todos estaban esperando su turno. RESPETAR LOS TURNOS es importante para convivir bien.",
      },
    ],
    guion: {
      narracion:
        "En la fila para el tobogán, hay muchos niños esperando su turno. Cada uno espera pacientemente. De repente, Martina se salta la fila y se sube al tobogán sin esperar.",
      preguntas: [
        "¿Estuvo bien lo que hizo Martina?",
        "¿Por qué es importante respetar los turnos?",
        "¿Cómo se sienten los otros niños?",
        "¿Qué debería hacer Martina?",
      ],
    },
  },
  {
    id: 9,
    titulo: "Consolar a alguien",
    mecanica: "seleccionar_lamina_3",
    ilustracion: `${S}/mundo1_situacion2_escena2.jpg`,
    ilustracionAlt: "Carolina está en el suelo, con la rodilla raspada, llorando.",
    pregunta: "Carolina se cayó y está llorando. ¿Qué podrían hacer sus amigos?",
    opciones: [
      {
        id: "a",
        imagen: `${C}/mundo1_situacion2_opcionA.jpg`,
        texto: "Acercarse y consolarla",
        correcta: true,
        alt: "Emma se acerca y consuela a Carolina.",
        feedback: "¡Muy bien! Es importante ser buenos amigos.",
        explicacion:
          "Cuando alguien se lastima, necesita ayuda y cariño. Pueden acercarse, ayudarla a levantarse, o llamar a un adulto. Eso es ser EMPÁTICO.",
      },
      {
        id: "b",
        imagen: `${C}/mundo1_situacion2_opcionB.jpg`,
        texto: "Ignorarla y seguir jugando",
        correcta: false,
        alt: "Siguen jugando sin ayudar.",
        feedback: "Esa no es la mejor opción.",
        explicacion:
          "Si la ignoran, Carolina se sentirá sola además de lastimada. Cuando alguien necesita ayuda, no debemos ignorarlo.",
      },
      {
        id: "c",
        imagen: `${C}/mundo1_situacion2_opcionC.jpg`,
        texto: "Reírse porque se cayó",
        correcta: false,
        alt: "Niños se ríen de la caída.",
        feedback: "No, eso está muy mal.",
        explicacion:
          "Reírse de alguien que se lastimó es cruel. Carolina está llorando. Nunca debemos reírnos del dolor de otros. Debemos ser COMPASIVOS.",
      },
    ],
    guion: {
      narracion:
        "Carolina se cayó en el patio y se raspó la rodilla. Está llorando sentada en el suelo. Le duele mucho y tiene un poco de sangre.",
      preguntas: [
        "¿Cómo se siente Carolina?",
        "¿Qué podrían hacer sus amigos?",
        "¿Qué palabras podría decirle para que se sienta mejor?",
        "¿Alguna vez han consolado a un amigo?",
        "¿Cómo se sintieron al ayudar?",
      ],
    },
  },
  {
    id: 10,
    titulo: "Identificar enojo",
    mecanica: "identificar_emocion_4",
    ilustracion: `${N}/sit-10.jpg`,
    ilustracionAlt: "Benjamín tiene los puños apretados frente a su torre de bloques derrumbada.",
    pregunta: "Benjamín construyó una torre alta. Otro niño la derrumbó sin querer. ¿Cómo se siente Benjamín?",
    opciones: [
      {
        id: "feliz",
        emoji: "😊",
        texto: "FELIZ",
        correcta: false,
        feedback: "No, Benjamín no está feliz.",
        explicacion:
          "Su torre fue destruida después de mucho trabajo. Benjamín tiene el ceño fruncido y los puños apretados. Eso nos dice que está molesto.",
      },
      {
        id: "triste",
        emoji: "😢",
        texto: "TRISTE",
        correcta: false,
        feedback: "No exactamente.",
        explicacion:
          "Benjamín no está triste, está enojado. La TRISTEZA es diferente: queremos llorar. El ENOJO tiene más energía: queremos gritar.",
      },
      {
        id: "asustado",
        emoji: "😨",
        texto: "ASUSTADO",
        correcta: false,
        feedback: "No, no tiene miedo.",
        explicacion:
          "Benjamín no está asustado, está enojado. El MIEDO es cuando queremos escapar. Benjamín está MOLESTO porque su torre fue destruida.",
      },
      {
        id: "enojado",
        emoji: "😠",
        texto: "ENOJADO",
        correcta: true,
        feedback: "¡Correcto! Benjamín está enojado.",
        explicacion:
          "Benjamín se siente ENOJADO porque destruyeron su torre. Podemos ver el enojo: puños apretados, cara roja. Está bien sentir enojo, pero debemos hablar sobre lo ocurrido e intentar tranquilizarnos: respirar profundo, contar hasta 10, hablar de lo que sentimos.",
      },
    ],
    guion: {
      narracion:
        "Benjamín estaba construyendo una torre muy alta con bloques. Le tomó mucho tiempo hacerla. De repente, otro niño pasa corriendo y sin querer la derrumba toda. Benjamín tiene los puños apretados, su cara está roja y está frunciendo el ceño.",
      preguntas: [
        "¿Cómo se siente Benjamín?",
        "¿Por qué se siente así?",
        "¿Qué puede hacer cuando está enojado?",
        "¿Está bien sentir enojo?",
        "¿Qué hacen ustedes cuando se enojan?",
      ],
    },
  },
  {
    id: 11,
    titulo: "Pedir disculpas",
    mecanica: "si_no",
    ilustracion: `${N}/sit-11.jpg`,
    ilustracionAlt: "Felipe está en el suelo después de que Tomás lo empujó sin querer.",
    pregunta: "Tomás empujó a Felipe sin querer y Felipe se cayó. ¿Debe Tomás pedir disculpas?",
    opciones: [
      {
        id: "si",
        texto: "SÍ debe pedir disculpas",
        correcta: true,
        feedback: "¡Muy bien! Pedir disculpas es importante.",
        explicacion:
          "Tomás debe PEDIR DISCULPAS aunque haya sido sin querer. Esto muestra RESPONSABILIDAD. Felipe se sentirá mejor y su amistad se mantendrá.",
      },
      {
        id: "no",
        texto: "NO, no fue su culpa",
        correcta: false,
        feedback: "No es así. Veamos por qué...",
        explicacion:
          "Aunque fue sin querer, Tomás SÍ debe pedir disculpas. Felipe se lastimó. Si no pide perdón, Felipe podría enojarse y su amistad se dañaría.",
      },
    ],
    guion: {
      narracion:
        "Durante el juego, Tomás empuja a Felipe sin querer y Felipe se cae. Felipe se pone a llorar porque le dolió. Tomás se da cuenta de que hizo algo malo, aunque no fue a propósito.",
      preguntas: [
        "¿Qué debe hacer Tomás?",
        "¿Por qué es importante pedir disculpas?",
        "¿Cómo se sentirá Felipe si Tomás le pide disculpas?",
        "¿Alguna vez han tenido que pedir disculpas?",
      ],
    },
  },
  {
    id: 12,
    titulo: "Celebrar logros juntos",
    mecanica: "seleccionar_lamina_3",
    ilustracion: `${N}/sit-12.jpg`,
    ilustracionAlt: "Valentina está orgullosa porque se ató los zapatos sola. Sus compañeros la miran.",
    pregunta: "Valentina logró atarse los zapatos sola por primera vez. ¿Qué podemos hacer para que se sienta bien?",
    opciones: [
      {
        id: "a",
        imagen: `${N}/sit-12-a.jpg`,
        texto: "Aplaudir y felicitarla",
        correcta: true,
        alt: "Los compañeros aplauden y felicitan a Valentina.",
        feedback: "¡Excelente! Celebrar los logros es hermoso.",
        explicacion:
          "Cuando alguien logra algo difícil, debemos alegrarnos. Aplaudir hace que Valentina se sienta orgullosa. Celebrar los logros muestra que somos buenos amigos.",
      },
      {
        id: "b",
        imagen: `${N}/sit-12-b.jpg`,
        texto: "Ignorarla porque es algo simple",
        correcta: false,
        alt: "Los compañeros la ignoran.",
        feedback: "No, esa no es una buena actitud.",
        explicacion:
          "Para Valentina fue muy difícil. Si ignoramos sus logros, se sentirá triste. Debemos RECONOCER y CELEBRAR los esfuerzos de los demás.",
      },
      {
        id: "c",
        imagen: `${N}/sit-12-c.jpg`,
        texto: "Burlarse porque tardó mucho",
        correcta: false,
        alt: "Los compañeros se burlan.",
        feedback: "No, eso está muy mal.",
        explicacion:
          "Burlarse es cruel. Ella hizo su mejor esfuerzo. Las burlas lastiman mucho. Debemos ser RESPETUOSOS y ALENTADORES, no burlarnos.",
      },
    ],
    guion: {
      narracion:
        "Valentina logró atarse los zapatos sola por primera vez. Está muy orgullosa y feliz. Todos sus compañeros la están mirando. Es un momento especial para Valentina.",
      preguntas: [
        "¿Cómo se siente Valentina?",
        "¿Qué podemos hacer para celebrar con ella?",
        "¿Por qué es importante celebrar los logros de los demás?",
        "¿Alguna vez han logrado algo difícil?",
        "¿Cómo se sintieron cuando lo lograron?",
      ],
    },
  },
];

export const TOTAL_SITUACIONES = SITUACIONES.length;

export function getSituacion(id: number): Situacion | undefined {
  return SITUACIONES.find((s) => s.id === id);
}

export function correctOption(sit: Situacion): Option | undefined {
  return sit.opciones.find((o) => o.correcta);
}

export function optionById(sit: Situacion, id: string | null): Option | undefined {
  if (!id) return undefined;
  return sit.opciones.find((o) => o.id === id);
}

export function feedbackSpeech(option: Option): string {
  return `${option.feedback} ${option.explicacion}`;
}
