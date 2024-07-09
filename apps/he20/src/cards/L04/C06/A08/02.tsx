import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};

const audioInfo = {
  audioSrc: '/L04/C06/A08/HE2-L04-C06-A08-P02.mp3',
  captionSrc: '/L04/C06/A08/HE2-L04-C06-A08-P02.srt',
};

const imageSrc = '/L04/C06/A08/HE2-L04-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <p>이 이미지는 의수와 의족의 역사적 발전 과정을 보여주는 연표이다.</p>
    <p>950-710 B.C.경: Wooden Toe 초기 형태의 의족으로, 나무로 만들어진 발가락 사진</p>
    <p>1508년경: Götz's Iron Hand 금속으로 만든 초기 의수 사진</p>
    <p>1914-1918년: World War I 1939-1945년: World War II 의족을 하고 앉아있는 남성 사진</p>
    <p>1945년: Bert Shepard's Leg: </p>
    <p>Today: AI-Powered Artificial Limbs: 이미지의 오른쪽에는 현대적인 AI 의수를 사용하고 있는 여자 사진 </p>
  </>
);

const contentTitle = ['Revolutionizing Mobility:', 'The Evolution of Artificial Limbs'];
const contentText = (
  <>
    <Typography>
      &nbsp;&nbsp;Artificial limbs, designed to replace natural arms or legs, have a rich history dating back to ancient times. An interesting example
      is the discovery of a wooden toe on an Egyptian mummy from around 950 B.C. In the 16th century, a German knight known as Götz of the Iron Hand
      made himself an iron arm with spring-operated fingers so that he could hold his weapon more tightly. During the World Wars of the 20th century,
      the demand for artificial limbs increased significantly as injured soldiers sought replacements, resulting in remarkable advances in artificial
      limb technology. Bert Shepard, a soldier who had lost his leg during World War II, made an impressive return to Major League Baseball in 1945
      with an artificial leg, showing the potential of artificial limb technology. Today, artificial limbs are advancing even further thanks to the
      integration of cutting-edge technologies such as robotics and artificial intelligence (AI). This integration enables users to make complex
      movements and control their artificial limbs with their thoughts. These advancements empower people with limb loss, giving them the freedom and
      opportunity to lead better lives.
    </Typography>
  </>
);

const info: IHE01602Info = {
  imageSrc: imageSrc,
  altText: '',
  hiddenAltText: imageAlt,
  text: contentText,
  title: contentTitle,
  imageWidth: '346px',
};

const P02 = () => {
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P02;
