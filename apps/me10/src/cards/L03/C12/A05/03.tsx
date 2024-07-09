import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };
  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Today, we had a new member on our team.',
      translation: '오늘, 우리는 우리 팀에 새 멤버를 맞이했다.',
    },
    {
      originText: 'Her name is Cathy and she is a cat!',
      translation: '그녀의 이름은 Cathy이고 고양이이다!',
    },
    {
      originText: 'Cats are not good at playing fetch.',
      translation: '고양이는 페치(공 물어 오기 놀이)를 잘 못한다.',
    },
    {
      originText: 'We were worried.',
      translation: '우리는 걱정되었다.',
    },
    {
      originText: 'But she surprised us.',
      translation: '그러나 그녀는 우리를 놀라게 했다.',
    },
    {
      originText: 'She was great at the ball game.',
      translation: '그녀는 공 놀이를 무척 잘했다.',
    },
    {
      originText: 'After the game, we had another new member, Cookie.',
      translation: '경기 후에 우리는 또 다른 새 멤버인 Cookie를 맞이했다.',
    },
    {
      originText: 'He is a goose!',
      translation: '그는 거위였다!',
    },
    {
      originText: 'I like him already.',
      translation: '나는 이미 그가 좋다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
