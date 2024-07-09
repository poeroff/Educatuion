import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'NUMBER-01', value: 1 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 1 }]],
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
          answer: '1',
          script: `G: I want this watch. How much is it?
                  M: It’s 4,000 won.`,
          interpretation: `G: 이 손목시계를 갖고 싶어요. 얼마예요?
                  M: 사천 원이야.`,
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'B: I want this umbrella. How much is it?' },
            { text: 'W: __________' },
            { text: '(a) It’s 2,000 won.' },
            { text: '(b) It’s 3,000 won.' },
            { text: '(c) It’s 800 won.' },
          ],
          interpretation: [
            { text: 'B: 이 우산을 갖고 싶어요. 얼마예요?' },
            { text: 'W:  __________' },
            { text: '(a) 이천 원이야.' },
            { text: '(b) 삼천 원이야.' },
            { text: '(c) 팔백 원이야.' },
          ],
        },
      ];
      case 3:
        return [
          {
            answer: [{ text: '사고 싶은 물건: 인형을 갖고 싶어요.' }, { text: 'I want this doll.' }],
            interpretation: [{ text: '나는 이 인형을 갖고 싶어.' }],
          },
        ];
    default:
      return [];
  }
};
