import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  Image,
  IQuestionProps,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const textContentA03 = {
  title: `From Shadows to Spotlights`,
  content: `Welcome to the Dream Art Gallery! I’m Isabel Williams, the docent for the From Shadows to Spotlights exhibit. Today, you’re going to meet three amazing artists who never gave up on their art, despite challenges in their lives. Each artist has a unique painting style and story that has made their work highly valued. Let’s explore each artist’s life and artwork.
  The first artist we’re going to examine is Bill Traylor. Traylor was born into slavery in the U.S. in 1853 and spent his early life working on a cotton farm in Alabama. Although he became a free man after the American Civil War, he still had to face racial discrimination, working for very low wages on the farm. Later, when he was around 70 years old, Traylor moved to the city of Montgomery, Alabama, where he found a job in a factory. It wasn’t until he was 85 years old and became too ill to work that he turned to drawing to express his life experiences. Now, we’re going to look at some of his paintings, starting with Mean Dog and Man and Large Dog. Traylor had a strong fear of dogs because they had often been used on farms to watch and hunt slaves. His fear of dogs is expressed strongly in these pieces. In contrast, Woman with Purse and Man with Umbrella portrays the free lives of African Americans that he observed on the streets of Montgomery. Using simple shapes and colors, Traylor captured complex moments in American history from slavery to freedom. As a result, he’s now considered an important figure in American folk art.
  Next, we have Maud Lewis, a renowned artist known for her heart-warming paintings. Born in a small Canadian town in 1903, Lewis suffered from physical weaknesses such as distorted shoulders and fingers. This limited her mobility and caused her to drop out of school. To make a living, she began to paint and sell Christmas cards. When her parents passed away, Lewis went to live with her aunt in Digby, Nova Scotia, where she met her future husband, Everett Lewis. After marrying, the couple spent the rest of their lives there, and Lewis continued to paint. She often depicted the Digby landscapes in paintings such as Edge of Digby Harbor. Her artwork used a mixture of bright and vivid oil paints and simple forms, generating an original, innovative style. Although her physical limitations confined her to a small cottage, her talent and imagination were both limitless. In Red Sleigh, red maple leaves appear on a special winter landscape, and Pair of Oxen shows decorated cows standing in a flower field. With these features, Lewis’ paintings create a magical quality, like that of a fairy tale. As her paintings gradually gained popularity, her story inspired many people and was later made into books and movies. Maud Lewis expressed her love for the world through her paintings and became an iconic figure in Canadian folk art.
  Now let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark. When observing her paintings, you may notice a common theme — they all feature female figures. Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school. After that, she even studied abroad in Paris, which was unusual for women at the time. Thanks to her mother’s encouragement, she was able to take advantage of these opportunities. Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties. Ancher differed from other artists of that era, who depicted women as still life subjects. In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing Fisherman’s Wife. She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark. In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed. Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent. Her paintings continue to amaze us to this day.
  Thank you for joining this guided tour, and I hope my explanations have aided you in appreciating these paintings. Please take some time to further explore the exhibition.`,
};

const imgContentA03P01 = {
  imgSrc: `/L03/C07/A03/HE2-L03-C07-A03-P01.jpg`,
  imgAlt: `모자를 쓰고 앞치마를 입은 채 한 손에 붓을 들고 환하게 웃는 여자 화가
  말풍선
  Hi, I’m Anna Ancher. I’m excited to share my artworks with you. The Maid in the Kitchen and
  Sewing Fisherman’s Wife focus on portraying women actively engaged in everyday tasks.
  Additionally, ...
  안경을 쓰고 한 손에 붓과 다른 한 손에 팔레트를 들고 캔버스 앞에 앉아 있는 남자 화가
  말풍선
  Hello, I’m Maud Lewis. My art captures the beauty of the world around me. In ...
  앞치마를 입은 채 한 손에 붓과 다른 한 손에 팔레트를 들고 캔버스 앞에 서서 환하게 웃고 있는 여자 화가
  말풍선 Hi, I’m Bill Traylor. ...`,
};

const P01 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, content } = textContentA03;
  const { imgSrc, imgAlt } = imgContentA03P01;

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Act Out',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Imagine you are one of the three artists and introduce your paintings based on the main text.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Box hAlign='right' paddingRight={'40px'}>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문 보기' onClick={handleButtonClick} useRound />
      </Box>
      <ImgBox>
        <PinchZoom>
          <Image type={EImageType.IMG} src={imgSrc} width='600px' height='330px' />
          <Box type='hidden'>{imgAlt}</Box>
        </PinchZoom>
      </ImgBox>

      <Dialog width={893} height={458} isShow={isDialogOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px' tabIndex={105}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>

        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'250px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography size={EStyleFontSizes.MEDIUM}>{paragraph}</Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;
