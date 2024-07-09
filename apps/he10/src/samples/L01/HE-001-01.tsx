import { Tag, BoxWrap, Box, ETagPaint, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import rotated_book from '@maidt-cntn/assets/icons/rotated_book.svg';

const HE00101 = () => {
  const headerInfo = null;

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' marginBottom='32px'>
        <Box position='relative'>
          <TagIcon src={rotated_book} alt='노란색 표지의 덮혀있는 책' />
          <Tag label='Theme' width='146px' height='42px' fontSize='var(--font-size-26)' type={ETagPaint.PRIMARY} />
        </Box>
        <HeaderText>
          {/* 추후 태그 교체 예정 */}
          {/* <Typography color='var(--color-blue-700)' weight='var(--font-weight-bold)' size={EStyleFontSizes.LARGE}> */}
          Interpersonal Relationships
        </HeaderText>
      </Box>
      <Box display='flex' gap='50px' width='679px' margin='0 auto'>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Aim High
        </Typography>
        <Typography useGap={false}>배려, 소통, 공감, 협력을 통한 대인 관계 형성</Typography>
      </Box>
      <Box display='flex' gap='50px' marginTop='24px' width='679px' margin='24px auto 0'>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Functions
        </Typography>
        <BoxWrap flexDirection='column'>
          <Box display='flex' flexDirection='column'>
            <Typography color='var(--color-yellow-700)' weight='var(--font-weight-bold)' useGap={false}>
              희망표현하기
            </Typography>
            <Box marginLeft='10px'>
              <Typography>I hope I can complete a 5 km race.</Typography>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column' marginTop='24px'>
            <Typography color='var(--color-yellow-700)' weight='var(--font-weight-bold)' useGap={false}>
              공감표현하기
            </Typography>
            <Box marginLeft='10px'>
              <Typography>I know how you feel.</Typography>
            </Box>
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

const HeaderText = styled.span`
  //임시 스타일 태그
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

export default HE00101;
