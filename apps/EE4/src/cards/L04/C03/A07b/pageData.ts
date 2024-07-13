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
              { subKey: 'IMAGE-1', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-2', type: 'IMAGE', value: null, isAnswer: true },
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
            inputData: [
              { subKey: 'IMAGE-1', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-2', type: 'IMAGE', value: null, isAnswer: true },
            ],
          },
        ],
      };

    case 4:
      return {
        pageType: 'SAVE',
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
              { subKey: 'RECORDER-01', value: '' },
              { subKey: 'RECORDER-02', value: '' },
              { subKey: 'RECORDER-03', value: '' },
              { subKey: 'RECORDER-04', value: '' },
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
              { subKey: 'IMAGE-1', value: '/L04/C03/A07a/EE4-L04-C03-A07b-P02-02.jpg' },
              { subKey: 'IMAGE-2', value: '/L04/C03/A07a/EE4-L04-C03-A07b-P02-01.jpg' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'IMAGE-1', value: '/L04/C03/A07b/EE4-L04-C03-A07b-P03-02.jpg' },
              { subKey: 'IMAGE-2', value: '/L04/C03/A07b/EE4-L04-C03-A07b-P03-01.jpg' },
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
              { subKey: 'TEXT-01', value: '' },
              { subKey: 'TEXT-02', value: '' },
              { subKey: 'TEXT-03', value: '' },
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
