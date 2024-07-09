import styled from '@emotion/styled';
import { Box, BoxWrap, EStyleFontSizes, Label, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'In this unit, I will learn ...',
  };

  const data = [
    {
      subTitle: `자기소개하기`,
      A: `Hi, I'm Sua. Nice to meet you.`,
      B: `Hi. My name is Dennis. Nice to meet you, too.`,
    },
    {
      subTitle: `좋아하는 것 묻고 답하기`,
      A: `What's your favorite subject?`,
      B: `My favorite subject is P.E.`,
    },
  ];

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap flexDirection='column'>
        <Box padding={'8px 12px'}>
          <BoldText>Communicate</BoldText>
        </Box>
        <Box marginTop={'20px'} paddingLeft={'20px'}>
          <List
            data={data}
            row={({ value }) => (
              <BoxWrap>
                <Box>
                  <Typography size={EStyleFontSizes['MEDIUM']} weight='var(--font-weight-bold)'>
                    {value?.subTitle}
                  </Typography>
                  <BoxWrap marginBottom={'4px'} marginTop={'8px'}>
                    <Box padding={'6px 4px'} marginRight={'10px'} fontWeight={700}>
                      <Label value={'A'} type={'paint'} fontSize={24} background={'var(--color-blue-100)'} />
                    </Box>
                    <Box width={'80%'} whiteSpace='nowrap'>
                      <Typography> {value?.A}</Typography>
                    </Box>
                  </BoxWrap>
                  <BoxWrap marginBottom={'4px'}>
                    <Box padding={'6px 4px'} marginRight={'10px'} fontWeight={700}>
                      <Label value={'B'} type={'paint'} fontSize={24} background={'var(--color-yellow-100)'} />
                    </Box>
                    <Box width={'80%'} whiteSpace='nowrap'>
                      <Typography>{value?.B}</Typography>
                    </Box>
                  </BoxWrap>
                </Box>
              </BoxWrap>
            )}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 42px;
`;
