import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-021-01';

export const L01_SP05 = atom<TL01SP05>({
  key: 'L01SP05',
  default: {
    p01: {
      headerText: '자유 발화',
      questionText: '다음 질문에 대해 나의 답변을 자유롭게 말 해 봅시다.',
      solution: {
        originText: 'My favorite subject is English. I study English every day. Also, I like my English teacher. She is very nice to me.',
        translation:
          '제가 가장 좋아하는 과목은 영어입니다. 저는 매일 영어 공부를 합니다. 또한, 저는 영어 선생님을 좋아합니다. 그녀는 저에게 매우 친절합니다.',
      },
      audioData: {},
      isSubmitted: false,
    },
    p02: {
      headerText: '자유 영작',
      questionText: '나만의 school survival kit에 대해 자유롭게 써 보세요.',
      answer: {
        value1: '',
      },
      solution: {
        originText:
          'I have many things in my school survival kit. I have a baseball. When I feel nervous, I hold it tightly. Also, I have my family photos.',
        translation:
          '저의 학교 생존 키트에는 많은 것들이 있습니다. 저는 야구공이 있어요. 제가 긴장될 때 야구공을 꽉 쥡니다. 또한, 저의 가족 사진이 있습니다.',
      },
      audioData: {},
      isSubmitted: false,
    },
  },
});

type TL01SP05 = {
  p01: {
    headerText: string;
    questionText: string;
    solution: IListenAndAnswer;
    audioData: IAudioData;
    isSubmitted: boolean;
  };
  p02: {
    headerText: string;
    questionText: string;
    answer: { [key: string]: string };
    solution: IListenAndAnswer;
    audioData: IAudioData;
    isSubmitted: boolean;
  };
};
