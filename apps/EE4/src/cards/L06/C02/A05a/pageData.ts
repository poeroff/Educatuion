import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-3', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'RECORDER-4', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-5', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-6', type: 'RECORDER', value: false, isAnswer: false },
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
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: null },
              { subKey: 'RECORDER-2', value: null },
              { subKey: 'RECORDER-3', value: null },
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
              { subKey: 'RECORDER-4', value: null },
              { subKey: 'RECORDER-5', value: null },
              { subKey: 'RECORDER-6', value: null },
            ],
          ],
        },
      ];

    default:
      return [];
  }
};
