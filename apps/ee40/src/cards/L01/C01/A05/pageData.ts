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
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'LINE-1', type: 'LINE', value: null, isAnswer: true },
              { subKey: 'LINE-2', type: 'LINE', value: null, isAnswer: true },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 6:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 6,
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
              { subKey: 'RECORDER-1', type: 'RECORDER', value: '', isAnswer: true },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: '', isAnswer: true },
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '기분이 좋아 보여요. / 신나 보여요.' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'LINE-1', value: ['left-1', 'right-2'] },
              { subKey: 'LINE-2', value: ['left-2', 'right-1'] },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 1 }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 2 }]],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'TEXT-01', value: '기분이 아주 좋았어요.' }]],
        },
      ];

    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [{ answer: '' }];
    case 2:
      return [{ answer: '' }];
    case 3:
      return [
        {
          answer: `수호: I'm great.
                    엘라:  I'm good.`,
        },
      ];
    case 4:
      return [{ answer: `1. 비가오는데 우산이 없어서` }];
    case 5:
      return [{ answer: `2. 우산` }];
    default:
      return [{ answer: '', script: '', interpretation: '' }];
  }
};
