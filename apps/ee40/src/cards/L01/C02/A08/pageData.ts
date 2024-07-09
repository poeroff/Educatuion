import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'NUMBER-0', type: 'NUMBER', value: null, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'NUMBER-01', value: 2 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'NUMBER-0', value: 2 }]],
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
          answer: '2',
          script: 'G: Good evening.',
          interpretation: 'G: 좋은 저녁이야.',
        },
      ];
    case 2:
      return [
        {
          answer: 'b',
          script: `B: __________
          (a) 좋은 아침이야.
          (b) 좋은 오후야.
          (c) 좋은 저녁이야.`,
          interpretation: `B: __________
          (a) Good morning.
          (b) Good afternoon.
          (c) Good evening.'
          `,
        },
      ];
    case 3:
      return [
        {
          answer: `하교하는 시간: 오후 2시에 하교해요.
          인사하는 말: Good afternoon, Jane.`,
          interpretation: '인사하는 말: 좋은 오후야, 제인.',
        },
      ];
    default:
      return [];
  }
};
