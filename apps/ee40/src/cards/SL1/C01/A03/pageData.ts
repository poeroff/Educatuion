import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'IMAGE-1', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-2', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-3', type: 'IMAGE', value: null, isAnswer: true },
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
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    default:
      return {};
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'IMAGE-1', value: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-02.png' },
              { subKey: 'IMAGE-2', value: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-03.png' },
              { subKey: 'IMAGE-3', value: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-01.png' },
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
              {
                subKey: 'TEXT-01',
                value: '[예시 답안] Listen. Line up.',
              },
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
    case 3:
      return [
        {
          script: [
            { text: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-02.png' },
            { text: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-03.png' },
            { text: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-01.png' },
          ],
          interpretation: [{ text: '' }],
        },
      ];
    default:
      return [];
  }
};
