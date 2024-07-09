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
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 1 }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'RECORDER-1', value: 'He’s cute.\nShe’s tall.' }]],
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
          script: [{ text: 'B: He is tall. Who is he?' }, { text: 'G: He’s my granpa.' }],
          interpretation: [{ text: 'B: 그는 키가 크다. 그는 누구니?' }, { text: 'G: 그는 나의 할아버지야.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: She’s cool. Who is she?' },
            { text: 'B: __________' },
            { text: '(a) She’s my teacher.' },
            { text: '(b) She is my friend.' },
            { text: '(c) She is my grandma.' },
          ],
          interpretation: [
            { text: 'G: 그녀는 멋져. 그녀는 누구야?' },
            { text: 'B: __________' },
            { text: '(a) 그녀는 나의 선생님이야.' },
            { text: '(b) 그녀는 나의 친구야.' },
            { text: '(c) 그녀는 나의 할머니야.' },
          ],
        },
      ];

    default:
      return [];
  }
};
