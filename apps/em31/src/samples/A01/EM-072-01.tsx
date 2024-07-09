import {
  BoxWrap,
  Box,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Scroll,
  Input,
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
import { useState } from 'react';

const EM07201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '365÷3 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        365÷3의 몫과 나머지를 써 보세요.
      </>
    ),
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Scroll tabIndex={0}>
        <BoxWrap useFull>
          <Box flex={1} hAlign='flex-end' vAlign='flex-start'>
            <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={true}>
              <TableMathCaption caption='세로셈' math={['365', '÷', '3']} />
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
                  <TD>1</TD>
                  <TD>2</TD>
                  <TD>1</TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD>3</TD>
                  <TD>3</TD>
                  <TD>6</TD>
                  <TD>5</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD>3</TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD>6</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>6</TD>
                  <TD></TD>
                </TR>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                  <TD>5</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                  <TD>3</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                  <TD>2</TD>
                </TR>
              </TFoot>
            </Table>
          </Box>

          <Box hAlign='center' vAlign='flex-start' flexDirection='column' flex={1}>
            <Box vAlign='center'>
              <Box width='100px' textAlign='right' marginRight='10px'>
                <Label
                  value='몫'
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  fontSize={22}
                />
              </Box>
              <Input name={`value1`} value={value} onChange={e => setValue(e.target.value)} type='number' width='130px' ariaLabel='몫 답 입력란' />
            </Box>
            <Box marginTop='12px' vAlign='center' hAlign='center'>
              <Box width='100px' textAlign='right' marginRight='10px'>
                <Label
                  value='나머지'
                  svgWidth={100}
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  fontSize={22}
                />
              </Box>
              <Input
                name={`value2`}
                value={value2}
                onChange={e => setValue2(e.target.value)}
                type='number'
                width='130px'
                ariaLabel='나머지 답 입력란'
              />
            </Box>
          </Box>
        </BoxWrap>
      </Scroll>
    </Container>
  );
};

export default EM07201;
