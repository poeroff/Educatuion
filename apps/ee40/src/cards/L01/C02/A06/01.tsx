import EEL01C02A06P01 from '@/Pages/EEL01C02A06P01';

const layout = {
  headerInfo: { headerText: 'Play Together 2' },
  hQuestionInfo: { text: '활동 방법을 보고, ‘내 짝은 어디 있을까?’ 활동을 해 봅시다.' },
};

const modalInfo = [
  { text: '교사는 칠판에 ‘아침’ 카드를 붙이고 1회 시작을 알린다.' },
  {
    text: `학생들은 그림 카드 중 한 장을 골라 교실을 돌아다니며 아침 인사를 하고 안부를 묻고 답하며 기분이 같은 짝을 찾는다. 
                S1: Good morning. How are you?
                S2: Not so good. How are you?
                S1: Not so good.
    `,
  },
  { text: '기분이 다르면 헤어지고, 같으면 교사에게 함께 카드를 보여준다.' },
  { text: '정해진 시간이 지나면 교사가 ‘점심’ 카드를 붙이고 2회를 시작한다.' },
  { text: '같은 방법으로 놀이를 3회까지 반복한다.' },
];
const videoInfo = {
  videoSrc: '/L01/C02/A06/EE4-L01-C02-A06-P01.mp4',
  videoSrt: '/L01/C02/A06/EE4-L01-C02-A06-P01.srt',
};

const downloadInfo = { downloadSrc: '/L01/C02/A06/EE4-L01-C02-A06-P01.zip' };

const P01 = () => {
  return <EEL01C02A06P01 layout={layout} contentInfo={{ modalInfo, videoInfo, downloadInfo }}></EEL01C02A06P01>;
};

export default P01;
