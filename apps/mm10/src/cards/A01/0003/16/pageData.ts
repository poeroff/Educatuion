import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 3,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 6,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SAVE',
        inputData: [
          {
            mainKey: 7,
            inputData: [
              { subKey: 'CANVAS-0', type: 'CANVAS', value: '', isAnswer: false },
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
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
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-0', value: '250' }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '28' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-0', value: '2' }]],
        },
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-0', value: '4' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT_LIST-0', value: ['0', '2'] }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-0', value: '450' }]],
        },
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'TEXT-0', value: '1575' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 7,
          inputDatas: [[{ subKey: 'TEXT-0', value: '84' }]],
        },
      ];
    default:
      return [];
  }
};
