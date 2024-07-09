import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  Image,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  TextView,
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import icCorrect from '@maidt-cntn/assets/icons/correct.svg';

const EMA00301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>
          잘못 계산한 곳을 찾아&nbsp;
          <Symbol type='correct' />
          &nbsp;표 하고 바르게 계산해 보세요
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [isClicked, setClicked] = useState<number | null>(null);

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
      <BoxWrap justifyContent='center' alignItems='center' paddingTop={20}>
        <TextView title=''>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['998', '+', '323']} />
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
                <TD>8</TD>
                <TD>9</TD>
                <TD bgColor={'var(--color-pink-200)'}>9</TD>

                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD>2</TD>
                <TD>3</TD>

                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <StyleButton type='button' onClick={() => setClicked(0)} isClicked={isClicked === 0}>
                    1
                  </StyleButton>
                </TD>
                <TD>
                  <StyleButton type='button' onClick={() => setClicked(1)} isClicked={isClicked === 1}>
                    2
                  </StyleButton>
                </TD>
                <TD>
                  <StyleButton type='button' onClick={() => setClicked(2)} isClicked={isClicked === 2}>
                    2
                  </StyleButton>
                </TD>
                <TD>
                  <StyleButton type='button' onClick={() => setClicked(3)} isClicked={isClicked === 3}>
                    1
                  </StyleButton>
                </TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
        <Box>
          <Image src={'/icon/arrowRightBlue.svg'} alt='오른쪽을 가르키는 화살표 아이콘' size='44px' />
        </Box>
        <TextView title='바른 계산'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['998', '+', '323']} />
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
                <TD>8</TD>
                <TD>9</TD>
                <TD>9</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD>2</TD>
                <TD>3</TD>

                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='일의 자리 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='십의 자리 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='백의 자리 답' maxLength={1} />
                </TD>
                <TD>
                  <Input value={value4} onChange={e => setValue4(e.target.value)} ariaLabel='천의 자리 답' maxLength={1} />
                </TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
      </BoxWrap>
    </Container>
  );
};

const StyleButton = styled.button<{ isClicked: boolean }>`
  position: relative;
  width: 50px;
  height: 50px;

  ${({ isClicked }) =>
    isClicked &&
    `
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 84px;
        height: 84px;
        top: 50%;
        left : 50%;
        transform : translate(-50%, -50%);
        background: url(${icCorrect}) center center no-repeat;
        background-size : 100%;
      }
    `}
`;

export default EMA00301;
