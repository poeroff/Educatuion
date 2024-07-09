import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  Input,
  Table,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Typography,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';

const AnswerSheet02 = () => {
  return (
    <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='답안' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>3, 7, 6</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <BoxWrap marginTop='12px'>
          <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
            <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
              <TableMathCaption caption='세로셈' math={['☐45', '+', '5☐1']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>백의 자리</TH>
                  <TH scope='col'>연산 기호</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD>5</TD>
                  <TD>4</TD>
                  <TD>
                    <Input onChange={() => {}} value={'㉠'} ariaLabel='㉠의 자리의 답' maxLength={1} />
                  </TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>1</TD>
                  <TD>
                    <Input onChange={() => {}} value={'㉡'} ariaLabel='㉡의 자리의 답' maxLength={1} />
                  </TD>
                  <TD>5</TD>
                  <TD>+</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>
                    <Input onChange={() => {}} value={'㉢'} ariaLabel='㉢의 자리의 답' maxLength={1} />
                  </TD>
                  <TD>1</TD>
                  <TD>9</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
          <Box hAlign='center' flexDirection='column' useRound useFull>
            <Typography>5+1=㉢, ㉢=6</Typography>
            <Typography>4+㉡=11, ㉡=7</Typography>
            <Typography>1+㉠+5=9, ㉠=3</Typography>
          </Box>
        </BoxWrap>
      </Box>
    </Box>
  );
};
export default AnswerSheet02;
