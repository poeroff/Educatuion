import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
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
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true },
              { subKey: 'TEXT_LIST-1', type: 'TEXT_LIST', value: [], isAnswer: true },
              { subKey: 'TEXT_LIST-2', type: 'TEXT_LIST', value: [], isAnswer: true },
              { subKey: 'TEXT_LIST-3', type: 'TEXT_LIST', value: [], isAnswer: true },
            ],
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
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
          {
            mainKey: 3,
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
              { subKey: 'TEXT-0', value: '5' },
              { subKey: 'TEXT-1', value: '3' },
              { subKey: 'TEXT-2', value: '4' },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT_LIST-0', value: ['1', '2', '4', '5', '10', '20'] },
              { subKey: 'TEXT_LIST-1', value: ['2', '5'] },
              { subKey: 'TEXT_LIST-2', value: ['1', '2', '4', '8', '16', '32', '64'] },
              { subKey: 'TEXT_LIST-3', value: ['2'] },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '2' },
              { subKey: 'TEXT-2', value: '2' },
              { subKey: 'TEXT-3', value: '23x5' },
            ],
          ],
        },
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '2' },
              { subKey: 'TEXT-2', value: '2' },
              { subKey: 'TEXT-3', value: '5' },
              { subKey: 'TEXT-4', value: '23x5' },
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
    default:
      return [];
  }
};
