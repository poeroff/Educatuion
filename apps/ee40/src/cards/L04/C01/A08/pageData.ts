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
            inputData: [{ subKey: 'NUMBER-02', type: 'NUMBER', value: null, isAnswer: true }],
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
              { subKey: 'TEXT-02', type: 'TEXT', value: null, isAnswer: false },
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
          inputDatas: [[{ subKey: 'NUMBER-02', value: 3 }]],
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
          script: [{ text: 'M: Don’t enter, please.' }, { text: 'G: Okay.' }],
          interpretation: [{ text: 'B: 들어오지 마세요.' }, { text: 'G: 알겠어요.' }],
        },
      ];

    case 2:
      return [
        {
          answer: 2,
          script: `W: Don’t push, please.
                    B: Okay.`,
          interpretation: `W: 밀지 마세요.
                            B: 알겠어요.`,
        },
      ];
    case 3:
      return [
        {
          answer: [{ text: '수업 시간에 하면 안 되는 행동: 떠들면 안 돼요.' }, { text: '그 행동을 금지하는 말: Don’t talk, please.' }],
          interpretation: [{ text: '그 행동을 금지하는 말: 말하지 말아 줘.' }],
        },
      ];
    default:
      return [];
  }
};
