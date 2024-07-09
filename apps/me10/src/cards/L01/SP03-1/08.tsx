import HE04001, { IListenAndAnswer } from '@maidt-cntn/pages/HE-040-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `This box is my school survival kit.`,
      translation: `이 상자는 저의 학교 생존 키트예요. `,
    },
    {
      originText: `First, I have some sticky notes.`,
      translation: `첫째로, 붙임쪽지가 있어요.`,
    },
    {
      originText: `I write your names and remember them.`,
      translation: `여러분의 이름을 적어서 기억해요.`,
    },
    {
      originText: `Next, I have some candy.`,
      translation: `그 다음으로 사탕이 있어요.`,
    },
    {
      originText: `They're sweet, like your smiles.`,
      translation: `이 사탕들은 여러분의 미소처럼 달콤하답니다.`,
    },
  ];

  return (
    <HE04001
      headerInfo={headerInfo}
      imageSrc='/L01/C06/A03/ME1-L01-C06-A03-P01-02.jpg'
      altText={'선생님이 자신의 생존 키트를 소개하고 있다.'}
      data={data}
    />
  );
};

export default P08;
