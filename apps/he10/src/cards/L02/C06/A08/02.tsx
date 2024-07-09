import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};
const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C06/A08/HE1-L02-C06-A08-P02.mp3',
  captionSrc: '/L02/C06/A08/HE1-L02-C06-A08-P02.srt',
};

const imageSrc = '/L02/C06/A08/HE1-L02-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <p>이 이미지에는 전통 마오리 복장을 입은 두 사람이 푸른 자연 풍경 속에 서 있다.</p>
    <p>왼쪽에 있는 남성은 전통 마오리 얼굴 문신을 하고 있으며, 전통적인 망토를 걸치고 있다.</p>
    <p>오른쪽에 있는 여성도 전통 얼굴 문신을 하고 있으며, 전통적인 직물 의상을 입고 있다.</p>
    <p>또한, 사진의 양쪽에는 두 개의 삽화 캐릭터가 있다.</p>
    <p>왼쪽 캐릭터는 흰 머리와 콧수염, 턱수염을 가진 노인이고, 오른쪽 캐릭터는 긴 곱슬머리와 평온한 표정을 가진 젊은 사람이다.</p>
    <p>두 삽화 캐릭터 모두 사진 속 사람들과 비슷한 얼굴 문신을 하고 있다.</p>
  </>
);

const contentTitle = ['Ta- Moko: A Record of an Individual’s Path'];
const contentText = (
  <Typography style={{ whiteSpace: 'pre-wrap' }}>
    {'   '}
    Ta‐ moko is the traditional Maori art of tattooing, which has been a culturally significant practice of the Maori for thousands of years. It is
    not only decorative but also symbolic of an individual’s journey from their past to their present. Each curved line and pattern of ta‐ moko
    represents a person’s whakapapa (genealogy), social positions, and personal accomplishments. This explains why no two ta‐ moko designs look the
    same. Traditionally, the Maori have considered the head to be the most sacred part of the body, so they mainly tattoo their faces. Men typically
    wear ta‐ moko over their entire faces, while women have it on their lips and chins. The Maori start getting these designs in their teenage years,
    and as they grow older, more lines and shapes are added to their tattoos to reflect their life experiences. Tattooing traditionally held great
    importance as a rite of passage throughout their lives. Although ta‐ moko is less common these days, it is still practiced today by Maori people,
    who hope to preserve their traditions and heritage for the next generation. `
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
