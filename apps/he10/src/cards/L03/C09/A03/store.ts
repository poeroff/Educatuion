import { atom } from 'recoil';

export const L03C09A03 = atom({
  key: 'L03C09A03',
  default: {
    p01: {
      answer: '',
      solution: 'ice',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answers: ['', '', ''],
      solutions: ['freezer', 'upside down', 'pour'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'rise',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'cold',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: `I’m going to introduce a fun experiment called
        “Instant Tower of Ice.” This experiment aims to see if
        water can be turned into ice instantly. The materials
        needed are a bottle of water, a freezer, a glass, and
        an ice cube. Here’s the procedure: First, put a water
        bottle in the freezer for about two hours, but take
        it out before it is completely frozen. Be careful. Only
        if you do not shake the bottle will the experiment
        work properly. Next, turn a glass upside down and
        place an ice cube on top. Finally, slowly pour the
        water over the ice cube. Then, you will observe
        the ice tower rising instantly. That’s because when
        very cold water meets ice, the ice can speed up the
        freezing process. It will be amazing for you to see
        the instant ice tower rising in this experiment!
        `,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: ['', '', '', ''],
      isCorrect: false,
      isSubmitted: false,
    },
    examples: ['cold', 'freezer', 'ice', 'pour', 'rise', 'upside down'],
  },
});
