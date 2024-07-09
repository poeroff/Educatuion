import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Viewing Critically : Deep Learning',
};

const audioInfo = {
  audioSrc: '/L02/C06/A08/HE2-L02-C06-A08-P02.mp3',
  captionSrc: '/L02/C06/A08/HE2-L02-C06-A08-P02.srt',
};

const imageSrc = '/L02/C06/A08/HE2-L02-C06-A08-P02.jpg';
const imageAlt = (
  <>
    <p>이 이미지는 두 개의 만화 스타일 삽화를 나란히 보여준다.</p>
    <p>
      왼쪽 이미지는 "How They're Acting - And How They Feel"이라는 제목을 가지고 있다. 이미지에는 여섯 명의 남성들이 웃고 있는 모습과 찡그리는 모습이
      그려져 있다. 웃고 있는 모습은 위쪽에, 찡그리는 모습은 아래쪽에 있다. 이 이미지는 사람들이 외부적으로는 어떻게 행동하고 있는지와 내면적으로
      어떻게 느끼고 있는지의 차이를 보여준다.
    </p>
    <p>
      오른쪽 이미지는 "Steve Lee"라는 이름이 적힌 티셔츠를 입은 남성이 휴대폰을 보며 "No! Not again! I hit the payment button!"이라고 외치는 모습을
      보여준다. 휴대폰 화면에는 "Payment Successful"이라고 적혀 있다. 그 옆에는 빨간 뱀이 "Sss... thank you, Ssssteve... One of my ssspecial, ssneaky
      dark patterns... sss..."라고 말하고 있다. 이 이미지는 사용자가 의도치 않게 결제 버튼을 눌러 결제가 완료된 상황을 보여주며, 뱀은 교활한 디자인
      패턴이 사용자로 하여금 실수를 유도한 것임을 암시한다.
    </p>
  </>
);

const contentTitle = ['The Power of Editorial Cartoons'];

const contentText = (
  <>
    <Typography>
      &nbsp;&nbsp;Editorial cartoons are a type of visual art that employs humor and exaggeration to challenge conventional thinking about social,
      political, or cultural issues. Despite their humorous appearance, their true purpose is to promote discussion about socially significant issues.
      To achieve this, cartoonists often emphasize or exaggerate unique physical features of characters, including public or political figures, to
      create humor. Symbols are also used to represent important concepts or ideas. For instance, a dollar sign may signify money, a wall could
      represent division, and a snake probably relates to deception. Captions, groups of words written on or below pictures, further clarify the
      cartoonist’s message. A notable example is Clifford Berryman’s skillful use of characters and captions to convey the emotions of the three U.S.
      presidential candidates in 1912. This highlights the contrast between their external confidence and their actual anxiety. Similarly, in the
      cartoon criticizing dark patterns, symbols and captions effectively depict consumers falling prey to the manipulative practices of companies,
      symbolized by a snake. By using visualization strategies, editorial cartoons encourage individuals to reconsider their perspectives.
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
