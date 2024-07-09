import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    // case 1:
    //   return {
    //     pageType: 'GRADE',
    //     inputData: [
    //       {
    //         mainKey: 1,
    //         inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
    //       },
    //     ],
    //   };
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
    // case 3:
    //   return {
    //     pageType: 'SUBMIT',
    //     inputData: [
    //       {
    //         mainKey: 3,
    //         inputData: [
    //           { subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: false },
    //           { subKey: 'TEXT-02', type: 'TEXT', value: '', isAnswer: false },
    //         ],
    //       },
    //     ],
    //   };

    default:
      return {};
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    // case 1:
    //   return [
    //     {
    //       mainKey: 1,
    //       inputDatas: [[{ subKey: 'P01', value: 1 }]],
    //     },
    //   ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 3 }]],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    // case 1:
    //   return [
    //     {
    //       script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
    //       interpretation: [{ text: 'G: 기분이 어때?' }, { text: 'B: 아주 좋아.' }],
    //     },
    //   ];
    case 2:
      return [
        {
          script: [{ text: '남동생은 ‘brother’이다. ' }],
          // interpretation: [{ text: '남동생은 ‘brother’이다. ' }],
        },
      ];
    default:
      return [];
  }
};
