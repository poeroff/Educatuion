import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C07A02a = atom<TCardType>({
  key: 'L04C07A02a',
  default: {},
});

type TCardType = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: (IAudioData | null)[];
    answer?: string[];
    contents?: string[];
  };
};
