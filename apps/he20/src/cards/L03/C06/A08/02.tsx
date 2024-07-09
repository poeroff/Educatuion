import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};

const audioInfo = {
  audioSrc: '/L03/C06/A08/HE2-L03-C06-A08-P02.mp3',
  captionSrc: '/L03/C06/A08/HE2-L03-C06-A08-P02.srt',
};

const imageSrc = '/L03/C06/A08/HE2-L03-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <p>이 이미지는 두 개의 다른 장면을 보여준다. 왼쪽 이미지에는 "Docent"라는 제목이 있고, 오른쪽 이미지에는 "Curator"라는 제목이 있다.</p>
    <p>
      Docent: 왼쪽 이미지에는 미술관이나 박물관에서 작품을 설명하고 있는 도슨트가 보인다. 도슨트는 방문객 그룹에게 작품에 대해 설명하고 있다. 도슨트는
      방문객들과 소통하며 교육적인 정보를 제공하는 역할을 한다.
    </p>
    <p>Curator: 오른쪽 이미지에는 큐레이터가 작품을 검토하고 있는 모습이 보인다. 그는 작품의 상태를 점검하고 전시 준비를 하고 있다.</p>
    <p>이 이미지는 도슨트와 큐레이터의 역할과 그들의 차이점을 시각적으로 나타내고 있다.</p>
  </>
);

const contentTitle = ['Docent vs. curator:', 'People Keeping the Arts Enjoyable'];

const contentText = (
  <>
    <Typography>
      &nbsp;&nbsp;If you have ever been to an art museum, you may have encountered docents and curators. While these two roles may appear similar,
      they actually have quite different responsibilities, requiring different skills. With the word docent coming from a Latin word meaning “to
      teach,” docents are guides who lead museum tours and provide information about the artworks and artists featured in an exhibition. They are
      usually volunteers who have a passion for art and enjoy sharing their knowledge. To carry out their responsibilities effectively, docents need
      specialized training in presentation and communication skills. On the other hand, curators are professionals who design and organize
      exhibitions, with the word curator coming from a Latin word meaning “to take care of.” Curators determine the main theme of each exhibition,
      select artworks that fit with the theme, and arrange them in an engaging way which captivates the audience. Curators are typically employed by
      museums and are expected to possess advanced degrees in art history, museum studies, or a related field. Despite their distinct roles, both
      docents and curators share a common goal: enriching every visitor’s experience.
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
