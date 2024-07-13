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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-04', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
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
          inputDatas: [
            [
              { subKey: 'RECORDER-01', value: null },
              { subKey: 'RECORDER-02', value: null },
              { subKey: 'RECORDER-03', value: null },
              { subKey: 'RECORDER-04', value: null },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'NUMBER-1', value: 1 }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'NUMBER-1', value: 2 }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'NUMBER-1', value: 2 }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'NUMBER-1', value: 1 }]],
        },
      ];

    default:
      return [];
  }
};

// import { initDataType } from '@maidt-cntn/api';

// export const getDefaultData = (pageNumber: number): initDataType => {
//   switch (pageNumber) {
//     case 1:
//       return {
//         pageType: 'SUBMIT',
//         inputData: [
//           {
//             mainKey: 1,
//             inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
//           },
//         ],
//       };
//     case 2:
//       return {
//         pageType: 'GRADE',
//         inputData: [
//           {
//             mainKey: 2,
//             inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
//           },
//         ],
//       };
//     case 3:
//       return {
//         pageType: 'GRADE',
//         inputData: [
//           {
//             mainKey: 3,
//             inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
//           },
//         ],
//       };
//     case 4:
//       return {
//         pageType: 'GRADE',
//         inputData: [
//           {
//             mainKey: 4,
//             inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
//           },
//         ],
//       };
//     case 5:
//       return {
//         pageType: 'GRADE',
//         inputData: [
//           {
//             mainKey: 5,
//             inputData: [{ subKey: 'NUMBER-1', type: 'NUMBER', value: null, isAnswer: true }],
//           },
//         ],
//       };
//     default:
//       return {};
//   }
// };
