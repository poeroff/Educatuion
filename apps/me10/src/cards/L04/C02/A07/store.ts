import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C02A07 = atom<TL04C02A07>({
  key: 'L04C02A07',
  default: {
    p01: {
      isSubmitted: false,
      audioData: { 1: {} },
      isRecordDone: [true],
      isAudioPlayed: [false],
    },
    p02: {
      isSubmitted: false,
      audioData: { 1: {} },
      isRecordDone: [true],
      isAudioPlayed: [false],
    },
  },
});

type TL04C02A07 = {
  [key: string]: {
    audioData?: { [key in string]: IAudioData | null };
    isRecordDone?: boolean[];
    isAudioPlayed?: boolean[];
    isSubmitted: boolean;
  };
};
