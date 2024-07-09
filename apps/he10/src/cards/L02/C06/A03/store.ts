import { atom } from 'recoil';
import { IQuestion, IDialog } from '@maidt-cntn/pages/HE1-L02-C06-A03-P02';

export const L02C06A03 = atom<TL02C06A03>({
  key: 'L02C06A03',
  default: {
    p02: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'following a particular rule or standard' },
        { text: 'to hold someone tightly, or accept an idea completely' },
        { text: 'a device that is inserted into the body through a medical operation' },
      ],
      question: { questionText: 'Nani Tama must go to Murupara', questionPosition: 'after' },
      dialog: {
        dialogText:
          'The phone rang, and it was my dad calling from my hometown, Waituhi. “Can you take a week off?” he asked. “Your Nani Tama wants you here.” “But Dad!” I answered. “My boss won’t let me take any more time off.” The phone went silent, and then I heard my grandfather say faintly, “I need your help, Grandson. I must go to Murupara to f inish the whakapapa. Drive me there. Hurry, I may not have much time.” I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll  come.”',
        dialogTitle: 'Gathering of the Whakapapa (1)',
      },
    },
  },
});

type TL02C06A03 = {
  p02: IL02C06A03;
};

interface IL02C06A03 {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
  data: { text: string }[];
  question: IQuestion;
  dialog: IDialog;
}
