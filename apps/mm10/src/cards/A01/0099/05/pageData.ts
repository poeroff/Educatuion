import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 3: {
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
          {
            mainKey: 3,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 4,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 6,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 7,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 8,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
        ],
      };
    }
    case 4:
      return {
        pageType: 'SAVE',
        inputData: [
          {
            mainKey: 0,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: false },
            ],
          },
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: false },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: false },
            ],
          },
        ],
      };
    case 5: {
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXTAREA-0', type: 'TEXTAREA', value: '', isAnswer: false }],
          },
        ],
      };
    }
    default:
      return {};
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    case 4:
      return [
        {
          mainKey: 0,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '' },
              { subKey: 'TEXT-1', value: '' },
              { subKey: 'TEXT-1', value: '' },
            ],
          ],
        },
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: '' },
              { subKey: 'TEXT-1', value: '' },
              { subKey: 'TEXT-1', value: '' },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
