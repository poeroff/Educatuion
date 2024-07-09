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
            inputData: [{ subKey: 'P02', type: 'NUMBER', value: 0, isAnswer: true }],
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
                { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: false },
                { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
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
          inputDatas: [[{ subKey: 'P02', value: 1 }]],
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
          script: [{ text: 'W: It’s time for dinner.' }],
          interpretation: [{ text: 'W: 저녁 식사할 시간이야.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'M: __________' },
            { text: '(a) It’s 8 o’clock. It’s time for breakfast.' },
            { text: '(b) It’s 12:30. It’s time for lunch.' },
            { text: '(c) It’s 10 o’clock. It’s time for bed.' },
          ],
          interpretation: [
            { text: 'M: __________' },
            { text: '(a) 8시야. 아침 식사할 시간이야.' },
            { text: '(b) 12시 30분이야. 점심 식사할 시간이야.' },
            { text: '(c) 10시야. 자야 할 시간이야.' },
          ],
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