import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {};
    case 2:
      return {};
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'CANVAS-0', type: 'CANVAS', value: '', isAnswer: false }],
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
      return [];
    case 2:
      return [];
    case 3:
      return [];
    default:
      return [];
  }
};
