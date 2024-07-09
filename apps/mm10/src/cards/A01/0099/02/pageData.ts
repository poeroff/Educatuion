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
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: '', isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
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
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 6:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 6,
            include: true,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-4', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-5', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-6', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-7', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 7:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 7,
            inputData: [{ subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true }],
          },
        ],
      };
    case 8:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 8,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 9,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 9:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 10,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 10:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 11,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 11:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 12,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 12:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 13,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 13:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 14,
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
          inputDatas: [[{ subKey: 'TEXT-0', value: '3' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT_LIST-0', value: ['1', '3'] }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '22' },
              { subKey: 'TEXT-1', value: '396' },
            ],
          ],
        },
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '15' },
              { subKey: 'TEXT-1', value: '315' },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT-0', value: '4' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-0', value: '15' }]],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: ANSWER_6 },
              { subKey: 'TEXT-1', value: ANSWER_6 },
              { subKey: 'TEXT-2', value: ANSWER_6 },
              { subKey: 'TEXT-3', value: ANSWER_6 },
              { subKey: 'TEXT-4', value: ANSWER_6 },
              { subKey: 'TEXT-5', value: ANSWER_6 },
              { subKey: 'TEXT-6', value: ANSWER_6 },
              { subKey: 'TEXT-7', value: ANSWER_6 },
            ],
          ],
        },
      ];
    case 7:
      return [
        {
          mainKey: 7,
          inputDatas: [[{ subKey: 'TEXT_LIST-0', value: ['14-39', '39-14', '14-15', '15-14', '39-8', '8-39', '8-21', '21-8', '8-15', '15-8'] }]],
        },
      ];
    case 8:
      return [
        {
          mainKey: 8,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '6' },
              { subKey: 'TEXT-1', value: '1512' },
            ],
          ],
        },
        {
          mainKey: 9,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '14' },
              { subKey: 'TEXT-1', value: '1260' },
            ],
          ],
        },
      ];
    case 9:
      return [
        {
          mainKey: 10,
          inputDatas: [[{ subKey: 'TEXT-0', value: '4' }]],
        },
      ];
    case 10:
      return [
        {
          mainKey: 11,
          inputDatas: [[{ subKey: 'TEXT-0', value: '55' }]],
        },
      ];
    case 11:
      return [
        {
          mainKey: 12,
          inputDatas: [[{ subKey: 'TEXT-0', value: '28' }]],
        },
      ];
    case 12:
      return [
        {
          mainKey: 13,
          inputDatas: [[{ subKey: 'TEXT-0', value: '27' }]],
        },
      ];
    case 13: // 48, 30
      return [
        {
          mainKey: 14,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '32' },
              { subKey: 'TEXT-1', value: '45' },
            ],
            [
              { subKey: 'TEXT-0', value: '45' },
              { subKey: 'TEXT-1', value: '32' },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};

const ANSWER_6 = ['1', '3', '5', '9', '15', '27', '45', '135'];
