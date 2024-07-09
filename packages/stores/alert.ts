import { atom } from 'recoil';

export const alertAtom = atom<TAlertAtom>({
  key: 'alertStates',
  default: {
    isShow: false,
    iconType: 'info',
    message: '',
    subMessage: '',
    description: '',
    closeLabel: '',
    useFooter: false,
    children: null,
    onClose: () => {},
  },
});

type TAlertAtom = {
  isShow: boolean;
  iconType: string;
  message: string;
  subMessage: string;
  description: string;
  closeLabel: string;
  useFooter: boolean;
  children: React.ReactNode;
  onClose: () => void;
};
