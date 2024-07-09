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
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true }],
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
          inputDatas: [[{ subKey: 'TEXT-0', value: 'ㅅ' }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: 'ㅎ' }]],
        },
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-0', value: 'ㅅ' }]],
        },
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-0', value: 'ㅎ' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-LIST-0', value: ['19', '31', '53'] }]],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return '해설해설해설';
    case 2:
      return '해해해설설설';
    default:
      return [];
  }
};
