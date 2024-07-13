import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 2:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-3', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-4', type: 'RECORDER', value: null, isAnswer: false },
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
            inputData: [
              { subKey: 'IMAGE-1', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-2', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-3', type: 'IMAGE', value: null, isAnswer: true },
              { subKey: 'IMAGE-4', type: 'IMAGE', value: null, isAnswer: true },
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
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: "I'm cooking" },
              { subKey: 'RECORDER-2', value: "I'm listening to music." },
              { subKey: 'RECORDER-3', value: "I'm reading a book" },
              { subKey: 'RECORDER-4', value: "I'm drawing a picture" },
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
              { subKey: 'IMAGE-1', value: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-01.jpg' },
              { subKey: 'IMAGE-2', value: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-04.jpg' },
              { subKey: 'IMAGE-3', value: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-03.jpg' },
              { subKey: 'IMAGE-4', value: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-02.jpg' },
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
    case 1:
      return [
        {
          script: [{ text: 'G: This is my brother.' }],
          interpretation: [{ text: 'G: 이 사람은 나의 오빠예요' }],
        },
      ];
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
