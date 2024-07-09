import { TMainHeaderInfoTypes, IAudioPlayerProps, Box, Scroll, Typography, ETypographyTypes, PinchZoom, Image, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IContentInfo {
  id: string;
  altText?: string[];
  rightText?: string[];
  bottomText?: string[];
  imageSrc?: string[];
  imageWidth?: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A03/ME1-L03-C06-A03-P01.mp3',
    captionSrc: '/L03/C06/A03/ME1-L03-C06-A03-P01.srt',
  };

  const title = 'We Have a Cat on Our Team!';

  const contentInfo: IContentInfo[] = [
    {
      id: `P1`,
      imageSrc: [`/L03/C06/A03/ME1-L03-C06-A03-P01-01.jpg`],
      altText: [`잔디밭에 강아지들이 모여 있다.`, `빨간색 호루라기를 차고 있는 갈색 강아지 뒤로 고양이 한 마리가 숨어 있는 모습`],
      rightText: [
        `   Coach Biscuit’s team was on the field for Saturday practice. “I have some exciting news for you. We have a new member,” Coach Biscuit said. “Everyone, let’s welcome our new friend. Cathy, please come out.”`,
      ],
    },

    {
      id: `P2`,
      imageSrc: [`/L03/C06/A03/ME1-L03-C06-A03-P01-02.jpg`],
      altText: [`가운데에 고양이 한 마리가 서 있는 모습`, `주위엔 고양이를 둘러싸고 있는 강아지들이 궁금한 표정 혹은 놀라운 표정을 짓고 있다.`],
      rightText: [
        `   “Coach, is the new member a cat?” Max shouted. “I can’t believe it,” Rusty said. “Let’s be nice to her!” said Coach Biscuit. But the dogs looked nervous. “We never had a cat on our team!” they said. “Maybe Cathy never had a dog on her team. Now, let’s play a game,” Coach Biscuit said.`,
      ],
      bottomText: [
        `“But can she play fetch? She’s not a dog. Only dogs can play fetch,” Rusty said. “Be nice! We can teach her,” another dog said softly.`,
      ],
    },

    {
      id: `P3`,
      imageSrc: [`/L03/C06/A03/ME1-L03-C06-A03-P01-03.jpg`],
      altText: [`고양이는 강아지들이 공놀이를 하는 것을 멀리서 지켜 보고 있다.`, `강아지들은 공놀이를 하다가 서로 부딪치고 넘어지는 모습`],
      rightText: [
        `   Coach Biscuit said, “Cathy, this is your first day. So you can watch and join the game anytime.” The game began. Cathy watched silently. “Can somebody get the ball? It’s going over the fence!” Rusty shouted. “I’ll get it!” Everyone looked at the ball and ran toward it. They bumped into each other and fell down.`,
      ],
    },
    {
      id: `P4`,
      imageSrc: [`/L03/C06/A03/ME1-L03-C06-A03-P01-04.jpg`],
      altText: [`고양이가 높이 점프를 해 공을 차고 있는 모습.`, `그 모습을 본 강아지들은 놀라워 하고 있다.`],
      rightText: [
        `   Then, Cathy jumped into the air and got the ball. She quickly passed it over. “Wow, Cathy! How did you do that?” The dogs were surprised.`,
      ],
    },
    {
      id: `P5`,
      imageSrc: [`/L03/C06/A03/ME1-L03-C06-A03-P01-05.jpg`],
      altText: [`동물들이 잔디밭에 모여 있다.`, `빨간색 호루라기를 찬 강아지가 다른 동물들에게 오리 한 마리를 소개하는 모습.`],
      rightText: [
        `   After the game, everyone talked about Cathy. “We have a cat on our team now. I’m so glad!” said Max. “Great!” Coach Biscuit said, “We have another new member.”`,
      ],
      bottomText: [` “A dog or a cat?” Everyone got excited. “Cookie! Please come out.” Coach Biscuit called out to the new member.`],
    },
  ];

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          <Box justifyContent='center' display='flex'>
            <Typography styleType={ETypographyTypes.BODY} weight={'var(--font-weight-bold)'}>
              {title}
            </Typography>
          </Box>
          {contentInfo &&
            contentInfo.map((item, index) => (
              <Box marginTop={'24px'} key={item.id}>
                <BoxWrap>
                  <Box vAlign='center' hAlign='center'>
                    <PinchZoom key={102 + index} pinchType={'image'}>
                      <Image alt='' src={item.imageSrc?.[0]} width='320px' ariaDescribedby={`img_desc_${item.id}`} />
                      {item.altText && (
                        <Box type='hidden' id={`img_desc_${item.id}`}>
                          {item.altText.map((item, idx) => (
                            <p key={idx}> {item} </p>
                          ))}
                        </Box>
                      )}
                    </PinchZoom>
                  </Box>
                  {item.rightText && (
                    <Box>
                      {item.rightText.map((textItem, textIndex) => (
                        <Typography key={textIndex} usePre>
                          {textItem}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </BoxWrap>
                {item.bottomText && (
                  <Box>
                    {item.bottomText.map((textItem, styledTextIndex) => (
                      <Typography key={styledTextIndex}>{textItem}</Typography>
                    ))}
                  </Box>
                )}
                <br />
              </Box>
            ))}
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
