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
            inputData: [{ subKey: 'NUMBER-02', type: 'NUMBER', value: 0, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'NUMBER-02', value: 1 }]],
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
          script: [{ text: 'W: Is this your shoe?' }, { text: 'B: Yes, it is.' }],
          interpretation: [{ text: 'G: 이게 네 신발이니?' }, { text: 'B: 네, 맞아요.' }],
        },
      ];
    case 2:
      return [
        {
          answer: '1',
          script: `B: Is this your scarf?\nG: No, it isn’t.`,
          interpretation: `B: 이게 네 스카프니?\nG: 아니, 그렇지 않아.`,
        },
      ];
      case 3:
        return [
          {
            answer: [{ text: '분실물 상자 속 물건: 코트가 있어요.' }, { text: '물건의 주인인지 묻는 말: Is this your coat?' }],
            interpretation: [{ text: '물건의 주인인지 묻는 말: 이게 네 코트니?' }],
          },
        ];
    default:
      return [];
  }
};