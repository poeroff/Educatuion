import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C04A04P03, { IListenAndAnswer } from '@/Pages/EEL01C04A04P03';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [{ audioSrc: '/L01/C04/A04/EE4-L01-C04-A04-P01.mp3' }, { audioSrc: '/L01/C04/A04/EE4-L01-C04-A04-P02.mp3' }];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'How are you?', answer: '기분이 어때?', color: '#E2F2FF' },
    { key: 0, type: 'G', question: '____________', answer: '', color: '#FFF0CC' },
    { key: 0, type: 'a', question: 'Not so good.', answer: '좋지 않아.', color: '#EFF0F2' },
    { key: 0, type: 'b', question: 'I’m great.', answer: '아주 좋아.', color: '#EFF0F2' },
    { key: 1, type: 'B', question: 'Good afternoon.', answer: '좋은 오후야.', color: '#E2F2FF' },
    { key: 1, type: 'G', question: '____________', answer: '', color: '#FFF0CC' },
    { key: 1, type: 'a', question: 'Good afternoon.', answer: '좋은 오후야.', color: '#EFF0F2' },
    { key: 1, type: 'b', question: 'Good evening.', answer: '좋은 저녁이야.', color: '#EFF0F2' },
  ];

  return <EEL01C04A04P03 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} />;
};

export default P03;
