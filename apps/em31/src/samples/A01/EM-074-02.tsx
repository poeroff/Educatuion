import { useState } from 'react';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM07402 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '계산해 보세요.',
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [value5, setValue5] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap>
        <Box type='dashed' padding='20px 44px' useRound useFull flexDirection='column' flex={1} vAlign='center'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['4분15초', '+', '7분40초']} />
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
                <TD>초</TD>
                <TD>15</TD>
                <TD>분</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>40</TD>
                <TD>분</TD>
                <TD>7</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input ariaLabel='' value={value1} onChange={e => setValue1(e.target.value)} />
                </TD>
                <TD>분</TD>
                <TD>
                  <Input ariaLabel='' value={value2} onChange={e => setValue2(e.target.value)} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>

        <Box type='dashed' padding='20px 44px' useRound useFull flexDirection='column' vAlign='center'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['10시30분55초', '+', '8시10분10초']} />
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
                <TD>초</TD>
                <TD>55</TD>
                <TD>분</TD>
                <TD>30</TD>
                <TD>시</TD>
                <TD>10</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>10</TD>
                <TD>분</TD>
                <TD>10</TD>
                <TD>시</TD>
                <TD>8</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input ariaLabel='' value={value3} onChange={e => setValue3(e.target.value)} />
                </TD>
                <TD>분</TD>
                <TD>
                  <Input ariaLabel='' value={value4} onChange={e => setValue4(e.target.value)} />
                </TD>
                <TD>시</TD>
                <TD>
                  <Input ariaLabel='' value={value5} onChange={e => setValue5(e.target.value)} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default EM07402;
