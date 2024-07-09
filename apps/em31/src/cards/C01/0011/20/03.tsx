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

const P01 = () => {
  const [value, setValue] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [bgColors, setBgColors] = useState<TBgColors[]>(['blue', 'none', 'none']);
  const [activeTdIndex, setActiveTdIndex] = useState<number>(0);
  const [currentExplan, setCurrentExplan] = useState<() => JSX.Element | null>(() => null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '배운 내용 정리',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        받아올림이 있는 세 자리 수의 덧셈
      </>
    ),
  };

  const explanVal1 = () => {
    return (
      <>
        <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right='-65px'>
          9+4=
          <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
            1
          </Typography>
          3
        </InputGuide>
      </>
    );
  };
  const explanVal2 = () => {
    return (
      <>
        <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right='-32px'>
          <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
            1
          </Typography>
          +8+3=
          <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
            1
          </Typography>
          2
        </InputGuide>
      </>
    );
  };
  const explanVal3 = () => {
    return (
      <>
        <InputGuide size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-green-800)' right='19px'>
          <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
            1
          </Typography>
          +5+7=
          <Typography size={EStyleFontSizes['X-SMALL']} useGap={false} color='var(--color-red-800)'>
            1
          </Typography>
          3
        </InputGuide>
      </>
    );
  };

  const expHandler = (index: number) => {
    setShowGuide(true);
    switch (index) {
      case 1:
        setCurrentExplan(() => explanVal1);
        break;
      case 2:
        setCurrentExplan(() => explanVal2);
        break;
      case 3:
        setCurrentExplan(() => explanVal3);
        break;
      default:
        setCurrentExplan(() => null);
    }
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
                expHandler(1);
                setBgColors(['none', 'red', 'none']);
                setActiveTdIndex(1);
              }}
              ariaLabel='일의 자리의 답'
              maxLength={1}
            />
          </TD>
        ) : value > 0 ? (
          <TD>3</TD>
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
                expHandler(2);
                setBgColors(['none', 'none', 'green']);
                setActiveTdIndex(2);
              }}
              ariaLabel='십의 자리의 답'
              maxLength={1}
            />
          </TD>
        ) : value > 1 ? (
          <TD>2</TD>
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
                expHandler(3);
                setBgColors(['none', 'none', 'none']);
                setActiveTdIndex(3);
              }}
              ariaLabel='백의 자리의 답'
              maxLength={1}
            />
          </TD>
        ) : value > 2 ? (
          <TD>3</TD>
        ) : (
          <TD></TD>
        )}
        <TD>{value > 2 ? '1' : ''}</TD>
      </TR>
    );
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' useRound>
      <Typography fontSize='32px'>589+734의 계산</Typography>
      <Box vAlign='flex-end' justifyContent='center' marginTop={value > 0 ? 52 : 104}>
        <Box width='209px' hAlign='flex-end' flexDirection='column' marginRight='24px' position='relative'>
          <Table color={EStyleTableTypes.MATH} bgColors={bgColors} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['589', '+', '734']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              {value > 0 && (
                <TR isMathSolution>
                  <TD></TD>
                  <TD>{value > 0 ? '1' : ''}</TD>
                  <TD>{value > 1 ? '1' : ''}</TD>
                  <TD></TD>
                </TR>
              )}
              <TR>
                <TD>9</TD>
                <TD>8</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>3</TD>
                <TD>7</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>{btnComp()}</TFoot>
          </Table>
          {showGuide && currentExplan()}
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

export default P01;
