import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM06803 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label type='icon' value={2} marginRight={12} />
        계산해 보세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box flex={1} padding='24px' hAlign='center'>
          <Typography>28÷2=</Typography>
          <Input type='number' width='98px' name={`value1`} value={value} onChange={e => setValue(e.target.value)} ariaLabel='28÷2 문제의 답' />
        </Box>
        <Box flex={1} padding='24px' hAlign='center'>
          <Typography>69÷6=</Typography>
          <Input type='number' width='98px' name={`value1`} value={value} onChange={e => setValue(e.target.value)} ariaLabel='69÷6 문제의 답' />
          <Box position='relative' top='-10px'>
            <Typography>...</Typography>
          </Box>
          <Input type='number' width='98px' name={`value1`} value={value} onChange={e => setValue(e.target.value)} ariaLabel='69÷6 문제의 답' />
        </Box>
      </BoxWrap>
      <BoxWrap marginTop='24px'>
        <Box flex={1} padding='24px' hAlign='center'>
          <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
            <TableMathCaption caption='세로셈' math={['98', '÷', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>나누는 수, 일의 자리</TH>
                <TH scope='col'>나누어지는 수, 십의 자리</TH>
                <TH scope='col'>나누어지는 수, 일의 자리</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD></TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 십의 자리' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 일의 자리' maxLength={1} />
                </TD>
              </TR>
              <TR isDivideExp divideExpGap={50}>
                <TD>7</TD>
                <TD>9</TD>
                <TD>8</TD>
              </TR>
              <TR></TR>
            </TBody>
          </Table>
        </Box>
        <Box flex={1} padding='24px' hAlign='center'>
          <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
            <TableMathCaption caption='세로셈' math={['852', '÷', '4']} />
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
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 백의 자리' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 십의 자리' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 일의 자리' maxLength={1} />
                </TD>
              </TR>
              <TR isDivideExp divideExpGap={50}>
                <TD>4</TD>
                <TD>8</TD>
                <TD>5</TD>
                <TD>2</TD>
              </TR>
              <TR></TR>
            </TBody>
          </Table>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM06803;
