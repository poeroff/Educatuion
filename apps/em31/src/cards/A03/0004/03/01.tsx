import EM00701question from '@/assets/icon/EM00701question-mark.svg';
import styled from '@emotion/styled';
import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box marginTop={40}>
        <Typography fontSize='25px'>
          어푸어푸! 오늘은 우리 반이 생존 수영을 하는 날이야.
          <br /> 구명조끼 20개를 보니 곱셈식과 나눗셈식이 떠오르네.
        </Typography>
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='26px' lineHeight='50px'>
            곱셈과 나눗셈은 어떤 관계가 있을까?
          </Typography>
        </Box>
        <BackgroundImage>
          <Image
            src={'/A03/0004/03/MA31303_리터칭_수정2.png'}
            alt='학생이 수영장 위에서 팔을 벌리고 물에 떠다니고 있습니다.'
            width='auto'
            height='460'
          />
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

export default P01;
