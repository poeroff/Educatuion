import { BoxWrap, Box, Label, ETagPaint, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import rotated_book from '@maidt-cntn/assets/icons/rotated_book.svg';
import styled from '@emotion/styled';
export interface IHE00101 {
  value1: string;
  value2: string;
  value3: string;
  value4: string[];
  value5: string;
  value6: string;
}

const HE00101 = ({ value1, value2, value3, value4, value5, value6 }: IHE00101) => {
  return (
    <Container headerInfo={null}>
      <Box hAlign='center' marginBottom='32px'>
        <Box position='relative'>
          <TagIcon src={rotated_book} />
          <Tag label='Theme' width='146px' height='42px' fontSize='var(--font-size-26)' type={ETagPaint.PRIMARY} />
        </Box>
        <HeaderText>
          {/* 추후 태그 교체 예정 */}
          {/* <Typography color='var(--color-blue-700)' weight='var(--font-weight-bold)' size={EStyleFontSizes.LARGE}> */}
          {value1}
        </HeaderText>
      </Box>
      <Box display='flex' gap='50px' marginTop='24px' width='779px' margin='0 auto'>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Aim High
        </Typography>
        <Typography useGap={false}>{value2}</Typography>
      </Box>
      <Box display='flex' gap='50px' marginTop='24px' width='779px' margin='24px auto 0'>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Functions
        </Typography>
        <BoxWrap flexDirection='column'>
          <Box display='flex' flexDirection='column'>
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xx-small'} background={'var(--color-blue-500)'} />
              </Box>
              <Typography>{value3}</Typography>
            </BoxWrap>
            {value4.map((item, index) => (
              <Typography useGap={false} key={index}>
                {item}
              </Typography>
            ))}
          </Box>
          <Box display='flex' flexDirection='column' marginTop='24px'>
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xx-small'} background={'var(--color-blue-500)'} />
              </Box>
              <Typography>{value5}</Typography>
            </BoxWrap>
            <Typography useGap={false}>{value6}</Typography>
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
