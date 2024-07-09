import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-05', type: 'TEXT', value: '', isAnswer: false }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '동물에게 먹이를 주고 청소를 하고 있어요.' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: 'o' },
              { subKey: 'TEXT-1', value: 'g' },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 1 }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-05', value: '수호의 할아버지 였어요.' }]],
        },
      ];
    default:
      return [];
  }
};
export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 4:
      return [{ answer: `1.수호의 친구` }];

    default:
      return [{ answer: '', script: '', interpretation: '' }];
  }
};
