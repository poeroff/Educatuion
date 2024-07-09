import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};
const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C06/A08/HE2-L01-C06-A08-P02.mp3',
  captionSrc: '/L01/C06/A08/HE2-L01-C06-A08-P02.srt',
};

const imageSrc = '/L01/C06/A08/HE2-L01-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <h1>이 이미지는 전 세계 곰들의 분포를 보여주는 지도이다. 아래는 각 곰의 분포 지역에 대한 설명이다:</h1>
    <p>Polar Bear: 북극 지역에 분포해 있다.</p>
    <p>Brown Bear: 북미와 유럽, 아시아의 넓은 지역에 분포해 있다.</p>
    <p>American Black Bear: 북미 지역에 분포해 있다.</p>
    <p>Andean Bear: 남미의 안데스 산맥 지역에 분포해 있다.</p>
    <p>Giant Panda: 중국 지역에 분포해 있다.</p>
    <p>Sloth Bear: 인도와 스리랑카 지역에 분포해 있다.</p>
    <p>Asiatic Black Bear: 아시아 지역에 분포해 있다.</p>
    <p>Sun Bear: 동남아시아 지역에 분포해 있다.</p>
    <p>이 지도는 곰들이 전 세계적으로 다양한 지역에 서식하고 있음을 시각적으로 나타낸다.</p>
  </>
);

const contentTitle = ['Let Bears Bear the Right to Live Freely'];
const contentText = (
  <Typography style={{ whiteSpace: 'pre-wrap' }}>
    {'   '}
    Bears are a fascinating group of animals with eight species, all living in very different habitats around the world. Polar bears, for example,
    live in the Arctic, whereas Andean bears live in South America. These bears should have the freedom to live, but they are often killed when they
    come into contact with humans. One of the worst examples of this is bear bile farming. Brown bears in Eurasia and North America, Sun bears in
    Southeast Asia, and Asiatic black bears in Asia are often hunted and kept illegally for their bile, which is sold at a high price for traditional
    Asian medicine. Although bile farming is prohibited in many countries, it continues due to the constant demand. Governments and animal welfare
    organizations make persistent attempts to find these farms and rescue the bears, allowing them to live in bear sanctuaries or other safe places.
    Since UNESCO stated in 1978 that animals are born with the right to be respected, progress has been made in animal rights. However, some animals
    are still not fully protected outside the law, and need more of our attention and care.
  </Typography>
);

const info: IHE01602Info = {
  imageSrc: imageSrc,
  altText: '',
  hiddenAltText: imageAlt,
  title: contentTitle,
  text: contentText,
};

const P02 = () => {
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P02;
