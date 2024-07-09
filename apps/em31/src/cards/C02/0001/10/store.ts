import { atom } from 'recoil';

export const C02000110_store = atom({
  key: 'C02000110',
  default: {
    p01: {
      answers: [
        {
          diagramId: '',
          exampleId: '',
        },
        {
          diagramId: '',
          exampleId: '',
        },
      ],
      solutions: [
        { diagramId: 'rectangle', exampleId: '사각형' },
        { diagramId: 'triangle', exampleId: '삼각형' },
      ],
      isCorrectInput: [false, false],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TConnectResult = {
  diagramId: string;
  exampleId: string;
};
