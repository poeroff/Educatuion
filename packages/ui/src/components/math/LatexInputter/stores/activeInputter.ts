import { atom } from 'recoil';

import { MathfieldElement } from 'mathlive';

export interface InputterDataProps {
  mathfieldRef: MathfieldElement;
  school: 'em' | 'hm' | 'mm';
  handleClose: Function;
}

type InputterDataType = InputterDataProps | undefined;

export const inputterDataAtom = atom<InputterDataType>({
  key: 'inputterData',
  default: undefined,
});
