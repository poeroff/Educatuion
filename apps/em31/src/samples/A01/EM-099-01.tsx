import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const COLOR_YELLOW = '#FAE5C7';

const EM09901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Box marginInline={16}>주어진 길이만큼 어림하여 선분을 긋고 자로 재어 확인해 보세요.</Box>,
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'>
      <BoxWrap>
        <BoxWrap flexDirection='column' boxGap={0} width='fit-content'>
          <BoxWrap>
            <BoxWrap paddingBlock='4px' backgroundColor={COLOR_YELLOW} borderRadius='10px' fontWeight={500} width='212px' justifyContent='center'>
              <Typography fontSize='32px' lineHeight='48px'>
                8 mm
              </Typography>
            </BoxWrap>
            <Box display='flex' boxGap={0} alignItems='center'>
              <Line bgColor='var(--color-yellow-500)' />
              <Line bgColor='var(--color-blue-500)' />
            </Box>
          </BoxWrap>
          <BoxWrap marginTop={24}>
            <BoxWrap paddingBlock='4px' backgroundColor={COLOR_YELLOW} borderRadius='10px' fontWeight={500} width='212px' justifyContent='center'>
              <Typography fontSize='32px' lineHeight='48px'>
                2 cm 5 mm
              </Typography>
            </BoxWrap>
            <Box display='flex' boxGap={0} alignItems='center'>
              <Line bgColor='var(--color-yellow-500)' />
              <Line bgColor='var(--color-blue-500)' />
            </Box>
          </BoxWrap>
          <BoxWrap marginTop={24}>
            <BoxWrap paddingBlock='4px' backgroundColor={COLOR_YELLOW} borderRadius='10px' fontWeight={500} width='212px' justifyContent='center'>
              <Typography fontSize='32px' lineHeight='48px'>
                50 mm
              </Typography>
            </BoxWrap>
            <Box display='flex' boxGap={0} alignItems='center'>
              <Line bgColor='var(--color-yellow-500)' />
              <Line bgColor='var(--color-blue-500)' />
            </Box>
          </BoxWrap>
        </BoxWrap>
        <ButtonWrapper>
          <Typography fontSize='18px' align='center' useGap={false}>
            자 교구
          </Typography>
        </ButtonWrapper>
      </BoxWrap>
    </Container>
  );
};

export default EM09901;

const Line = styled.div<{ bgColor?: string }>`
  width: 283px;
  height: 16px;
  background-color: ${({ bgColor }) => bgColor};
`;

const ButtonWrapper = styled.button`
  width: 94px;
  height: 94px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 15px;
  margin-left: 24px;
  background-color: #d9d9d9;
`;
