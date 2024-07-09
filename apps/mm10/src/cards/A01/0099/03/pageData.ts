import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    default:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
        ],
      };
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    default:
      return [];
  }
};
