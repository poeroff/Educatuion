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
import headerIcon from '@/assets/icon/m_default_01.svg';

type TBgColors = 'red' | 'blue' | 'green' | 'none';

const P04 = () => {
  const [value, setValue] = useState<number>(0);
  const [explanValue, setExplanValue] = useState<string>('');
  const [explanPosition, setExplanPosition] = useState<string>('');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [bgColors, setBgColors] = useState<TBgColors[]>(['blue', 'none', 'none']);
  const [activeTdIndex, setActiveTdIndex] = useState<number>(0);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '배운 내용 정리',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        받아내림이 없는 세 자리 수의 뺄셈
      </>
    ),
  };

  const btnComp = () => {
    return (
      <TR>
        {activeTdIndex === 0 ? (
          <TD>
            <Input
              type={'button'}
              value={''}
              onClick={() => {
                setValue(1);
                setExplanValue('4-2=2');
                setExplanPosition('-53px');
                setBgColors(['none', 'red', 'none']);
                setShowGuide(true);
                setActiveTdIndex(1);
              }}
              ariaLabel='일의 자리의 답'
              maxLength={1}
            />
          </TD>
        ) : value > 0 ? (
          <TD>2</TD>
        ) : (
          <TD></TD>
        )}
        {activeTdIndex === 1 ? (
          <TD>
            <Input
              type={'button'}
              value={''}
              onClick={() => {
                setValue(2);
                setExplanValue('4-1=3');
                setExplanPosition('-1px');
                setBgColors(['none', 'none', 'green']);
                setActiveTdIndex(2);
              }}
              ariaLabel='십의 자리의 답'
              maxLength={1}
            />
          </TD>
        ) : value > 1 ? (
          <TD>3</TD>
        ) : (
          <TD></TD>
        )}
        {activeTdIndex === 2 ? (
          <TD>
            <Input
              type={'button'}
              value={''}
              onClick={() => {
                setValue(3);
                setExplanValue('2-1=1');
                setExplanPosition('50px');
                setBgColors(['none', 'none', 'none']);
                setActiveTdIndex(3);
              }}
              ariaLabel='백의 자리의 답'
              maxLength={1}
            />
          </TD>
        ) : value > 2 ? (
          <TD>1</TD>
        ) : (
          <TD></TD>
        )}
        <TD></TD>
      </TR>
    );
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' useRound>
      <Typography fontSize='32px'>244-112의 계산</Typography>
      <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-green-800)'>
        각 자리 수를 맞추어 쓰고 같은 자리끼리 뺍니다.{' '}
      </Typography>
      <Box vAlign='flex-end' justifyContent='center' marginTop={60}>
        <Box width='209px' hAlign='flex-end' flexDirection='column' marginRight='24px' position='relative'>
          <Table color={EStyleTableTypes.MATH} bgColors={bgColors} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['244', '-', '112']} />
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
                <TD>4</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD>1</TD>
                <TD>1</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>{btnComp()}</TFoot>
          </Table>
          {showGuide && (
            <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right={explanPosition}>
              {explanValue}
            </InputGuide>
          )}
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

export default P04;
