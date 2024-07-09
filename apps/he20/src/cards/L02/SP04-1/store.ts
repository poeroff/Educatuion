import { atom } from 'recoil';

export const L02SP04_1 = atom<object>({
  key: 'L02SP04_1',
  default: {
    p05: {
      answer1: '',
      solution1: 'cannot',
      examples: ['Jimmy is in Africa. You', '___', 'have seen him in Korea.'],
      options: ['must', 'cannot', 'should not'],
      translations: ['Jimmy는 아프리카에 있다. 네가 그를 한국에서 봤을 리가 없다.'],
      isCorrect: false,
      isSubmitted: false,
    },

    p06: {
      answer1: '',
      solution1: 'consume',
      examples: ['The expert suggested that people', '___', 'less sugar to keep', 'their teeth healthy.'],
      options: ['consume', 'consumed', 'were consuming'],
      translations: ['그 전문가는 사람들이 그들의 치아를 건강하게 유지하기 위해 설탕을 덜 섭취해야 한다고 제안했다.'],
      isCorrect: false,
      isSubmitted: false,
    },

    p07: {
      answer1: [],
      solution1: ['Mary', 'insisted that', 'we', 'complete', 'the task quickly'],
      correctAnswer: 'Mary insisted that we complete the task quickly.',
      examples: ['Mary는 우리가 그 일을 빨리 완수해야 한다고 주장했다.'],
      options: ['complete', 'we', 'the task quickly', 'insisted that', 'Mary'],
      isCorrect: false,
      isSubmitted: false,
    },

    p08: {
      answer1: [],
      solution1: ['I', 'recommended that', 'he', 'apply for', 'the position'],
      correctAnswer: 'I recommended that he apply for the position.',
      examples: ['나는 그에게 그 자리에 지원하라고 권했다.'],
      options: ['the position', 'I', 'apply for', 'recommended that', 'he'],
      isCorrect: false,
      isSubmitted: false,
    },

    p09: {
      answer1: -1,
      solution1: 5,
      examples: [
        'The kitchen sink doesn’t work. We [must/should] have repaired the leak sooner.',
        'The lights are still on in the living room. I [may/should] have forgotten to turn them off.',
        `Emily always arrives early to meetings. She [must/cannot] have missed today's presentation.`,
      ],
      options: ['must-may-must', 'must-should-must', 'should-may-must', 'should-should-cannot', 'should-may-cannot'],
      correctAnswer: '5',
      explanation: `첫 번째 문장에서는 ‘~했었어야 했는데 (하지 못했다)’라는 과거의 후회를, 두 번째 문장에서는 ‘~했었을지도 모른다’라는 과거의 추측을, 세 번째 문장에서는 ‘~했을 리가 없다’라는 과거의 추측을 나타내는 것이 문맥상 자연스러우므로, 각각 should have p.p., may have p.p., cannot have p.p.를 써주는 것이 자연스럽다. 따라서 각 네모 안에 어법에 맞는 표현으로 가장 적절한 것을 고르면 5번이다.`,
      translations: [
        '• 주방 싱크대가 작동하지 않는다. 누수를 좀 더 빨리 수리했었어야 했다.',
        '• 거실에 불이 아직 켜져 있다. 내가 불 끄는 걸 잊었을지도 모른다.',
        '• Emily는 항상 회의에 일찍 도착한다. 오늘 발표를 놓쳤을 리가 없다.',
      ],
      isCorrect: false,
      isSubmitted: false,
    },

    p10: {
      answer1: -1,
      solution1: 5,
      examples: [],
      options: [
        'He insisted that he $#had#$ never been to the scene of the accident before.',
        'The school required that students $#choose#$ their own representative.',
        'A number of studies suggest that regular exercise $#enhances#$ brain function.',
        'Tom’s teacher proposes that he $#make#$ study groups for better understanding of the subject.',
        'The environmental group advised that each individual $#participates#$ in village clean-up events.',
      ],
      correctAnswer: '5',
      explanation: `요구, 제안, 충고를 나타내는 동사가 사용된 경우 종속절에 당위의 의미가 포함되어 있으면 <(should)+동사원형>을 써야 하므로 5번의 participates를 동사원형 participate로 고쳐야 한다.`,
      translations: [
        '1. 그는 사고 현장에 가본 적이 없다고 주장했다.',
        '2. 학교는 학생들에게 그들의 대표를 선정하라고 요구했다.',
        '3. 많은 연구는 규칙적인 운동이 뇌 기능을 향상한다고 시사한다.',
        '4. Tom의 선생님은 그가 그 과목을 더 잘 이해하기 위해서 스터디 그룹을 만들어야만 한다고 제안한다.',
        '5. 환경 단체는 각 개인이 마을 정화 행사에 참여할 것을 권고했다.',
      ],
      isCorrect: false,
      isSubmitted: false,
    },

    p11: {
      answer1: -1,
      solution1: 2,
      examples: [
        'I’m writing to request a full refund for the shirt (1)$#that#$ I purchased from your website.',
        'Unfortunately, the color of the shirt is very different from the photo on the website. I think that I (2)$#should#$ see it in person before buying. I would therefore like to request that you (3)$#provide#$ a full refund for the product to my Safe Bank account, 012-34-56789. If you have any questions about my request, please feel (4)$#free#$ to contact me at jaypark@example.com. I look forward to (5)$#hearing#$ back from you soon.',
      ],
      options: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correctAnswer: '2',
      explanation: `웹사이트에서 구매한 셔츠의 색상이 실제 사진과 매우 달라 환불을 요청하는 맥락이므로, 구매 전에 그것을 직접 봤어야만 했다는 후회나 아쉬움을 표현하는 상황이다. 따라서 2번 should see를 ‘~했었어야 했는데 (하지 못했다)’를 의미하는 should have seen으로 고쳐야 한다.`,
      translations: [
        '귀하의 웹사이트에서 구매한 셔츠에 대해 전액 환불을 요청하고자 메일을 보냅니다. 안타깝게도 셔츠의 색상이 웹사이트의 사진과 매우 다릅니다. 저는 구매하기 전에 제가 그것을 직접 봤어야만 했다고 생각합니다. 따라서 제품에 대한 전액 환불을 저의 Safe Bank 계좌 012-34-56789로 요청합니다. 제 요청에 대해 궁금한 점이 있으시면 언제든지 jaypark@example.com으로 연락해 주세요. 귀하로부터 곧 답변을 듣기를 고대하겠습니다.',
      ],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
