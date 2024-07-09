import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L03C03A03 = atom<TL03C03A03>({
  key: 'L03C03A03',
  default: {
    p01: {
      isSubmitted: false,
      isDoneRecord1: false,
      isDoneRecord2: false,
      isDoneRecord3: false,
      isDoneRecord4: false,
      audioData: [{}, {}, {}, {}],
    },
    p02: {
      isSubmitted: false,
      isDoneRecord1: false,
      answer: ['', ''],
      audioData: [{}],
    },
    p03: {
      isSubmitted: false,
      isDoneRecord1: false,
      isDoneRecord2: false,
      isDoneAudio1: false,
      isDoneAudio2: false,
      answer: ['', ''],
      audioData: [{}, {}],
    },
  },
});

type TL03C03A03 = {
  p01: {
    isSubmitted: boolean;
    isDoneRecord1: boolean;
    isDoneRecord2: boolean;
    isDoneRecord3: boolean;
    isDoneRecord4: boolean;
    audioData: IAudioData[];
  };
  p02: {
    isSubmitted: boolean;
    answer: string[];
    isDoneRecord1: boolean;
    audioData: IAudioData[];
  };
  p03: {
    isSubmitted: boolean;
    answer: string[];
    isDoneRecord1: boolean;
    isDoneRecord2: boolean;
    isDoneAudio1: boolean;
    isDoneAudio2: boolean;
    audioData: IAudioData[];
  };
};
