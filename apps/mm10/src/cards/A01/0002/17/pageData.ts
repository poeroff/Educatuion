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
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
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
          {
            mainKey: 4,
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
            mainKey: 5,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 6,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 7,
            inputData: [{ subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true }],
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
              { subKey: 'TEXT-0', value: '35' },
              { subKey: 'TEXT-1', value: '23x52' },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 1,
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '3' },
            ],
          ],
        },
        {
          mainKey: 2,
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '13' },
            ],
          ],
        },
        {
          mainKey: 3,
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '5' },
              { subKey: 'TEXT-1', value: '7' },
            ],
          ],
        },
        {
          mainKey: 4,
          include: true,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '2' },
              { subKey: 'TEXT-1', value: '3' },
              { subKey: 'TEXT-2', value: '7' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 5,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '32x5' },
              { subKey: 'TEXT-1', value: '23x7' },
              { subKey: 'TEXT-2', value: '53' },
              { subKey: 'TEXT-3', value: '22x3x11' },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'TEXT-0', value: '7' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 7,
          inputDatas: [[{ subKey: 'TEXT_LIST-0', value: ['2', '3'] }]],
        },
      ];
    default:
      return [];
  }
};
