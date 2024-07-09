import HE04001, { IListenAndAnswer } from '@maidt-cntn/pages/HE-040-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Today is the first day of middle school.',
      translation: '오늘은 중학교 첫날이네요.',
    },
    {
      originText: 'Are you nervous?',
      translation: '긴장되나요?',
    },
    {
      originText: `I'm also nervous, but I feel okay with this box.`,
      translation: '저도 긴장되지만, 이 상자가 있으면 괜찮아요.',
    },
  ];

  return (
    <HE04001
      headerInfo={headerInfo}
      imageSrc='/L01/C06/A04/ME1-L01-C06-A04-P01.jpg'
      altText={'교실에서 학생들이 책상에 앉아 선생님이 보여주시는 생존 키트를 보고 있다.'}
      data={data}
    />
  );
};

export default P07;
