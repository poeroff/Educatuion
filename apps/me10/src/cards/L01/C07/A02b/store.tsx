import { userSubmissionType } from '@maidt-cntn/api';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { atom } from 'recoil';
export { getDialogText } from '../A02/store';

export const L01C07A02b = atom({
  key: 'L01C07A02b',
  default: {
    p01: {
      answer: [
        {
          peopleId: '',
          valueId: '',
        },
        {
          peopleId: '',
          valueId: '',
        },
        {
          peopleId: '',
          valueId: '',
        },
        {
          peopleId: '',
          valueId: '',
        },
      ],
      solution: [
        { peopleId: 'Jiwon', valueId: 'a stress ball' },
        { peopleId: 'Emily', valueId: 'a Band-Aid' },
        { peopleId: 'Mike', valueId: 'an eraser' },
        { peopleId: 'Somin', valueId: 'a mirror' },
      ],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
