import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            include: true,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 1,
            include: true,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-4', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
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
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
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
              { subKey: 'TEXT-0', value: ANSWER_1_0 },
              { subKey: 'TEXT-1', value: ANSWER_1_0 },
              { subKey: 'TEXT-2', value: ANSWER_1_0 },
              { subKey: 'TEXT-3', value: ANSWER_1_0 },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: ANSWER_1_1 },
              { subKey: 'TEXT-1', value: ANSWER_1_1 },
              { subKey: 'TEXT-2', value: ANSWER_1_1 },
              { subKey: 'TEXT-3', value: ANSWER_1_1 },
              { subKey: 'TEXT-4', value: ANSWER_1_1 },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 0,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '5' },
              { subKey: 'TEXT-1', value: '10' },
              { subKey: 'TEXT-2', value: '15' },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '12' },
              { subKey: 'TEXT-1', value: '24' },
              { subKey: 'TEXT-2', value: '36' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-0', value: '3' }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '4' }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-0', value: '20' }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '36' }]],
        },
      ];
    default:
      return [];
  }
};

const ANSWER_1_0 = ['1', '2', '5', '10'];
const ANSWER_1_1 = ['1', '2', '4', '8', '16'];
