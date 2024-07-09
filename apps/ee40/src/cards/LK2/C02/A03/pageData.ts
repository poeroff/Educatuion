import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 2:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '[예시 답안] 스포츠 스태킹은 12개의 스피드 스택스 컵을 다양한 방법으로 쌓고 내리면서 집중력과 순발력을 기르는 스포츠 경기다.' }]],
        },
      ];
    default:
      return [];
  }
};
