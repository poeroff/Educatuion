import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [
              { subKey: 'IMAGE-1', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-2', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-3', type: 'IMAGE', value: null, isAnswer: true },
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
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'RECORDER-1', value: true }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [
            [
              { subKey: 'IMAGE-1', value: '/L03/C01/A04/EE4-L03-C01-A04-P04-03.png' },
              { subKey: 'IMAGE-2', value: '/L03/C01/A04/EE4-L03-C01-A04-P04-02.png' },
              { subKey: 'IMAGE-3', value: '/L03/C01/A04/EE4-L03-C01-A04-P04-01.png' },
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
          script: [
            { text: '/L03/C01/A04/EE4-L03-C01-A04-P04-03.png' },
            { text: '/L03/C01/A04/EE4-L03-C01-A04-P04-02.png' },
            { text: '/L03/C01/A04/EE4-L03-C01-A04-P04-01.png' },
          ],
          interpretation: [{ text: '' }],
        },
      ];
    default:
      return [];
  }
};
