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
          inputDatas: [
            [
              {
                subKey: 'TEXT-01',
                value:
                  '[예시 답안] 일본에는 오랜 시간 사회에 공헌한 노인들께 경의를 표하고 장수를 기원하는 경로의 날이 있다. 경로의 날은 9월 셋째 주 월요일이다.',
              },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
