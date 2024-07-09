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
              { subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-02', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-03', type: 'TEXT', value: '', isAnswer: false },
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
          inputDatas: [
            [
              { subKey: 'TEXT-01', value: '' },
              { subKey: 'TEXT-02', value: '' },
              { subKey: 'TEXT-03', value: '' },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
