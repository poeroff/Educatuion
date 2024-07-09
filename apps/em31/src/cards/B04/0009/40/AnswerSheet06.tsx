import { Box, BoxWrap, EStyleTableTypes, TableMathCaption, TBody, TD, TFoot, TH, THead, TR, Table, Typography, Tag, ETagLine } from '@maidt-cntn/ui';

export default () => {
  return (
    <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='답안' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>602</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <BoxWrap marginTop={22}>
          <Box hAlign='center' vAlign={'flex-start'} flexDirection='column' useRound useFull>
            <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['24', '-', '7']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>연산 기호</TH>
                </TR>
              </THead>
              <TBody>
                <TR isMathSolution>
                  <TD></TD>
                  <TD>4</TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>6</TD>
                  <TD>8</TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>7</TD>
                  <TD></TD>
                  <TD></TD>
                  <TD>X</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>7</TD>
                  <TD>0</TD>
                  <TD>6</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
        </BoxWrap>
      </Box>
    </Box>
  );
};
