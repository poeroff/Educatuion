import {
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  Box,
  Scroll,
  Typography,
  ETypographyTypes,
  PinchZoom,
  Image,
  BoxWrap,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IContentInfo {
  id: string;
  altText?: string[];
  rightText?: string[];
  bottomText?: string[];
  imageSrc?: string[];
  imageHeight?: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Who Do I Want to Be? (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C06/A03/ME1-L06-C06-A03-P01.mp3',
    captionSrc: '/L06/C06/A03/ME1-L06-C06-A03-P01.srt',
  };

  const title = 'Who Do I Want to Be?';

  const contentInfo: IContentInfo[] = [
    {
      id: `P1`,
      imageSrc: [`/L06/C06/A03/ME1-L06-C06-A03-P01-01.jpg`],
      altText: [
        `가족들이 소파에 앉아 자신들의 꿈에 대해 이야기 하고 있다. `,
        `각자의 꿈이 말풍선 안에 들어가 있다.`,
        '아버지는 어린시절 장래희망이 우주비행사 였다고 말하고 있고 누나는 어른이 되면 로봇 디자이너가 될 것이라고 말하고 있다.',
        '여동생은 슈퍼히어로나 새가 되고 싶다고 말하고 있다.',
        '남자아이는 생각에 잠겨 있다.',
      ],
      imageHeight: '246px',
      rightText: [
        `My teacher told us about tomorrow’s presentation. He asked us, “What do you want to be when you grow up?” I said to myself, “Oh, no. Not again! What do I want to be? I have no idea.”`,
      ],
      bottomText: [
        `At home, I asked my family about their dream jobs. Dad said, “Well, I wanted to be an astronaut when I was young. I wanted to travel to the moon.”`,
        `“When I grow up, I’m going to be a robot designer,” said my big sister Angela.`,
        `My little sister Sophie shouted, “I’m going to be a superhero or a bird!”  Dad asked me, “What about you, Noah? What do you want to be?”`,
        `I was stressed out.`,
      ],
    },

    {
      id: `P2`,
      imageSrc: [`/L06/C06/A03/ME1-L06-C06-A03-P01-02.jpg`],
      altText: [`남자아이가 어머니와 침대에 앉아 대화하고 있다.`, `나이와 어머니 주변으로 별이 반짝이고 있다.`],
      imageHeight: '285px',
      rightText: [
        `  Later, Mom came home from work.`,
        `“Noah, is everything okay?” she asked.`,
        `“No, Mom. Something is wrong with me. I’m not going to be anything in the future.”`,
        `“What do you mean?” she asked.`,
      ],
      bottomText: [
        `“Everyone has a dream job. Even Sophie does. And she’s only three!” I cried.`,
        `“Oh, Noah. I don’t know my dream job.” `,
        `“What? But you’re a grown-up, and you have a job,” I said.`,
        `“That’s right, but …”`,
        `“And you take care of everyone. You have the answers to everything,” I went on. “You’re always nice, and you’re not afraid of anything. Most of all, you’re my mom!”`,
        `Mom smiled and said, “I hope you are right. I wanted to become that kind of person.”`,
        `“Mom! You’re already that kind of person!” `,
        `Just then, I had an idea. “That’s it! Thanks, Mom!”`,
      ],
    },

    {
      id: `P3`,
      imageSrc: [`/L06/C06/A03/ME1-L06-C06-A03-P01-03.jpg`],
      altText: [
        `남자아이가 선생님과 친구들 앞에서 발표를 하고 있다.`,
        `칠판에 “What do you want to be when you grow up?” 이라고 쓰여 있는 문장을 남자아이가 “Who do you want to be when you grow up?” 이라고 수정했다.`,
      ],
      imageHeight: '364px',
      rightText: [
        `The next day, I gave a presentation. `,
        `“What do I want to be when I grow up? I don’t know. Who do I want to be? I know that!`,
        `I want to be a caring person. I want to help others. I also want to be a brave person. I want to try new things.`,
        `Who do I want to be? I want to be me.” `,
      ],
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
                  <Box marginTop='12px'>
                    <PinchZoom pinchType={'image'}>
                      <Image alt='' src={item.imageSrc?.[0]} width='320px' height={item.imageHeight} ariaDescribedby={`img_desc_${item.id}`} />
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
                          &nbsp;{textItem}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </BoxWrap>
                {item.bottomText && (
                  <Box>
                    {item.bottomText.map((textItem, styledTextIndex) => (
                      <Typography key={styledTextIndex}>&nbsp;{textItem}</Typography>
                    ))}
                  </Box>
                )}
                <br />
              </Box>
            ))}

          <Box hAlign='right'>
            <Typography size={EStyleFontSizes['X-SMALL']}>
              * 이 이야기는 Rumeet Billan의&nbsp;
              <Typography fontStyle='italic' useGap={false} size={EStyleFontSizes['X-SMALL']}>
                Who Do I Want To Become?
              </Typography>
              &nbsp; 을 각색한 글입니다.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
