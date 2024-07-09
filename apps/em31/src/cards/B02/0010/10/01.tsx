import { Box, BoxWrap, SvgIcon, Typography, IQuestionProps, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import e_fish_icon from '@/assets/icon/e_fish_icon.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='start'>
        <Box>
          <SvgIcon src={e_fish_icon} width='48px' height='34px' />
        </Box>
        <Typography lineHeight='48px' fontWeight='var(--font-weight-medium)'>
          조각보는 여러 조각의 천을 대어서 만든 것으로 사용하지 않는 옷이나 이불 조각으로도 만들 수 있습니다. 이러한 조각보에는 소중한 추억과 환경까지
          생각하는 아름다운 마음이 담겨 있습니다. 조각보를 이루는 사각형을 살펴보고 물음에 답하세요.
        </Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
        <Image src={'/B02/0010/10/B-EM31-02-0010-1001.png'} alt={''} height='250px' width='350px' />
      </BoxWrap>
    </Container>
  );
};

export default P01;
