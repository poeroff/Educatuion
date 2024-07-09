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
    case 7:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 7,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 8:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 8,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 9:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 9,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 10:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 10,
            inputData: [
              { subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 11:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 11,
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '달리기 금지 표지판이요.' }]],
        },
      ];
    case 7:
      return [
        {
          mainKey: 7,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 8:
      return [
        {
          mainKey: 8,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 9:
      return [
        {
          mainKey: 9,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 10:
      return [
        {
          mainKey: 10,
          inputDatas: [
            [
              { subKey: 'RECORDER-0', value: null },
              { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];
    case 11:
      return [
        {
          mainKey: 11,
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
