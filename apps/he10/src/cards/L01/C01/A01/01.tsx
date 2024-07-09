import { Typography, Tag, BoxWrap, Box, ETagPaint } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import rotated_book from '@maidt-cntn/assets/icons/rotated_book.svg';

const P01 = () => {
  const headerInfo = null;

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' marginBottom='32px'>
        <Box position='relative'>
          <TagIcon src={rotated_book} alt='' />
          <Tag label='Theme' width='146px' height='42px' fontSize='var(--font-size-26)' type={ETagPaint.PRIMARY} />
        </Box>
        <HeaderText>Interpersonal Relationships</HeaderText>
      </Box>
      <Box display='flex' gap='24px'>
        <Box display='flex' vAlign='top' margin='24px 0px'>
          <BoxWrap flexDirection='column' gap='20px'>
            <Box display='flex' gap='24px' padding='4px 12px'>
              <Typography weight='var(--font-weight-bold)'>Aim High</Typography>
            </Box>
            <Box display='flex' gap='24px' padding='4px 12px'>
              <Typography weight='var(--font-weight-bold)'>Functions</Typography>
            </Box>
          </BoxWrap>
        </Box>
        <Box>
          <BoxWrap flexDirection='column' margin='24px auto 0' gap='20px'>
            <Box display='flex' flexDirection='column' padding='4px 12px'>
              <Typography>배려, 소통, 공감, 협력을 통한 대인 관계 형성</Typography>
            </Box>
            <Box display='flex' flexDirection='column' gap='12px'>
              <Box display='flex' flexDirection='column' padding='4px 12px'>
                <Typography color='var(--color-yellow-700)' weight='var(--font-weight-bold)'>
                  희망표현하기
                </Typography>
                <Typography>I hope I can complete a 5 km race.</Typography>
              </Box>
              <Box display='flex' flexDirection='column' padding='4px 12px'>
                <Typography color='var(--color-yellow-700)' weight='var(--font-weight-bold)'>
                  공감표현하기
                </Typography>
                <Typography>I know how you feel.</Typography>
              </Box>
            </Box>
          </BoxWrap>
        </Box>
      </Box>
    </Container>
  );
};

const HeaderText = styled(Typography)`
  margin-left: 0.5em;
  font-size: 2em;
  color: var(--color-blue-700);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
`;

const TagIcon = styled.img`
  position: absolute;
  top: -10px; /* 좌측 상단에 위치시키기 위한 top 값 조정 */
  left: -10px; /* 좌측 상단에 위치시키기 위한 left 값 조정 */
  width: 37px;
  height: 37px;
`;

export default P01;
