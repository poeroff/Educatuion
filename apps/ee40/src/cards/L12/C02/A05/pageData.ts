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
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 4,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 5,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 6:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 6,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 7:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 7,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 8:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 8,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
            ],
          },
        ],
      };
    case 9:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 9,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 7:
      return [
        {
          mainKey: 7,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 8:
      return [
        {
          mainKey: 8,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
            ],
          ],
        },
      ];
    case 9:
      return [
        {
          mainKey: 9,
          inputDatas: [
            [
              { subKey: 'RECORDER-1', value: true },
              { subKey: 'RECORDER-2', value: true },
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
    case 7:
      return [
        {
          script: [{ text: '첫 번째 A: Good morning. How are you?' }, { text: '두 번째 A: I’m good. Thanks.' }],
          interpretation: [{ text: '첫 번째 A: 좋은 아침이야. 기분이 어때?' }, { text: '두 번째 A: 좋아. 고마워.' }],
        },
      ];
    case 8:
      return [
        {
          script: [{ text: '첫 번째 A: Good afternoon. How are you?' }, { text: '두 번째 A: I’m great. Thanks.' }],
          interpretation: [{ text: '첫 번째 A: 좋은 오후야. 기분이 어때?' }, { text: '두 번째 A: 아주 좋아. 고마워.' }],
        },
      ];
    case 9:
      return [
        {
          script: [{ text: '첫 번째 A: Good evening. How are you?' }, { text: '두 번째 A: Not so good. Thanks.' }],
          interpretation: [{ text: '첫 번째 A: 좋은 저녁이야. 기분이 어때?' }, { text: '두 번째 A: 좋지 않아. 고마워.' }],
        },
      ];
    default:
      return [];
  }
};
