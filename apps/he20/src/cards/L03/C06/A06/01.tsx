import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'From Shadows to Spotlights (4)',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A06/HE2-L03-C06-A06-P01.mp3',
    captionSrc: '/L03/C06/A06/HE2-L03-C06-A06-P01.srt',
  };

  const text = (
    <Typography usePre>
      {`Now let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark. When observing her paintings, you may notice a common theme — they all feature female figures. Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school. After that, she even studied abroad in Paris, which was unusual for women at the time. Thanks to her mother’s encouragement, she was able to take advantage of these opportunities. Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties. Ancher differed from other artists of that era, who depicted women as still life subjects. In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing Fisherman’s Wife. She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark. In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed. Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent. Her paintings continue to amaze us to this day.\n\nThank you for joining this guided tour, and I hope my explanations have aided you in appreciating these paintings. Please take some time to further explore the exhibition.`}
    </Typography>
  );

  const hiddenAltText = (
    <>
      <p>Anna Ancher의 그림 세 점이 벽에 걸려 있다.</p>
      <p>The Maid in the Kitchen, 주방에서 일하는 여성의 그림</p>
      <p>Sewing Fisherman’s Wife, 바느질하는 여성의 그림</p>
      <p>Sunlight in the Blue Room, 햇살이 들어오는 파란 방 창가에 서 있는 여성의 그림</p>
      <p>그리고 그림 앞에 두 여자가 그 그림들을 감상하고 있다.</p>
    </>
  );

  const info: IHE01602Info = {
    altText: '',
    text: text,
    imageSrc: '/L03/C06/A06/HE2-L03-C06-A06-P01.jpg',
    imageWidth: '300px',
    imageHeight: '360px',
    hiddenAltText: hiddenAltText,
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
