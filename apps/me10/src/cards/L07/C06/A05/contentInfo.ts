export const contentInfo = {
  P01: {
    image: {
      src: [`/L07/C06/A05/ME1-L07-C06-A05-P01.jpg`],
      alt: [
        [
          `두 개의 사진이 있다.`,
          `사진 위로 로봇과 아이의 모습이 겹쳐져 있다.`,
          `왼쪽: Antarctica 라고 적힌 눈 덮인 사막 사진`,
          `오른쪽: The Sahara 라고 적힌 모래 사막 사진`,
        ],
      ],
    },
    audio: {
      src: `/L07/C06/A05/ME1-L07-C06-A05-P01.mp3`,
      caption: `/L07/C06/A05/ME1-L07-C06-A05-P01.srt`,
    },
    body: [
      {
        label: 'Host',
        labelColor: `var(--color-purple-50)`,
        originText: `Here is the first question. What is the largest desert in the world?`,
      },
      {
        label: 'Namjun',
        labelColor: `var(--color-yellow-100)`,
        originText: `It’s the Sahara.`,
      },
      {
        label: 'Sara',
        labelColor: `var(--color-green-50)`,
        originText: `It’s Antarctica. `,
      },
      {
        label: 'Host',
        labelColor: `var(--color-purple-50)`,
        originText: `The answer is … Antarctica!`,
      },
      {
        label: 'Namjun',
        labelColor: `var(--color-yellow-100)`,
        originText: `Antarctica? I thought a desert has to be hot and sandy.`,
      },
      {
        label: 'Host',
        labelColor: `var(--color-purple-50)`,
        originText: `Well, it doesn’t need to be hot or sandy. We have AI Joe here. Hey Joe, can you tell us more about deserts?`,
      },
      {
        label: 'AI Joe',
        labelColor: `var(--color-blue-100)`,
        originText: `A desert is a dry place. It can be cold or hot. The Sahara is the largest hot desert in the world. But Antarctica is larger than the Sahara. So Antarctica is the world’s largest desert.`,
      },
    ],
  },
  P02: {},
  P03: {
    body: [
      {
        label: 'Host',
        labelColor: `var(--color-purple-50)`,
        originText: `Here is the first question.`,
        translation: `첫 번째 문제입니다.`,
      },
      {
        originText: `What is the largest desert in the world?`,
        translation: `세계에서 가장 큰 사막은 무엇일까요?`,
      },
      {
        label: 'Namjun',
        labelColor: `var(--color-yellow-100)`,
        originText: `It’s the Sahara.`,
        translation: `그것은 사하라 사막입니다.`,
      },
      {
        label: 'Sara',
        labelColor: `var(--color-green-50)`,
        originText: `It’s Antarctica. `,
        translation: `그것은 남극 대륙입니다. `,
      },
      {
        label: 'Host',
        labelColor: `var(--color-purple-50)`,
        originText: `The answer is … Antarctica!`,
        translation: `정답은… 남극 대륙입니다!`,
      },
      {
        label: 'Namjun',
        labelColor: `var(--color-yellow-100)`,
        originText: `Antarctica?`,
        translation: `남극 대륙이라고요?`,
      },
      {
        originText: `I thought a desert has to be hot and sandy. `,
        translation: `저는 사막은 덥고 모래로 뒤덮여야 한다고 생각했는데요. `,
      },
      {
        label: 'Host',
        labelColor: `var(--color-purple-50)`,
        originText: `Well, it doesn’t need to be hot or sandy. `,
        translation: `음, 사막이라고 꼭 덥거나 모래로 뒤덮일 필요는 없어요. `,
      },
      {
        originText: `We have AI Joe here.`,
        translation: `여기 AI Joe가 나와 있어요.`,
      },
      {
        originText: `Hey Joe, can you tell us more about deserts?`,
        translation: `이봐요 Joe, 우리에게 사막에 대해서 더 말해 줄 수 있나요?`,
      },
      {
        label: 'AI Joe',
        labelColor: `var(--color-blue-100)`,
        originText: `A desert is a dry place. `,
        translation: `사막은 건조한 곳입니다. `,
      },
      {
        originText: `It can be cold or hot. `,
        translation: `그것은 춥거나 더울 수 있어요. `,
      },
      {
        originText: `The Sahara is the largest hot desert in the world. `,
        translation: `사하라 사막은 세계에서 가장 큰 더운 사막이죠. `,
      },
      {
        originText: `But Antarctica is larger than the Sahara. `,
        translation: `그러나 남극 대륙은 사하라 사막보다 더 커요. `,
      },
      {
        originText: `So Antarctica is the world’s largest desert.`,
        translation: `그러므로 남극 대륙이 세계에서 가장 큰 사막입니다.`,
      },
    ],
  },
};
