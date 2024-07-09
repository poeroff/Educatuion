import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'P02', type: 'NUMBER', value: 0, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'P01', value: 2 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 2 }]],
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
          script: [{ text: 'G: My skirt is long.' }],
          interpretation: [{ text: 'G: 내 치마는 길어.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: Is this your cap?' },
            { text: 'B: __________' },
            { text: '(a) Yes, it is.' },
            { text: `(b) No, it isn't. My cap is blue.` },
            { text: `(c) No, it isn't. My cap is red.` },
          ],
          interpretation: [
            { text: 'G: 이게 네 모자니?' },
            { text: 'B:  __________' },
            { text: '(a) 응, 맞아.' },
            { text: '(b) 아니, 그렇지 않아. 내 모자는 파란색이야.' },
            { text: '(c) 아니, 그렇지 않아. 내 모자는 빨간색이야.' },
          ],
        },
      ];

    default:
      return [];
  }
};
