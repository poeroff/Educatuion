import { useState } from 'react';
import styled from '@emotion/styled';
import {
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Image,
  Box,
  OverlayTooltip,
  Typography,
  SvgIcon,
  ESvgType,
  Scroll,
  EStyleTableTypes,
  Input,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  EStyleFontSizes,
  BoxWrap,
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import asdf from '../../assets/example/EM-101-02/MC31527.png';

const EM10102 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '시간의 덧셈하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />두 영상을 보는 데 걸린 시간을 그림에 색칠하여 알아보세요.
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const minuteCount = 1;
  const secondCount = 12;
  const [numberButtons, setNumberButtons] = useState<boolean[]>(Array(minuteCount + secondCount).fill(false));
  console.log(numberButtons);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Scroll tabIndex={0}>
        <BoxWrap>
          <Box position='relative'>
            <Box hAlign='center' position='absolute' bottom='86px'>
              <Box vAlign='center' whiteSpace='nowrap'>
                {Array(minuteCount + secondCount)
                  .fill(null)
                  .map((_, index) => (
                    <TimeButton
                      key={index}
                      time={index >= minuteCount ? 'second' : 'minute'}
                      isClicked={numberButtons[index]}
                      type='button'
                      aria-label={`${index + 1}번째 1분`}
                      onClick={() => {
                        setNumberButtons(prev => prev.map((value, idx) => (index === idx ? !value : value)));
                      }}
                    >
                      {numberButtons[index] && (
                        <Box position='absolute' left='50%' top='50%' transform='translate(-50%, -50%)'>
                          <Symbol type='incorrect' />
                        </Box>
                      )}
                    </TimeButton>
                  ))}
              </Box>
            </Box>
            <Image
              src='../../assets/example/EM-101-02/MC31527.png'
              width='566px'
              height='228px'
              alt='1분 40초와 1분 30초를 더하면 2분 몇초가 되는지를 나타내는 식이 있습니다. 아래에는 1분 40초와 1분 30초를 더하면 몇분 10초가 되는지를 나타내는 식이 있습니다.'
            />
          </Box>

          <Box>
            <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['2분20초', '-', '1분50초']} />
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
                  <TD>20</TD>
                  <TD>분</TD>
                  <TD>2</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>초</TD>
                  <TD>50</TD>
                  <TD>분</TD>
                  <TD>1</TD>
                  <TD>-</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
            <Box marginTop='64px'>
              <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption='세로셈' math={['2분20초', '-', '1분50초']} />
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
                    <TD>
                      <Input
                        width='52px'
                        ariaLabel='1분 40초에서 1분 30초를 더한 시간의 분를 입력하세요.'
                        value={value1}
                        onChange={e => setValue1(e.target.value)}
                      />
                    </TD>
                    <TD>분</TD>
                    <TD>1</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>초</TD>
                    <TD>50</TD>
                    <TD>분</TD>
                    <TD>1</TD>
                    <TD>-</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>초</TD>
                    <TD>
                      <Input
                        ariaLabel='1분 40초에서 1분 30초를 더한 시간의 분를 입력하세요.'
                        value={value2}
                        onChange={e => setValue2(e.target.value)}
                      />
                    </TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
          </Box>
        </BoxWrap>
      </Scroll>
    </Container>
  );
};

const TimeButton = styled.button<{ time: 'minute' | 'second'; isClicked: boolean }>`
  position: relative;
  width: ${({ time }) => (time == 'minute' ? '190px' : '31px')};
  height: 39px;
  background-color: transparent;
  border: none;
  padding: 12px 0;
`;

export default EM10102;
