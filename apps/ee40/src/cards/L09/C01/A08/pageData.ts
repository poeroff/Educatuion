import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
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
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'NUMBER-02', value: 2 }]],
        },
      ];

    case 1:
      return [
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'P01', value: 2 }]],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 2:
      return [
        {
          answer: '2',
          script: `B: Where is my watch?
                  G: It’s in the box.`,
          interpretation: `B: 내 손목시계가 어디 있지?
                  G: 상자 안에 있어.`,
        },
      ];

    case 1:
      return [
        {
          script: [{ text: 'G: Where is my bag?' }, { text: 'B: It’s on the table.' }],
          interpretation: [{ text: 'G: 내 가방이 어디 있지?' }, { text: 'B: 탁자 위에 있어.' }],
        },
      ];
      case 3:
        return [
          {
            answer: [
              { text: '책의 위치를 묻는 말: Where is my book?' },
              { text: '책의 위치를 묻는 말에 답하는 말: It’s  on the desk.' },
            ],
            interpretation: [
              { text: '책의 위치를 묻는 말: 내 책이 어디 있지?' },
              { text: '책의 위치를 묻는 말에 답하는 말: 책상 위에 있어.' },
            ],
          },
        ];
    default:
      return [];
  }
};
