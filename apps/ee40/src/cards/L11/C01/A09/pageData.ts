import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'NUMBER-02', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
      case 3:
        return {
          pageType: 'SUBMIT',
          inputData: [
            {
              mainKey: 3,
              inputData: [
                { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
                { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
              ],
            },
          ],
        };
    default:
      return {};
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'NUMBER-02', value: 2 }]],
        },
      ];

    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [
        {
          script: [{ text: 'B: What day is it today?' }, { text: 'G: It’s Thursday.' }],
          interpretation: [{ text: 'B: 오늘 무슨 요일이니?' }, { text: 'G: 목요일이야.' }],
        },
      ];
    case 2:
      return [
        {
          answer: '1',
          script: `G: What day is it today?\nB: It's Tuesday.`,
          interpretation: `G: 오늘 무슨 요일이니?\nB: 화요일이야.`,
        },
      ];
      case 3:
        return [
          {
            answer: [
              { text: '지금 시각: 12시예요.' },
              { text: '지금 몇 시고 무엇을 할 시간인지 나타내는 말: It’s 12 o’clock. It’s time for lunch.' },
            ],
            interpretation: [
              { text: '지금 몇 시고 무엇을 할 시간인지 나타내는 말: 12시야. 점심 식사할 시간이야.' },
            ],
          },
        ];
    default:
      return [];
  }
};
