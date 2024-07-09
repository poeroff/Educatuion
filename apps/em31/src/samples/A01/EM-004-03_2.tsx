import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  EStyleFontSizes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';
import tableLine from '../../assets/icon/tableLine.svg';

const EM00403_2 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '351+246 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        받아올림이 없는 세 자리 수의 덧셈
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' useRound>
      <Typography fontSize='32px'>351+246의 계산</Typography>
      <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-green-800)'>
        각 자리 수를 맞추어 쓰고 같은 자리까지 더합니다.{' '}
      </Typography>
      <Box vAlign='flex-end' justifyContent='center'>
        <Box width='209px' hAlign='flex-end' flexDirection='column' marginRight='24px' position='relative'>
          <Table color={EStyleTableTypes.MATH} bgColors={['blue', 'none', 'none']} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['492', '-', '194']} />
            <THead hidden>
              <TR>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>9</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>9</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input type={'button'} value={value1} onClick={() => setValue1('6')} ariaLabel='일의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
                <TD></TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right='-57px'>
            2+4=6
          </InputGuide>
        </Box>
        <SvgIcon src={tableLine} height='160px' width='17px' />
        <Box width='209px' hAlign='center' flexDirection='column' margin='0 24px' position='relative'>
          <Table color={EStyleTableTypes.MATH} bgColors={['none', 'red', 'none']} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['492', '-', '194']} />
            <THead hidden>
              <TR>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR isMathSolution>
                <TD></TD>
                <TD></TD>
                <TD>
                  <Input value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='백의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD>9</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>9</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>6</TD>
                <TD>
                  <Input type='button' value={value3} onClick={() => setValue3('8')} ariaLabel='십의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right='-15px'>
            9+9=
            <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
              1
            </Typography>
            8
          </InputGuide>
        </Box>
        <SvgIcon src={tableLine} height='160px' width='17px' />
        <Box width='209px' hAlign='center' flexDirection='column' marginLeft='24px' position='relative'>
          <Table color={EStyleTableTypes.MATH} bgColors={['none', 'none', 'green']} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['492', '-', '194']} />
            <THead hidden>
              <TR>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR isMathSolution>
                <TD></TD>
                <TD></TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD>9</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD isMathCheck>4</TD>
                <TD>9</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>6</TD>
                <TD>8</TD>
                <TD>
                  <Input type='button' value={value4} onClick={() => setValue4('6')} ariaLabel='백의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right='28px'>
            <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
              1
            </Typography>
            +4+1=6
          </InputGuide>
        </Box>
      </Box>
    </Container>
  );
};

const InputGuide = styled(Typography)<{ right: string }>`
  position: absolute;
  bottom: -49px;
  right: ${({ right }) => right};
  ::before {
    position: absolute;
    left: -36px;
    bottom: 11px;
    content: '';
    width: 26px;
    height: 39px;
    border-left: 1px solid var(--color-green-500);
    border-bottom: 1px solid var(--color-green-500);
  }
  ::after {
    position: absolute;
    left: -12px;
    bottom: 8px;
    content: '';
    width: 7px;
    height: 7px;
    background: var(--color-green-500);
    border-radius: 50%;
  }
`;

export default EM00403_2;
