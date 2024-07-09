import { atom } from 'recoil';

export const L03C06A06b = atom<TL03C06A06b>({
  key: 'L03C06A06b',
  default: {
    p02: {
      dropArr: [
        ['disturb', 'improve', 'increase'],
        ['canceling', 'predicting', 'eliminating'],
      ],
      answer: ['', ''],
      solution: ['improve', 'eliminating'],
      isCorrect: false,
      isSubmitted: false,
      content:
        'Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket offices at tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise. These noise-cancelling headsets help drive-through employees take orders accurately. The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise. Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.',
    },
  },
});

type TL03C06A06b = {
  p02: IL03C06A06b;
};

interface IL03C06A06b {
  dropArr: [string[], string[]];
  answer: (string | undefined)[];
  solution: string[];
  isCorrect: boolean;
  isSubmitted: boolean;
  content: string;
}
