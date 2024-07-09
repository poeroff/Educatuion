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
                  '[예시 답안] 튀르키예의 이스탄불에 있는 그랜드 바자르(카팔르 차르쉬)는 ‘지붕이 있는 시장’이란 뜻의 전통 시장이다. 튀르키예의 다양한 전통 물건들을 한눈에 둘러볼 수 있다.',
              },
            ],
          ],
        },
      ];
    default:
      return [];
  }
};
