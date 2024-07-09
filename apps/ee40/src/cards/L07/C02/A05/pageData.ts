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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: false, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: false, isAnswer: false },
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
              { subKey: 'RECORDER-01', value: true },
              { subKey: 'RECORDER-02', value: true },
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
              { subKey: 'RECORDER-01', value: true },
              { subKey: 'RECORDER-02', value: true },
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
              { subKey: 'RECORDER-01', value: true },
              { subKey: 'RECORDER-02', value: true },
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
              { subKey: 'RECORDER-01', value: true },
              { subKey: 'RECORDER-02', value: true },
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
              { subKey: 'RECORDER-01', value: true },
              { subKey: 'RECORDER-02', value: true },
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
              { subKey: 'RECORDER-01', value: true },
              { subKey: 'RECORDER-02', value: true },
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
    case 6:
      return [
        {
          script: [{ text: '짝에게 물을 때: What time is it?' }, { text: '짝에게 답할 때: It’s 10 o’clock. It’s time for bed.' }],
          interpretation: [{ text: '에게 물을 때: 몇 시니?' }, { text: '짝에게 답할 때: 10시야. 자야 할 시간이야.' }],
        },
      ];
    default:
      return [];
  }
};
