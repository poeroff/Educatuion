import {
  Box,
  IQuestionProps,
  Label,
  BoxWrap,
  Typography,
  Dropdown,
  EStyleTableTypes,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM12101 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={6} size='small' />
        바르게 계산한 친구의 이름을 써 보세요.
      </>
    ),
  };

  const dropArr = ['유미', '재현'];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap useFull display='flex' justifyContent='center'>
        <Box vAlign='flex-start'>
          <Typography useGap={false}>유미</Typography>
          <Box marginLeft='8px' type='dashed' width='268px' height='360px' padding='4px 16px'>
            <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
              <TableMathCaption caption='세로셈' math={['529', '÷', '7']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>나누는 수, 일의 자리</TH>
                  <TH scope='col'>나누어지는 수, 백의 자리</TH>
                  <TH scope='col'>나누어지는 수, 십의 자리</TH>
                  <TH scope='col'>나누어지는 수, 일의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>7</TD>
                  <TD>4</TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD>7</TD>
                  <TD>5</TD>
                  <TD>2</TD>
                  <TD>9</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD>4</TD>
                  <TD>9</TD>
                  <TD></TD>
                </TR>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD>3</TD>
                  <TD>9</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>2</TD>
                  <TD>8</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD>1</TD>
                  <TD>1</TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
        </Box>
        <Box vAlign='flex-start'>
          <Typography useGap={false}>재현</Typography>
          <Box marginLeft='8px' type='dashed' width='268px' height='360px' padding='4px 16px'>
            <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
              <TableMathCaption caption='세로셈' math={['294', '÷', '2']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>나누는 수, 일의 자리</TH>
                  <TH scope='col'>나누어지는 수, 백의 자리</TH>
                  <TH scope='col'>나누어지는 수, 십의 자리</TH>
                  <TH scope='col'>나누어지는 수, 일의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>7</TD>
                  <TD>3</TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD>2</TD>
                  <TD>2</TD>
                  <TD>9</TD>
                  <TD>4</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD>2</TD>
                  <TD>8</TD>
                  <TD></TD>
                </TR>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD>1</TD>
                  <TD>4</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>1</TD>
                  <TD>2</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                  <TD>2</TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
        </Box>
      </BoxWrap>
      <Box marginTop='12px' hAlign='center'>
        <Dropdown width='303px' dropdownList={dropArr} type='up' />
      </Box>
    </Container>
  );
};

export default EM12101;
