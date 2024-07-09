import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const headerInfo = {
  headerText: 'Gathering of the Whakapapa (2)',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C06/A04/HE1-L02-C06-A04-P01.mp3',
  captionSrc: 'HE1-L02-C06-A04-P01.srt',
};

const contentText = (
  <Typography>
    &nbsp;
    {`For some time, my grandfather had been busy writing down the village genealogy, known as the whakapapa. The whakapapa had been in his old house. But then came the night of the fire, which ran through the house and destroyed our past. In only one night, everything we knew was gone. Nani Tama, in despair, went to stay with his daughter, my Auntie Hiraina. Trying to f ind a way out of the ashes of the past, Nani began to write the whakapapa again with his shaky hands. He chanted the names of the ancestors, joining the past to the present once more. The village went quiet and listened to his chanting. His voice traveled along the lines of our genealogy, searching back across the centuries. Sometimes, there were lines that were diff icult to remember. Then his voice suddenly stopped in the middle of the chant. The village waited in worried silence until the next name burst out of his mouth. It took Nani Tama almost two years to gather most of the whakapapa, but there were still missing names he needed to fill in. Now, he wanted me to drive him to Murupara to finish his work.`}
  </Typography>
);
const info: IHE01602Info = {
  altText: `할아버지가 와카파파의 일대기를 쓰고 있다.
  집과 일대기가 화재에 의해 불타고 있다.
  할아버지가 나에게 무루파라로 태워다 줄 것을 부탁하고 있다.
  `,
  text: contentText,
  imageSrc: '/L02/C06/A04/HE1-L02-C06-A04-P01.jpg',
  imageWidth: '346px',
  imageHeight: '414px',
};

const P01 = () => {
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
