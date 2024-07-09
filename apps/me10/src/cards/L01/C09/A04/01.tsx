import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, List, Label, Typography, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A',
    headerPattern: 'icon',
    iconType: 'meFunActivity',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '네 장의 카드 중 한 장을 골라 짝과 함께 스무고개 놀이를 해 봅시다.',
  };
  const data = ['Are you a girl?', 'Yes, I am.', 'Are you angry?', 'No, I‘m not.', 'Is your hat blue?​', 'Yes, it is.', 'Then, you are sally!'];

  const labelStr = (index: number) => {
    return index % 2 === 0 ? 'B' : 'A';
  };

  const labelColor = (index: number) => {
    const str = labelStr(index);
    return str === 'A' ? 'var(--color-blue-100)' : 'var(--color-yellow-100)';
  };

  const imgContent = {
    imgSrc: `/L01/C09/A04/ME1-L01-C09-A04-P01.jpg`,
    imgAlt: (
      <>
        <p>네 장의 그림 카드가 있다.</p>
        <p>그림 카드에는 인물의 모습과 이름이 써 있다.</p>
        <p>카드 1 : 노란 모자, 파란 배낭을 착용한 밝은 표정의 남자아이. 이름표 Jinsu</p>
        <p>카드 2 : 파란 모자, 보라색 손가방을 착용한 밝은 표정의 여자아이. 이름표 Sally</p>
        <p>카드 3 : 초록 모자, 노란 배낭을 착용한, 화난 표정의 여자아이. 이름표 Yuju</p>
        <p>카드 4 : 파란 모자, 빨간 배낭을 착용한, 슬픈 표정으로 우는 남자 아이. 이름표 Lucas</p>
      </>
    ),
  };
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={imgContent.imgSrc} width='346px' height='200px' alt='' />
            <Box type='hidden' id='img-desc'>
              {imgContent.imgAlt}
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull padding={'0px 50px'}>
          <Scroll height='100%'>
            <List data={data}>
              {({ value, index = 1 }) => (
                <BoxWrap>
                  <Box>
                    <Label value={labelStr(index)} type={'paint'} background={labelColor(index)} />
                  </Box>
                  <Box>
                    <Typography>{value}</Typography>
                  </Box>
                </BoxWrap>
              )}
            </List>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
