import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

const L03SP02State = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: number;
    isCorrect?: boolean;
  };
}>({
  key: 'L03SP02State',
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
    p13: {
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export default L03SP02State;
