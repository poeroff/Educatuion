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
            ],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            include: true,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
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
            include: true,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 4,
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
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '3' },
              { subKey: 'TEXT-1', value: '5' },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '15' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '5' },
              { subKey: 'TEXT-1', value: '7' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '16' },
              { subKey: 'TEXT-1', value: '3' },
              { subKey: 'TEXT-2', value: '7' },
            ],
          ],
        },
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT-0', value: '336' }]],
        },
      ];
    default:
      return [];
  }
};
