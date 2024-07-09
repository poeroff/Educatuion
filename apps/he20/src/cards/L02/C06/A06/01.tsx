import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { TMainHeaderInfoTypes, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A06/HE2-L02-C06-A06-P01.mp3',
    captionSrc: '/L02/C06/A06/HE2-L02-C06-A06-P01.srt',
  };

  const text = (
    <Typography>
      Dark patterns on digital platforms are becoming more complex and more prevalent. So, what is driving their growth? Over the years, online
      commerce has grown steadily, especially with the development of smart phones and other digital technologies. As the competition in online
      markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases. While these companies insist
      that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid marketing strategies. Rather,
      they suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText: (
      <>
        <p>
          ‘Morning Times'라는 웹사이트 페이지를 보여주고 있다. 상단에 'HOME', 'WORLD', 'BUSINESS', 'TECH', 'LIFE & ARTS', 'SPORTS', 'OPINION' 메뉴
          항목이 있고, 'BUSINESS'가 선택되어 있다. 제목은 "Dark Patterns: Deception or Marketing Strategy?"이고, 부제목은 "Companies and critics hold
          conflicting views on this issue."이다.
        </p>
        <p>
          오른쪽에는 만화 이미지가 있다. 한 남자가 스마트폰을 들고 있고, 화면에는 'Payment Successful!'이라고 적혀 있다. 남자는 머리를 감싸며 "No! Not
          again! I hit the payment button!"이라고 말한다. 그의 셔츠에는 'Steve Lee'라고 쓰여 있다. 그의 주변에는 빨간 뱀이 있고, 뱀은 "Sss... thank
          you, Ssssteve... One of my sssspecial, sssneaky dark patterns... sss..."라고 말한다.
        </p>
        <p>
          이 만화는 'Dark Patterns'라는 개념을 비꼬고 있다. 'Dark Patterns'는 사용자가 실수로 원하지 않는 행동을 하게 만드는 기만적인 디자인 패턴을
          의미한다.
        </p>
      </>
    ),
    text: text,
    imageSrc: '/L02/C06/A06/HE2-L02-C06-A06-P01.jpg',
    imageWidth: '350px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
