import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '(예시 답안) It’s under the bed.앞으로 잃어버리지 않기 위해서요.' }]],
        },
      ];
    default:
      return [];
  }
};


// export const getSolutionData = (pageNumber: number) => {
//   switch (pageNumber) {
//     case 1:
//       return [
//         {
//           answer: '',
//           script: '',
//           interpretation: '',
//         },
//       ];
//     default:
//       return [];
//   }
// };