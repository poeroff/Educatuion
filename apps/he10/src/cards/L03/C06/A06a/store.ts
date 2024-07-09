import { atom } from 'recoil';

export const L03C06A06a = atom<TL03C06A06a>({
  key: 'L03C06A06a',
  default: {
    p02: {
      userAnswer: '',
      isSubmitted: false,
      solution: 'They do it by eliminating vehicle noise.',
      content:
        'Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket offices at tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise. These noise-cancelling headsets help drive-through employees take orders accurately. The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise. Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.',
    },
  },
});

type TL03C06A06a = {
  p02: {
    userAnswer: string;
    isSubmitted: boolean;
    solution: string;
    content: string;
  };
};
