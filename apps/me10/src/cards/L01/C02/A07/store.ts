import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C02A07 = atom<TL01C02A07>({
  key: 'L01C02A07',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
      isRecordDone: [true],
      isAudioPlayed: [false],
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      isRecordDone: [true],
      isAudioPlayed: [false],
    },
  },
});

type TL01C02A07 = {
  [key: string]: {
    answer?: string[];
    audioData?: { [key in string]: IAudioData | null };
    isRecordDone?: boolean[];
    isAudioPlayed?: boolean[];
    isSubmitted: boolean;
  };
};
