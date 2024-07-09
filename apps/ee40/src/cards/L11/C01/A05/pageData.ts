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
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: '', isAnswer: true }],
          },
        ],
      };
    case 6:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 6,
            inputData: [{ subKey: 'TEXT-06', type: 'TEXT', value: '', isAnswer: false }],
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
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
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
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
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
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
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
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
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
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 12:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 12,
            inputData: [
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 13:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 13,
            inputData: [
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'BOOLEAN', value: '', isAnswer: true },
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '빛 축제 행사장에 있어요.' }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 3 }]],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'TEXT-06', value: '금요일에 갔어요.' }]],
        },
      ];
    case 7:
      return [
        {
          mainKey: 7,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
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
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
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
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
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
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
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
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 12:
      return [
        {
          mainKey: 12,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 13:
      return [
        {
          mainKey: 13,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 4:
      return [
        {
          interpretation: [{ text: '3' }],
        },
      ];
    default:
      return [{ answer: '', script: '', interpretation: '' }];
  }
};
