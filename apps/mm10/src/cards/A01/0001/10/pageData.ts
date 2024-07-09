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
              { subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true },
              { subKey: 'TEXT_LIST-1', type: 'TEXT_LIST', value: [], isAnswer: true },
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
            inputData: [{ subKey: 'BOOLEAN-0', type: 'BOOLEAN', value: null, isAnswer: true }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'BOOLEAN-0', type: 'BOOLEAN', value: null, isAnswer: true }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'BOOLEAN-0', type: 'BOOLEAN', value: null, isAnswer: true }],
          },
          {
            mainKey: 3,
            inputData: [{ subKey: 'BOOLEAN-0', type: 'BOOLEAN', value: null, isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
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
          inputDatas: [
            [
              { subKey: 'TEXT_LIST-0', value: ['23', '41'] },
              { subKey: 'TEXT_LIST-1', value: ['12', '57', '74'] },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'BOOLEAN-0', value: true }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'BOOLEAN-0', value: false }]],
        },
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'BOOLEAN-0', value: false }]],
        },
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'BOOLEAN-0', value: true }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 0,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '11' },
              { subKey: 'TEXT-1', value: '17' },
            ],
            [
              { subKey: 'TEXT-0', value: '17' },
              { subKey: 'TEXT-1', value: '11' },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
