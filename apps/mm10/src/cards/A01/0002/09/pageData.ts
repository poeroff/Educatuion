import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SAVE',
        inputData: [
          {
            mainKey: 0,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-4', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-5', type: 'TEXT', value: '', isAnswer: false },
            ],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
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
              { subKey: 'TEXT-0', value: '3' },
              { subKey: 'TEXT-1', value: '3' },
              { subKey: 'TEXT-2', value: '3' },
              { subKey: 'TEXT-3', value: '2' },
              { subKey: 'TEXT-4', value: '2' },
              { subKey: 'TEXT-5', value: '2^3' },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '' }]],
        },
      ];
    default:
      return [];
  }
};
