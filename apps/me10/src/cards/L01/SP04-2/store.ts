import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { atom } from 'recoil';

export const L01SCP0402 = atom<TL01SCP0402>({
  key: 'L01SCP0402',
  default: {
    P14: {
      answer: '',
      solution: 'Are',
      isCorrect: false,
      isSubmitted: false,
    },
    P16: {
      answer: '',
      solution: 'have',
      isCorrect: false,
      isSubmitted: false,
    },
    P18: {
      answer: '',
      solution: [`He doesn't like mint chocolate.`, `He does not like mint chocolate.`],
      isCorrect: false,
      isSubmitted: false,
    },
    P20: {
      chipButtonInfo: [
        {
          text: 'drinks',
        },
        {
          text: 'juice',
        },
        {
          text: 'Dad',
        },
        {
          text: 'orange',
        },
      ],
      solution: [
        {
          text: 'Dad',
        },
        {
          text: 'drinks',
        },
        {
          text: 'orange',
        },
        {
          text: 'juice',
        },
      ],
      clickedChipButtons: [],
      isSubmitted: false,
    },
  },
});

type TL01SCP0402 = {
  P14: TStringAnswer;
  P16: TStringAnswer;
  P18: TStringAnswer;
  P20: IL01SP0402P20;
};

type TStringAnswer = {
  answer: string;
  solution: string | string[];
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IL01SP0402P20 {
  solution: IChipButtonInfo[];
  chipButtonInfo: IChipButtonInfo[];
  clickedChipButtons: number[];
  isSubmitted: boolean;
}
