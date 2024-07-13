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
              { subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
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
              { subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true },
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
              { subKey: 'TEXT-1', value: "Don't eat, please" },
              // { subKey: 'RECORDER-1', value: null },
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
              { subKey: 'TEXT-1', value: "Don't enter, please" },
              // { subKey: 'RECORDER-1', value: null },
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
              { subKey: 'TEXT-1', value: "Don't push, please" },
              // { subKey: 'RECORDER-1', value: null },
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
              { subKey: 'TEXT-1', value: "Don't run, please" },
              // { subKey: 'RECORDER-1', value: null },
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
              { subKey: 'TEXT-1', value: "Don't talk, please" },
              // { subKey: 'RECORDER-1', value: null },
            ],
          ],
        },
      ];

    default:
      return [];
  }
};
