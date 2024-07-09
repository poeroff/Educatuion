import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-3', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-4', type: 'RECORDER', value: false, isAnswer: false },
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
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
              { subKey: 'RECORDER-3', value: true },
              { subKey: 'RECORDER-4', value: true },
            ],
          ],
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
          //script: [{ text: '친구들과 즐거운 시간을 보내고 있어요.' }],
          interpretation: [{ text: '친구들과 즐거운 시간을 보내고 있어요.' }],
        },
      ];
    default:
      return [];
  }
};
