import { Container } from '@maidt-cntn/ui/math';
import { Box, BoxWrap, SvgIcon, Typography, IQuestionProps, Image, EImageType, ControlBackground } from '@maidt-cntn/ui';

import e_fish_icon from '@maidt-cntn/assets/icons/e_fish_icon.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='start' marginBottom='10px'>
        <Box marginTop='5px'>
          <SvgIcon src={e_fish_icon} width='48px' height='34px' />
        </Box>
        <Typography lineHeight='48px'>
          현오는 박물관에서 아프리카 민속 예술 작품인 목걸이를 보았습니다. 우리나라뿐만 아니라 다른 나라에도 아름답고 다양한 전통문화가 있다는 것을 알
          수 있었습니다. 현오가 본 목걸이를 생각하여 물음에 답하세요.
        </Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <BoxWrap justifyContent='center'>
        <Box>
          <Image type={EImageType.IMG_BG} src={'/B02/0008/10/B-EM32-02-0008-1001(1).png'} alt={''} width={'268px'} height={'250px'} />
        </Box>
        <Box>
          <Image type={EImageType.IMG_BG} src={'/B02/0008/10/B-EM32-02-0008-1001(2).png'} alt={''} width={'268px'} height={'250px'} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
