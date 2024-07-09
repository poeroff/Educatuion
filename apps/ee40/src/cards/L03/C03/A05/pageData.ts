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
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-3', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 4,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 5,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-0', value: null },
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
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
