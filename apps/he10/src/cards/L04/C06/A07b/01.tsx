import { TMainHeaderInfoTypes, Typography, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A07/HE1-L04-C06-A07-P01.mp3',
    captionSrc: '/L04/C06/A07/HE1-L04-C06-A07-P01.srt',
  };

  const text = (
    <Typography>
      {`Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee. Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment. With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.`}
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '커피 찌꺼기가 재활용된 예시 사진들 . 왼쪽부터 순서대로 연료 , 섬유 , 재활용 컵 그리고 커피콩과 커피찌꺼기가 화분에 담겨있는 모습',
    text: text,
    imageSrc: '/L04/C06/A07/HE1-L04-C06-A07-P01.JPG',
    imageWidth: '346px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
