import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 2:
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
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '5' },
              { subKey: 'TEXT-1', value: '10' },
              { subKey: 'TEXT-2', value: '15' },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '12' },
              { subKey: 'TEXT-1', value: '24' },
              { subKey: 'TEXT-2', value: '36' },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-0', value: '3' }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '4' }]],
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
