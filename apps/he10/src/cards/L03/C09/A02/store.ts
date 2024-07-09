import { atom } from 'recoil';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export const L03_C09_A02 = atom<TL03_C09_A02>({
  key: 'L03C09A02',
  default: {
    common: {
      headerInfo: {
        headerText: 'Read and Analyze',
      },
      questionInfo: {
        text: 'Read the description of the science experiment and complete the project board.',
        size: 'medium',
      },
      wordArr: ['break up', 'dish soap', 'flat', 'milk', 'non-fat', 'spread'],
    },
    p02: {
      answer: {
        value1: '',
      },
      solution: { value1: 'dish soap' },
      isCorrect: false,
      isSubmitted: false,
      textView: {
        title: 'Title & Purpose',
        text: 'I’d like to introduce a cool experiment called “Magic Rainbow Milk.” The purpose of this experiment is to see if dish soap can create a rainbow pattern on milk.',
        color: 'var(--color-yellow-300)',
        height: '70px',
      },
      answerView: {
        title: 'Magic Rainbow Milk',
        subTitle: 'Purpose',
        color: 'var(--color-pink-500)',
      },
    },
    p03: {
      answer: {
        value1: '',
      },
      solution: { value1: 'flat' },
      isCorrect: false,
      isSubmitted: false,
      textView: {
        title: 'Materials',
        text: 'You’ll need whole milk, food coloring, dish soap, and a flat dish.',
        color: 'var(--color-green-200)',
        height: '70px',
      },
      answerView: {
        title: 'Magic Rainbow Milk',
        subTitle: 'Materials',
        color: 'var(--color-yellow-300)',
        imgSrc: '/L03/C09/A02/HE1-L03-C09-A02-P03.jpg',
        imgAlt: '병에 든 우유 사진 whole milk, 네 가지 색의 식용 색소 사진 food coloring, 병에 담긴 설거지 세제 dish soap, 접시 한 개 a 빈 칸 dish',
      },
    },
    p04: {
      answer: {
        value1: '',
      },
      solution: { value1: 'milk' },
      isCorrect: false,
      isSubmitted: false,
      textView: {
        titleText: 'Procedure & Caution',
        text:
          'Here’s how to do it. First,\n' +
          'pour the milk into the dish.\n' +
          'Be careful.\n' +
          'Only if you use milk that\n' +
          'contains fat will the\n' +
          'experiment work properly.\n' +
          'Next, add some drops of\n' +
          'food coloring into the milk.\n' +
          'Finally, put a drop of dish\n' +
          'soap in the center.\n',
        titleColor: 'var(--color-blue-200)', //deep light blue
      },
    },
    p05: {
      answer: {
        value1: '',
      },
      solution: { value1: 'non-fat' },
      isCorrect: false,
      isSubmitted: false,
      textView: {
        title: 'Procedure & Caution',
        text:
          'Here’s how to do it. First,\n' +
          'pour the milk into the dish.\n' +
          'Be careful.\n' +
          'Only if you use milk that\n' +
          'contains fat will the\n' +
          'experiment work properly.\n' +
          'Next, add some drops of\n' +
          'food coloring into the milk.\n' +
          'Finally, put a drop of dish\n' +
          'soap in the center.\n',
        color: 'var(--color-blue-200)',
        height: '70px',
      },
      answerView: {
        title: 'Magic Rainbow Milk',
        subTitle: 'Caution',
        color: 'var(--color-green-200)',
      },
    },
    p06: {
      answer: {
        value1: '',
      },
      solution: { value1: 'spread' },
      isCorrect: false,
      isSubmitted: false,
      textView: {
        title: 'Expected Results & Reasoning',
        text:
          'Then, you will observe the\n' +
          'colors spreading all over\n' +
          'the milk. That’s because\n' +
          'the dish soap can break\n' +
          'up the fat in the milk into\n' +
          'tiny pieces, causing the\n' +
          'colors to spread.\n',
        color: 'var(--color-purple-200)',
        height: '70px',
      },
      answerView: {
        title: 'Magic Rainbow Milk',
        subTitle: 'Expected Results',
        color: 'var(--color-pink-700)',
        imgSrc: '/L03/C09/A02/HE1-L03-C09-A02-P06.jpg',
        imgAlt: '접시에 섞인 우유와 식용색소, 설거지 세제가 퍼져 나가고 있는 모습',
      },
    },
    p07: {
      answer: {
        value1: '',
      },
      solution: { value1: 'break up' },
      isCorrect: false,
      isSubmitted: false,
      textView: {
        title: 'Expected Results & Reasoning',
        text:
          'Then, you will observe the\n' +
          'colors spreading all over\n' +
          'the milk. That’s because\n' +
          'the dish soap can break\n' +
          'up the fat in the milk into\n' +
          'tiny pieces, causing the\n' +
          'colors to spread.\n',
        color: 'var(--color-purple-200)',
        height: '70px',
      },
      answerView: {
        title: 'Magic Rainbow Milk',
        subTitle: 'Reasoning',
        color: 'var(--color-purple-800)',
      },
    },
  },
});

type TL03_C09_A02 = {
  common: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    wordArr: string[];
  };
  p02: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
    textView: {
      title: string;
      color: string;
      text: string;
      height: string;
    };
    answerView: {
      title: string;
      subTitle: string;
      color: string;
    };
  };
  p03: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
    textView: {
      title: string;
      color: string;
      text: string;
      height: string;
    };
    answerView: {
      title: string;
      subTitle: string;
      color: string;
      imgSrc: string;
      imgAlt: string;
    };
  };
  p04: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
    textView: {
      titleText: string;
      text: string;
      titleColor: string;
    };
  };
  p05: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
    textView: {
      title: string;
      color: string;
      text: string;
      height: string;
    };
    answerView: {
      title: string;
      subTitle: string;
      color: string;
    };
  };
  p06: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
    textView: {
      title: string;
      color: string;
      text: string;
      height: string;
    };
    answerView: {
      title: string;
      subTitle: string;
      color: string;
      imgSrc: string;
      imgAlt: string;
    };
  };
  p07: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    isCorrect: boolean;
    isSubmitted: boolean;
    textView: {
      title: string;
      color: string;
      text: string;
      height: string;
    };
    answerView: {
      title: string;
      subTitle: string;
      color: string;
    };
  };
};
