import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 3',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [{ audioSrc: '/L05/C04/A06/EE4-L05-C04-A06-P01.mp3' }, { audioSrc: '/L05/C04/A06/EE4-L05-C04-A06-P02.mp3' }];

  const keyInfo = [0, 1];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'Let’s play soccer.', answer: '우리 축구하자.', color: '#E2F2FF' },
    { key: 0, type: 'G', question: 'Sure.', answer: '좋아.', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'Let’s play baseball.', answer: '우리 야구하자.', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'Sure. I like baseball.', answer: '그래. 난 야구를 좋아해.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P03;
