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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-04', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-05', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 6:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 6,
            inputData: [
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
            ],
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
              { subKey: 'RECORDER-03', value: null },
              { subKey: 'RECORDER-04', value: null },
              { subKey: 'RECORDER-05', value: null },
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
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
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
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
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
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
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
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
            ],
          ],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [
            [
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
            ],
          ],
        },
      ];
    case 7:
      return [
        {
          mainKey: 7,
          inputDatas: [
            [
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
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
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
