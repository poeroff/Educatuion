import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, Scroll, Label } from '@maidt-cntn/ui';
import { Container, TextBoard } from '@maidt-cntn/ui/en';

type HighlightProps = {
  text: string;
  highlightChar: string;
  color: string;
};

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Bingo',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 확인해 봅시다.',
  };

  const escapeRegExp = (str: string) => {
    return str.replace(/[<>()+]/g, '\\$&');
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const escapedHighlight = escapeRegExp(highlight);
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part === highlight ? (
            <span key={index} style={{ fontWeight: 'var(--font-weight-semiBold)', color: 'var(--color-green-600)' }}>
              {highlight}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const data = [
    {
      text: '빙고 판에 자신의 관심사와 장래 희망을 하나씩 씁니다.',
    },
    {
      text: '빙고 판의 나머지 노란색 칸에는 다양한 관심사를, 연두색 칸에는 각 관심사에 어울리는 장래 희망을 씁니다.\n도움이 필요하면 Idea Bank를 참고합니다.한 명은 교과서를 잘 잡고 다른 한 명이 눈을 감고 손가락으로 화면을 짚어 칸을 고릅니다.',
    },
    {
      text: '짝과 함께 관심사와 장래 희망을 묻고 답하면서, 대답으로 나온 말을 빙고 판에서 지웁니다.',
    },
    {
      text: '가로, 세로, 대각선으로 세 줄을 먼저 지운 사람이 이깁니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L06/C03/A02/ME1-L06-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='나의 관심사(노란색 칸)과 나의 장래희망(연두색 칸)을 적을 수 있도록 가로 4칸, 세로 4칸씩 16칸으로 구성된 빙고판'
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <Scroll>
            <List gap={20} data={data}>
              {({ value, index = 1 }) => (
                <Box vAlign='start'>
                  <Box width='30px'>
                    <Typography color='var(--color-required)' weight='var(--font-weight-bold)' usePre>
                      {index}&nbsp;
                    </Typography>
                  </Box>
                  <Box>
                    {index === 2 ? <Typography>{highlightText(value?.text || '', 'Idea Bank')}</Typography> : <Typography>{value?.text}</Typography>}
                  </Box>
                </Box>
              )}
            </List>
            <br />
            <Box>
              <TextBoard color='var(--color-green-200 )'>
                <Box>
                  <Typography weight='var(--font-weight-bold)' color='var(--color-green-600)'>
                    Idea Bank
                  </Typography>
                </Box>
                <Box padding='8px 12px'>
                  <BoxWrap alignItems='baseline'>
                    <Label type='text' value='·' />
                    <Typography>{`Interests: music, cooking, space, robots, movies`}</Typography>
                  </BoxWrap>
                  <BoxWrap alignItems='baseline'>
                    <Label type='text' value='·' />
                    <Typography>{`Jobs: singer, cook, astronaut, robot designer, actor`}</Typography>
                  </BoxWrap>
                </Box>
              </TextBoard>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
