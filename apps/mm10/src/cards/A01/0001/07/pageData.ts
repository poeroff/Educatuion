import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT_LIST-0', type: 'TEXT_LIST', value: [], isAnswer: true }],
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
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT_LIST-0', value: ANSWER }]],
        },
      ];

    default:
      return [];
  }
};

const ANSWER = ['53', '59', '61', '67', '71', '73', '79', '83', '89', '97'];
