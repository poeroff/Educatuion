import { atom } from 'recoil';

export const alertAtom = atom({
  key: 'alertStates',
  default: {
    message: '',
    subMessage: '',
    description: '',
    closeLabel: '',
    onClose: () => {},
  },
});
