import { TMainHeaderInfoTypes, IAudioPlayerProps, Box, Scroll, Typography, ETypographyTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IContentInfo {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  imageSrc?: string[];
  imageHeight?: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A03/ME1-L02-C06-A03-P01.mp3',
    captionSrc: '/L02/C06/A03/ME1-L02-C06-A03-P01.srt',
  };

  const title = 'Then and Now';

  const contentInfo: IContentInfo[] = [
    {
      id: `P1`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-01.jpg`],
      altText: [
        `흑백으로 처리된 1995년의 학생과 컬러로 처리된 현재를 살아가는 학생의 모습.`,
        `1995년 학생 주변으로 유선 이어폰, 카세트플레이어, 테이프, 만화책, 동전과 버스표가 말풍선 안에 들어가 있다.`,
        `현재를 살아가는 학생의 주변으로는 무선이어폰, 웹툰, AI 스피커, 교통카드가 말풍선 안에 들어가 있다.`,
      ],
      text: [
        `   Meet Jihun and Minjun. They are 12 years old. They both  love comics and music, but they live in different times. Jihun lives in 1995, and Minjun lives in the present. Let’s look at their lives.`,
      ],
      imageHeight: '291px',
    },

    {
      id: `P2`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-02.jpg`],
      altText: [
        `남자아이가 알람시계 소리에 놀라며 잠에서 깨는 그림,`,
        `남자아이가 비 오는 창밖을 바라보는 그림,`,
        `남자아이가 가방을 매고 현관에서 우산을 챙기는 그림이 순서대로 나열되어 있다.`,
      ],
      text: [
        `   It is morning. Ring, ring, ring! The alarm clock is going off.  Jihun gets up. He looks out the window and checks the weather. It is raining. He puts his books, lunchbox, and umbrella in his  backpack. He says, “Ugh! My backpack is so heavy!"`,
      ],
      imageHeight: '120px',
    },

    {
      id: `P3`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-03.jpg`],
      altText: [
        `남자아이가 휴대폰 알람음에 잠에서 깨는 그림,`,
        `남자아이가 휴대폰으로 날씨를 확인하는 그림,`,
        `남자아이가 태블릿 피시를 챙기는 그림이 순서대로 나열되어 있다.`,
      ],
      text: [
        `   Loud hip-hop music is coming from Minjun’s smartphone.  Minjun wakes up. He asks AI Joe, “Hey Joe, what’s the weather like today?” “It’s sunny,” says Joe. Then, Minjun gets ready for  school. He simply picks up his tablet.`,
      ],
      imageHeight: '124px',
    },
    {
      id: `P4`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-04.jpg`],
      altText: [
        `남자아이가 버스 정류장에서 주머니 안의 동전을 떠올리는 그림,`,
        `남자아이가 버스 창가자리에 앉아 만화책을 읽는 그림이 순서대로 나열되어 있다.`,
      ],
      text: [
        `   Jihun is waiting for the bus. There are many coins in his pocket. He takes out 200 won and gets on the bus. Lucky him! There is an empty seat on the bus. Jihun sits down and reads his comic book.`,
      ],
      imageHeight: '107px',
    },
    {
      id: `P5`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-05.jpg`],
      altText: [
        `남자아이가 버스에 탑승하며 버스카드를 찍는 그림,`,
        `남자아이가 버스에서 서서 무선 이어폰으로 음악을 들으며 휴대폰으로 웹툰을 보는 그림이 순서대로 나열되어 있다.`,
      ],
      text: [
        `   Minjun is taking the bus. He is holding a bus card in his hand. There are many people on the bus. There is no seat for him, but that is okay. He reads his favorite webtoon on his smartphone.`,
      ],
      imageHeight: '124px',
    },
    {
      id: `P6`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-06.jpg`],
      altText: [
        `남자아이가 알람시계 소리에 놀라며 잠에서 깨는 그림,`,
        `남자아이가 비 오는 창밖을 바라보는 그림,`,
        `남자아이가 가방을 매고 현관에서 우산을 챙기는 그림이 순서대로 나열되어 있다.`,
      ],
      text: [
        `   At night, Jihun is listening to his favorite radio show. He records songs from the radio on a tape. There are many great songs on the tape. Sometimes, he writes a letter to the DJ and asks for a song.`,
      ],
      imageHeight: '283px',
    },
    {
      id: `P7`,
      imageSrc: [`/L02/C06/A03/ME1-L02-C06-A03-P01-07.jpg`],
      altText: [`남자아이가 헤드셋으로 음악을 들으며 sns에 Beat by Min이라는 제목으로 음악을 공유하는 모습.`],
      text: [
        `   Minjun is using his tablet and writing a rap song. He shares the song on social media. He gets “likes” from people around the world. Minjun checks his DMs before bedtime. One message says, “U R AMAZING!”`,
      ],
      imageHeight: '284px',
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
              <Box key={item.id}>
                <Box marginTop={'24px'}>
                  {item.text.map((textItem, textIndex) => (
                    <Typography key={textIndex} usePre>
                      &nbsp;{textItem}
                    </Typography>
                  ))}
                </Box>

                <Box vAlign='center' hAlign='center'>
                  <PinchZoom key={102 + index} pinchType={'image'}>
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
              </Box>
            ))}
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
