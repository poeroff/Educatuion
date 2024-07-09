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
            inputData: [
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
          script: [{ text: 'B: Who is he?' }, { text: 'G: He’s my friend.' }],
          interpretation: [{ text: 'B: 그는 누구야?' }, { text: 'G: 그는 내 친구야.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: '(a) ' },
            { text: 'G: Who is she?' },
            { text: 'B: She’s my friend.' },
            { text: '(b)' },
            { text: 'G: Who is she?' },
            { text: 'B: She’s my granma.' },
          ],
          interpretation: [
            { text: '(a)' },
            { text: 'G: 그녀는 누구야?' },
            { text: 'B: 그녀는 내 친구야.' },
            { text: '(b)' },
            { text: 'G: 그녀는 누구야?' },
            { text: 'B: 그녀는 내 할머니야.' },
          ],
        },
      ];
    case 3:
      return [
        {
          answer: [
            { text: '누구인지 묻는 말: Who is he?' },
            { text: '누구인지 묻는 말에 답하는 말: He’s my friend.' }
          ],
          interpretation: [
            { text: '누구인지 묻는 말: 그는 누구야?' },
            { text: '누구인지 묻는 말에 답하는 말: 그는 내 친구야.' },
          ],
        },
      ];
    default:
      return [];
  }
};