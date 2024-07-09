import { atom } from 'recoil';

const DEFAULT_PAGE_DATA = {
  isCorrect: false,
  isSubmitted: false,
};

export const B01_0001_00 = atom<TB01000100>({
  key: 'B01000230',
  default: {
    P01: {
      answer: [['', '', '']],
      solution: [['8', '6', '4']],
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: undefined,
      solution: '434',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: undefined,
      solution: 4,
      isCorrect: false,
      isSubmitted: false,
    },
    P04: {
      answer: undefined,
      solution: '4',
      isCorrect: false,
      isSubmitted: false,
    },
    P05: {
      answer: {
        value1: '',
      },
      solution: { value1: '7' },
      commentary: '28 에서 7 을 4 번 뺄 수 있습니다.\n' + '이것을 나눗셈식으로 나타내면 $28\\div7=4$ 입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P06: {
      answer: {
        value1: '',
      },
      solution: { value1: '7' },
      commentary: '감 14 개를 2 명에게 똑같이 나누어 주려면 $14\\div2=7$(개) 씩 나누어 주어야 합니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P07: {
      answer: {
        value1: '',
      },
      solution: [{ value1: '78' }],
      commentary: '한 상자에 초콜릿이 13 개씩 들어있으므로 6 상자에 들어 있는 초콜릿의 수는 $13\\times6=78$(개) 입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P08: {
      answer: {
        value1: 0,
      },
      solution: [{ value1: 3 }],
      commentary: '$97\\times5$ 는 $7\\times5$ 와 $90\\times5$ 의 합입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P09: {
      answer: '',
      solution: 'ㄷ',
      commentary: '막대 사탕의 길이와 휴대 전화의 길이는 모두 cm로 나타내기에 알맞습니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P10: {
      answer: {
        value1: '',
        value2: '',
        value3: '',
      },
      solution: {
        value1: '10',
        value2: '25',
        value3: '10',
      },
      commentary: '시각을 읽으면 10시 25분 10초입니다.',
      isCorrect: false,
      isCorrect1: false,
      isCorrect2: false,
      isCorrect3: false,
      isSubmitted: false,
    },
    P11: DEFAULT_PAGE_DATA,
    P12: {
      answer: 0,
      solution: 3,
      commentary: '0.1이 14개인 수는 1.4입니다.',
      isCorrect: false,
      isSubmitted: false,
    },
    P13: { answer: '', solution: '1304', isCorrect: false, isSubmitted: false },
    P14: {
      answer: {
        value: '',
      },
      solution: [{ value: '1550' }],
      commentary: `(줄넘기를 한 횟수)=(하루에 줄넘기를 한 횟수)x(날 수)=$50\\times31=1550$(회)`,
      isCorrect: false,
      isSubmitted: false,
    },
    P15: {
      imageSrc: '/B00/DJC410011.png',
      imageAlt:
        '원의 중심을 지나지 않는 원 위의 두 점을 이은 길이가 10 cm인 선분과 원의 중심과 원 위의 한 점을 이은 6 cm인 선분이 있는 원 그림입니다.',
      answer: {
        value: '',
      },
      solution: {
        value: '12',
      },
      commentary: `원의 반지름은 6 cm이므로, 지름은 $6\\times2=12$ (cm)입니다.`,
      isCorrect: [false],
      isSubmitted: false,
    },
    P16: DEFAULT_PAGE_DATA,
    P17: {
      questionText: '공책 34권을 3명에게 똑같이 나누어 주려고 합니다. ㉠, ㉡에 알맞은 수를 구해 보세요.',
      imageSrc: '/B00/DJC410008.png',
      imageAlt: '10권씩 3묶음과 낱개로 4권이 있는 책 그림입니다.',
      answer: {
        value1: '',
        value2: '',
      },
      solution: {
        value1: '11',
        value2: '1',
      },
      commentary: `$34\\div3=11\\cdots 1$이므로 공책 34권을 3명에게 똑같이 나누어 주면 한 명에게 11권씩 나누어 줄 수 있고, 1권이 남습니다,`,
      isCorrect: [false, false],
      isSubmitted: false,
    },
    P18: {
      questionText: '빈칸에 알맞은 수를 구해 보세요.',
      answer: {
        value1: '',
      },
      solution: {
        value1: '69',
      },
      commentary: `$\\square\\div4=17\\cdots1\\Rightarrow17\\times$4=68, 68+1=69이므로 $\\square$은 69입니다.`,
      isCorrect: [false],
      isSubmitted: false,
    },
    P19: {
      questionText: '다음 중에서 무게의 합이 4 kg인 것의 기호를 써 보세요.',
      questionData: [
        { label: '가', item1: '버섯 1 kg 200 g', item2: '옥수수 2 kg 800 g' },
        { label: '나', item1: '당근 1 kg 300 g', item2: '배추 1 kg 700 g' },
      ],
      answer: {
        value1: '',
      },
      solution: {
        value1: '가',
      },
      commentary: '버섯과 옥수수의 무게의 합: 1kg 200g + 2kg 800g = 4kg\n당근과 배추의 무게의 합: 1kg 300g + 1kg 700g = 3kg',
      isCorrect: [false],
      isSubmitted: false,
    },
    P20: DEFAULT_PAGE_DATA,
    P21: DEFAULT_PAGE_DATA,
    P22: DEFAULT_PAGE_DATA,
    P23: DEFAULT_PAGE_DATA,
    P24: {
      questionText:
        '다음은 준철이네 학교 4학년 학생들이 반별로 가지고 있는 인형 수를 조사하여 그림그래프로 나타낸 것입니다. 가장 많은 인형을 가지고 있는 반을 구해 보세요.',
      dataTitle: '학생들이 가지고 있는 인형 수',
      answer: {
        value1: '',
      },
      solution: {
        value1: '2',
      },
      commentary:
        '1반부터 4반까지 반별로 가지고 인형의 수는 순서대로 16개, 30개, 23개, 12개입니다. 따라서 가장 많은 인형을 가지고 있는 반은 2반입니다.',
      isCorrect: [false],
      isSubmitted: false,
    },
    P25: {
      questionText:
        '연수와 친구들이 한 달 동안 먹은 달걀의 수를 조사하여 그림그래프로 나타낸 것입니다. 가장 많이 먹은 사람과 가장 적게 먹은 사람이 먹은 달걀 수의 차를 구해 보세요.',
      dataTitle: '한 달 동안 먹은 달걀 수',
      answer: {
        value1: '',
      },
      solution: {
        value1: '14',
      },
      commentary:
        '가장 많이 먹은 사람은 기태이며 20개를 먹었고, 가장 적게 먹은 사람은 서우이며 6개를 먹었습니다. 따라서 두 사람이 먹은 달걀 수의 차를 구하면 20-6=14(개)입니다.',
      isCorrect: [false],
      isSubmitted: false,
    },
  },
});

