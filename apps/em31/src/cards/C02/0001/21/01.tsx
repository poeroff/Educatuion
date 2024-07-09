import { Box, Image, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size={'36px'} />
        <Typography>삼각형과 사각형의 꼭짓점, 변 알아보기</Typography>
      </Box>
    ),
  };

  const info = {
    altText:
      '삼각형과 사각형이 그려져 있는 그림입니다. 삼각형과 사각형의 곧은 선을 가리키는 화살표에는 변, 삼각형과 사각형에서 두 곧은 선이 만나는 점을 가리키는 화살표에는 꼭짓점이라고 적혀 있습니다.',
    imageSrc: '/C02/0001/21/DEC312I03.png',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <Box useRound tabIndex={101}>
        <Box vAlign='center' hAlign={'center'} flexDirection='column' marginTop={'100px'}>
          <Image src={info.imageSrc} alt={info.altText} />
          <Typography style={{ position: 'absolute', left: '470px' }}>변</Typography>
          <Typography style={{ position: 'absolute', top: '310px', left: '460px' }}>꼭짓점</Typography>
        </Box>
        <Box hAlign='center' marginTop='20px' flexDirection='column' marginBottom='20px'></Box>
      </Box>
    </Container>
  );
};

export default P01;
