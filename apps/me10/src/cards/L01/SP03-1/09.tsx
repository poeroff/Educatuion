import HE04001, { IListenAndAnswer } from '@maidt-cntn/pages/HE-040-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '주요 내용 이해하기',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `Ms. Seo: Now, what do you want in your school survival kit?`,
      translation: `서 선생님: 자, 여러분의 학교 생존 키트에는 무엇을 원하나요?`,
    },
    {
      originText: `Somin: I look in the mirror and say, "Just be you!"`,
      translation: `소민: 저는 거울을 보고 “그냥 너답게 해!”라고 말해요.`,
    },
    {
      originText: `Jiwon: I hold the ball tightly. Then my stress goes away.`,
      translation: `지원: 저는 공을 꽉 쥐어요. 그러면 스트레스가 사라져요.`,
    },
    {
      originText: `Mike: An eraser! It erases my mistakes.`,
      translation: `마이크: 지우개요! 그것은 저희 실수를 지워 줘요.`,
    },
    {
      originText: `Emily: I need a Band-Aid! My feelings get hurt sometimes.`,
      translation: `에밀리: 저는 반창고가 필요해요! 저는 때때로 상처받아요.`,
    },
  ];

  return (
    <HE04001
      headerInfo={headerInfo}
      imageSrc='/L01/C06/A06/ME1-L01-C06-A06-P01.jpg'
      altText={'원탁에 학생들이 둘러 앉아 선생님이 보여주시는 생존 키트를 보고 이야기한다.'}
      data={data}
    />
  );
};

export default P09;