type TB01000100SingleAnswer<T = number> = {
  answer?: T;
  isCorrect: boolean;
  isSubmitted: boolean;
};
type TB01000100 = {
  P01: {
    answer: string[][];
    solution: string[][];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P02: {
    answer: string | undefined;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    answer: number | undefined;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P04: {
    answer: string | undefined;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P05: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P06: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P07: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P08: {
    answer: { [key: string]: number };
    solution: { [key: string]: number }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P09: {
    answer: string;
    solution: string;
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P10: {
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean;
    isCorrect1: boolean;
    isCorrect2: boolean;
    isCorrect3: boolean;
    isSubmitted: boolean;
  };
  P11: TB01000100SingleAnswer;
  P12: {
    answer: number;
    solution: number;
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P13: { answer: string; solution: string; isCorrect: boolean; isSubmitted: boolean };
  P14: {
    answer: { [key: string]: string };
    solution: { [key: string]: string }[];
    commentary: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P15: {
    imageSrc: string;
    imageAlt: string;
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  P16: TB01000100SingleAnswer;

  P17: {
    questionText: string;
    imageSrc: string;
    imageAlt: string;
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  P18: {
    questionText: string;
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  P19: {
    questionText: string;
    questionData: { [key: string]: string }[];
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  P20: TB01000100SingleAnswer;
  P21: TB01000100SingleAnswer;
  P22: TB01000100SingleAnswer<string>;
  P23: TB01000100SingleAnswer;
  P24: {
    questionText: string;
    dataTitle: string;
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
  P25: {
    questionText: string;
    dataTitle: string;
    answer: { [key: string]: string };
    solution: { [key: string]: string };
    commentary: string;
    isCorrect: boolean[];
    isSubmitted: boolean;
  };
};
