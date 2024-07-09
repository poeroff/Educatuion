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
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: false },
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
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
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
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
          script: [{ text: 'G: What’s your name?' }, { text: 'B: My name is Gunwoo.' }],
          interpretation: [{ text: 'G: 너의 이름은 무엇이니?' }, { text: 'B: 나의 이름은 건우야.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'B: What’s your name?' },
            { text: 'G: __________' },
            { text: '(a) This is my sister.' },
            { text: '(b) My name is Ajin.' },
            { text: '(c) My name is Minji.' },
          ],
          interpretation: [
            { text: 'B: 너의 이름이 무엇이니?' },
            { text: 'G:  __________' },
            { text: '(a) 이 아이는 내 여동생이야.' },
            { text: '(b) 나의 이름은 아진이야.' },
            { text: '(c) 나의 이름은 민지야.' },
          ],
        },
      ];
    case 3:
      return [
        {
          answer: [{ text: '이름을 묻는 말: What’s your name?' }, { text: '인공지능 스피커의 이름: 아롬이에요.' }],
          interpretation: [{ text: '너의 이름은 무엇이니?' }],
        },
      ];
    default:
      return [];
  }
};
