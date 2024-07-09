import { Box, BoxWrap, Image, SvgIcon, Typography, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import e_fish_icon from '../../../../assets/icon/e_fish_icon.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='start' marginBottom='10px'>
        <Box marginTop='2px'>
          <SvgIcon src={e_fish_icon} width='48px' height='34px' />
        </Box>
        <Typography lineHeight='48px'>
          해열제는 열을 내리게 하는 약입니다. 해열제마다 하루에 먹을 수 있는 양과 먹는 시간 간격이 다르므로 양이나 시간 간격을 잘 지켜서 먹어야
          안전합니다. 세 종류 해열제의 먹는 시간 간격을 살펴보고 물음에 답하세요.
        </Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
        <Box>
          <Image
            src={'/A03/0007/03/MA31310_리터칭.png'}
            width={'650px'}
            height='340px'
            alt='3가지 해열제가 있습니다. 해열제의 이름과 용법은 다음과 같습니다.
          다나 : 4시간마다 먹어요, 
          시원 : 6시간마다 먹어요, 
          튼튼 : 8시간마다 먹어요.'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
