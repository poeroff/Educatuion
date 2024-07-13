import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-4', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-5', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-3', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-4', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-5', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'NUMBER-03', type: 'NUMBER', value: null, isAnswer: true }],
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
          inputDatas: [
            [
              { subKey: 'TEXT-1', value: '4' },
              { subKey: 'TEXT-2', value: '5' },
              { subKey: 'TEXT-3', value: '1' },
              { subKey: 'TEXT-4', value: '2' },
              { subKey: 'TEXT-5', value: '3' },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: 'Don’t run, please.' },
              { subKey: 'RECORDER-2', value: 'Don’t talk, please.' },
              { subKey: 'RECORDER-3', value: 'Don’t eat, please.' },
              { subKey: 'RECORDER-4', value: 'Don’t enter, please.' },
              { subKey: 'RECORDER-5', value: 'Don’t push, please.' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'NUMBER-03', value: 1 }]],
        },
      ];
    default:
      return [];
  }
};
