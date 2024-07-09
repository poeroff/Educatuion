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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import fox from '@/assets/example/EM-101-01/fox_character.svg';
import { useState } from 'react';
import styled from '@emotion/styled';

const EM10101 = () => {
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
  const minuteCount = 3;
  const secondCount = 6;
  const [numberButtons, setNumberButtons] = useState<boolean[]>(Array(minuteCount + secondCount).fill(false));

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Scroll tabIndex={0}>
        <Box vAlign='flex-start' position='relative' marginTop='10px'>
          <Box position='absolute' right='170px' top='-6px'>
            <Image src='../../assets/example/EM-101-01/guide_arrow.png' width='510px' height='287px' />
          </Box>
          <Box marginRight='24px'>
            <Image
              src='../../assets/example/EM-101-01/MC31526.png'
              width='458px'
              alt='1분 40초와 1분 30초를 더하면 2분 몇초가 되는지를 나타내는 식이 있습니다. 아래에는 1분 40초와 1분 30초를 더하면 몇분 10초가 되는지를 나타내는 식이 있습니다.'
            />
          </Box>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['1분40초', '+', '1분30초']} />
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
                <TD>40</TD>
                <TD>분</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>30</TD>
                <TD>분</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input
                    width='86px'
                    ariaLabel='1분 40초에서 1분 30초를 더한 시간의 초를 입력하세요.'
                    value={value1}
                    onChange={e => setValue1(e.target.value)}
                  />
                </TD>
                <TD>분</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>

        <Box margin='60px 30px 0 0' position='relative'>
          <Box hAlign='center' flexDirection='column' position='absolute' right='-30px' bottom='-2px'>
            <OverlayTooltip type='cloud' place='top' fontSize='24px'>
              60초는
              <br />
              1분과 같아요.
            </OverlayTooltip>
            <SvgIcon src={fox} type={ESvgType.IMG} alt='책을 읽고 있는 수달' />
          </Box>
        </Box>

        <Box hAlign='center'>
          <Box vAlign='center' whiteSpace='nowrap'>
            {Array(minuteCount)
              .fill(null)
              .map((_, index) => (
                <TimeButton
                  time='minute'
                  isClicked={numberButtons[index]}
                  type='button'
                  aria-label={`${index + 1}번째 1분`}
                  onClick={() => setNumberButtons(prev => prev.map((value, idx) => (index === idx ? !value : value)))}
                >
                  <Typography width='100%' size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-grey-600)'>
                    1분
                  </Typography>
                </TimeButton>
              ))}
            {Array(secondCount)
              .fill(null)
              .map((_, index) => (
                <TimeButton
                  time='second'
                  isClicked={numberButtons[index + minuteCount]}
                  type='button'
                  aria-label={`${index + 1}번째 10초`}
                  onClick={() => setNumberButtons(prev => prev.map((value, idx) => (index + minuteCount === idx ? !value : value)))}
                >
                  <Typography width='100%' size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-grey-600)'>
                    10초
                  </Typography>
                </TimeButton>
              ))}
          </Box>
        </Box>
        <Box marginTop='24px' hAlign='flex-end'>
          <Box width='420px'>
            <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['1분40초', '+', '1분30초']} />
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
                  <TD>40</TD>
                  <TD>분</TD>
                  <TD>1</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>초</TD>
                  <TD>30</TD>
                  <TD>분</TD>
                  <TD>1</TD>
                  <TD>+</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>초</TD>
                  <TD>10</TD>
                  <TD>분</TD>
                  <TD>
                    <Input
                      ariaLabel='1분 40초에서 1분 30초를 더한 시간의 분를 입력하세요.'
                      value={value2}
                      onChange={e => setValue2(e.target.value)}
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
        </Box>
      </Scroll>
    </Container>
  );
};

const TimeButton = styled.button<{ time: 'minute' | 'second'; isClicked: boolean }>`
  width: ${({ time }) => (time == 'minute' ? '225px' : '38px')};
  background-color: ${({ isClicked }) => (isClicked ? 'var(--color-blue-200)' : 'var(--color-white)')};
  padding: 12px 0;
  border: 2px solid var(--color-yellow-800);
`;

export default EM10101;
