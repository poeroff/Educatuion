import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C03A09P01, { IVideoPlayerProps } from '@/Pages/EEL01C03A09P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Play Together 3',
  };

  const questionInfo: IQuestionProps = {
    text: '활동 방법을 보고, ‘릴레이 인사 편지’ 활동을 해 봅시다.',
  };

  const videoInfo: IVideoPlayerProps = {
    videoSrc: '/L01/C03/A09/EE4-L01-C03-A09-01.mp4',
    width: 'fit-content',
    height: '306px',
  };

  const data = [
    '6명씩 한 모둠을 이루고, 교사는 학생들에게 종이를 두 장씩 나누어 준다.',
    '종이 한 장에는 자신의 이름과 morning, afternoon, evening 중 하나를 쓰고, 상자 A에 넣는다.',
    '다른 종이에는 good, great 중 하나를 쓰고, 상자 B에 넣는다.',
    '가위바위보를 해서 이긴 학생(S1)은 상자 A에서 종이 한 장을 골라 낱말과 이름을 보고 해당 학생에게 인사하며 안부를 묻는다.\nS1: (‘evening, 민지’가 쓰인 종이를 보고) Good evening, Minji. How are you?',
    '이름이 불린 학생(S2)은 상자 B에서 종이 한 장을 골라 쓰인 낱말에 맞게 대답한다.',
    'S2부터 다시 같은 방법으로 상자가 빌 때까지 놀이를 계속한다.',
  ];

  return <EEL01C03A09P01 headerInfo={headerInfo} questionInfo={questionInfo} videoInfo={videoInfo} data={data} />;
};

export default P01;
