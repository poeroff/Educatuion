import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'P01', type: 'TEXT', value: null, isAnswer: false }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'P03', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'LINE-1', type: 'LINE', value: null, isAnswer: true }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'LINE-1', type: 'LINE', value: null, isAnswer: true }],
          },
          {
            mainKey: 3,
            inputData: [{ subKey: 'OFFSET', type: 'LINE', value: null, isAnswer: false }],
          },
        ],
      };

    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'TEXT-02', type: 'TEXT', value: null, isAnswer: true },
            ],
          },
        ],
      };
    case 6:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 6,
            inputData: [{ subKey: 'P06', type: 'NUMBER', value: 0, isAnswer: true }],
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
      return [{ mainKey: 1, inputDatas: [[{ subKey: 'P01', value: '친구들과 즐거운 시간을 보내고 있어요.' }]] }];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'P03', value: 1 }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'LINE-1', value: ['left-1', 'right-1'] }]],
        },
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'LINE-1', value: ['left-2', 'right-2'] }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [
            [
              { subKey: 'TEXT-01', value: '민지' },
              { subKey: 'TEXT-02', value: '올리' },
            ],
          ],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'P06', value: 2 }]],
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
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '친구들과 즐거운 시간을 보내고 있어요.' }],
        },
      ];
    case 3:
      return [
        {
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '1' }],
        },
      ];
    case 4:
      return [
        {
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '잭-바나나' }, { text: '럭키-사과' }],
        },
      ];
    case 6:
      return [
        {
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '2' }],
        },
      ];
    default:
      return [];
  }
};
