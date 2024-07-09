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
  SvgIcon,
  Typography,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA00101 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        바르게 계산한 친구의 이름을 써 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap>
        <Box type='dashed' padding='20px 44px' useRound useFull flexDirection='column' vAlign='center'>
          <Box width='100%' height='58px' background='var(--color-pink-200)' hAlign='center' borderRadius='8px'>
            <Typography size={EStyleFontSizes.MEDIUM}>채원</Typography>
          </Box>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']} marginTop={24}>
            <TableMathCaption caption='세로셈' math={['734', '+', '869']} />
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
                <TD>4</TD>
                <TD>3</TD>
                <TD>7</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD>6</TD>
                <TD>8</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>3</TD>
                <TD>0</TD>
                <TD>5</TD>
                <TD>1</TD>
              </TR>
            </TFoot>
          </Table>
        </Box>

        <Box type='dashed' padding='20px 44px' useRound useFull flexDirection='column' vAlign='center'>
          <Box width='100%' height='58px' hAlign='center' background='var(--color-pink-200)' borderRadius='8px'>
            <Typography size={EStyleFontSizes.MEDIUM}>현숙</Typography>
          </Box>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']} marginTop={24}>
            <TableMathCaption caption='세로셈' math={['734', '+', '869']} />
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
                <TD>4</TD>
                <TD>3</TD>
                <TD>7</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD>6</TD>
                <TD>8</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>3</TD>
                <TD>0</TD>
                <TD>6</TD>
                <TD>1</TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <Box marginTop='24px' hAlign='center'>
        <Input width='292px' ariaLabel='바르게 계산한 친구의 이름 작성' value={value1} onChange={e => setValue1(e.target.value)} />
      </Box>
    </Container>
  );
};
export default EMA00101;
