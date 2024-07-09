import styled from '@emotion/styled';
import { Box, BoxWrap, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'In this unit, I will learn ...',
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap flexDirection='column'>
        <Box padding={'8px 12px'}>
          <BoldText>Read</BoldText>
        </Box>
        <Box useFull>
          <BoxWrap paddingLeft='50px' paddingTop='10px'>
            <Typography>What's in Your School Survival Kit?</Typography>
          </BoxWrap>
        </Box>
        <Box paddingTop='30px'>
          <Box padding={'8px 12px'}>
            <BoldText>Language Use</BoldText>
          </Box>
        </Box>
        <Box useFull paddingTop='10px'>
          <BoxWrap paddingLeft='50px' paddingTop='10px'>
            <Typography>{highlightText('I am nervous.', 'am')}</Typography>
          </BoxWrap>
          <BoxWrap paddingLeft='50px' paddingTop='10px'>
            <Typography>{highlightText('I have some candies.', 'have')}</Typography>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default P02;

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 42px;
`;
