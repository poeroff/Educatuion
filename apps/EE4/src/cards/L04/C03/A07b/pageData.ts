import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-04', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'TEXT-02', type: 'TEXT', value: null, isAnswer: true },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
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
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'TEXT-02', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'TEXT-03', type: 'TEXT', value: null, isAnswer: false },
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
          inputDatas: [
            [
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
              { subKey: 'RECORDER-03', value: null },
              { subKey: 'RECORDER-04', value: null },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'TEXT-01', value: 'EE4-L04-C03-A07b-P02-02.jpg' },
              { subKey: 'TEXT-02', value: 'EE4-L04-C03-A07b-P02-01.jpg' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'friend' }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT-01', value: '' }]],
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
            { text: '/L01/C01/A04/EE4-L01-C01-A04-P04-02.png' },
            { text: '/L01/C01/A04/EE4-L01-C01-A04-P04-01.png' },
            { text: '/L01/C01/A04/EE4-L01-C01-A04-P04-03.png' },
          ],
          interpretation: [{ text: '' }],
        },
      ];
    default:
      return [];
  }
};
