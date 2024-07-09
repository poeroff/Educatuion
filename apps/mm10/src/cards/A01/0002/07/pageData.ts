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
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 2,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 3,
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
          inputDatas: [[{ subKey: 'TEXT-0', value: '2' }]],
        },
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '3' },
              { subKey: 'TEXT-1', value: '11' },
            ],
            [
              { subKey: 'TEXT-0', value: '11' },
              { subKey: 'TEXT-1', value: '3' },
            ],
          ],
        },
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '3' },
              { subKey: 'TEXT-2', value: '7' },
            ],
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '7' },
              { subKey: 'TEXT-2', value: '3' },
            ],
            [
              { subKey: 'TEXT-0', value: '3' },
              { subKey: 'TEXT-1', value: '2' },
              { subKey: 'TEXT-2', value: '7' },
            ],
            [
              { subKey: 'TEXT-0', value: '3' },
              { subKey: 'TEXT-1', value: '7' },
              { subKey: 'TEXT-2', value: '2' },
            ],
            [
              { subKey: 'TEXT-0', value: '7' },
              { subKey: 'TEXT-1', value: '2' },
              { subKey: 'TEXT-2', value: '3' },
            ],
            [
              { subKey: 'TEXT-0', value: '7' },
              { subKey: 'TEXT-1', value: '3' },
              { subKey: 'TEXT-2', value: '2' },
            ],
          ],
        },
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '5' },
            ],
            [
              { subKey: 'TEXT-0', value: '5' },
              { subKey: 'TEXT-1', value: '2' },
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
