import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L04SP02Recorder = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
}>({
  key: 'L04SP02Recorder',
  default: {

    p09: {
      isSubmitted: false,

      audioData: {},
    },
    p10: {
      isSubmitted: false,

      audioData: {},
    },
    p11: {
      isSubmitted: false,

      audioData: {},
    },
    p12: {
      isSubmitted: false,

      audioData: {},
    },


  },
});

export const L04SP02 = atom<TL04SP02>({
  key: 'L04SP02',
  default: {
  p13: {
    answer: undefined,
    isCorrect: false,
    isSubmitted: false,
  },
}
});

type TL04SP02 = {
  p13: {
    answer: number | undefined;
    isCorrect: boolean;
    isSubmitted: boolean;
  };

}
