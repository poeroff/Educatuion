import { Box, EStyleFontSizes, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '../../assets/icon/EM00701question-mark.svg';

const EM00701 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        사람을 대신해서 드론이 물건을 배달해 주는 것을 본 적<br /> 있어? 오늘 하루 동안에 드론으로 물건을 사랑 마을에 351개, 행복 마을에 246개
        배달했대!
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='36px' lineHeight='50px'>
            드론으로 모두 몇 개의 물건을 <br />
            배달했을까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/example/EM-007-01/MA31101.png'} alt='' width='560px' height='auto' />
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export const BackgroundImage = styled.div`
  position: absolute;
  right: -16px;
  bottom: 0px;
`;

export default EM00701;
