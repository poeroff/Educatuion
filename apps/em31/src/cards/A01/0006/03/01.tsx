import styled from '@emotion/styled';
import { Box, IQuestionProps, SvgIcon, Image, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import A0100060301 from '../../../../assets/icon/EM00701question-mark.svg';

const P01 = () => {
  const question = `도서관에 책이 몇 권 남아 있을까?`;
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: `쉿, 조용! 학교 도서관에 왔어. 학교 도서관에는 책이 317권 있는데 그중에서 172권을 친구들이 빌려 갔대.`,
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={A0100060301} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='36px' lineHeight='50px'>
            {question}
          </Typography>
        </Box>
        <BackgroundImage>
          <Image src={'/A01/0006/03/MA31105_리터칭.png'} alt='여학생이 책을 읽고 있습니다.' size='400px' />
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export const BackgroundImage = styled.div`
  position: absolute;
  right: 16px;
  bottom: -16px;
`;

export default P01;
