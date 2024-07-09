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
              { subKey: 'TEXT-4', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-5', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-6', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-7', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-8', type: 'TEXT', value: '', isAnswer: true },
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
              { subKey: 'TEXT-5', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-6', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-7', type: 'TEXT', value: '', isAnswer: true },
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
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: ANSWER1 },
              { subKey: 'TEXT-1', value: ANSWER1 },
              { subKey: 'TEXT-2', value: ANSWER1 },
              { subKey: 'TEXT-3', value: ANSWER1 },
              { subKey: 'TEXT-4', value: ANSWER1 },
              { subKey: 'TEXT-5', value: ANSWER1 },
              { subKey: 'TEXT-6', value: ANSWER1 },
              { subKey: 'TEXT-7', value: ANSWER1 },
              { subKey: 'TEXT-8', value: ANSWER1 },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: ANSWER2 },
              { subKey: 'TEXT-1', value: ANSWER2 },
              { subKey: 'TEXT-2', value: ANSWER2 },
              { subKey: 'TEXT-3', value: ANSWER2 },
              { subKey: 'TEXT-4', value: ANSWER2 },
              { subKey: 'TEXT-5', value: ANSWER2 },
              { subKey: 'TEXT-6', value: ANSWER2 },
              { subKey: 'TEXT-7', value: ANSWER2 },
            ],
          ],
        },
      ];
    case 2:
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
    default:
      return [];
  }
};

const ANSWER1 = ['1', '2', '4', '5', '10', '20', '25', '50', '100'];
const ANSWER2 = ['1', '2', '3', '6', '9', '18', '27', '54'];
