import { useState } from 'react';

import {
  Box,
  BoxWrap,
  TableMathCaption,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  THead,
  TBody,
  TD,
  TH,
  TR,
  TFoot,
  Table,
  ESvgType,
  SvgIcon,
  TextView,
  TMainHeaderInfoTypes,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import empty_square from '@/assets/icon/math_empty_square.svg';
import styled from '@emotion/styled';

interface ISignData {
  sign: string;
  value: string;
}

const EMA01201 = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          안에 알맞은 것을&nbsp;
          <Box
            vAlign='center'
            color='var(--color-white)'
            padding='0 16px'
            fontSize='var(--font-size-18)'
            height='28px'
            borderRadius={12}
            backgroundColor='var(--color-grey-700)'
          >
            보기
          </Box>
          에서 찾아 기호를 써넣으세요.
        </Box>
      </>
    ),
  };

  const data: ISignData[] = [
    {
      sign: 'ㄱ',
      value: '3x2',
    },
    {
      sign: 'ㄴ',
      value: '4x2',
    },
    {
      sign: 'ㄷ',
      value: '30x2',
    },
    {
      sign: 'ㄹ',
      value: '34x2',
    },
  ];

  const onSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
    } else {
      setShow(!isShow);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='flex-start'
      submitLabel={isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={() => {
        onSubmit();
      }}
      useRound
    >
      <BoxWrap justifyContent='center' boxGap={96}>
        <Box vAlign='center' width='260px' position='relative'>
          <Box>
            <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['34', '*', '2']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>연산 기호</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD>4</TD>
                  <TD>3</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>2</TD>
                  <TD></TD>
                  <TD>&times;</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD bgColor={'var(--color-blue-100)'}>8</TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
            <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['8', '+', '60']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>백의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD bgColor={'var(--color-pink-100)'}>0</TD>
                  <TD bgColor={'var(--color-pink-100)'}>6</TD>
                  <TD></TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>8</TD>
                  <TD>6</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
          <Box position='absolute' top='105px' right='calc(50% - 130px'>
            <Box vAlign='center' height='56px'>
              <Arrow aria-label='8를 가르키는 화살표 아이콘' />
              <Input inputSize='x-small' width='48px' ariaLabel='빈 칸' value={value1} onChange={e => setValue1(e.target.value)} />
            </Box>
            <Box vAlign='center'>
              <Arrow aria-label='60을 가르키는 화살표 아이콘' />
              <Input inputSize='x-small' width='48px' ariaLabel='빈 칸' value={value2} onChange={e => setValue2(e.target.value)} />
            </Box>
          </Box>
        </Box>

        <Box>
          <TextView title={'보기'} height='238px'>
            <List<ISignData>
              data={data}
              row={({ value, index }) => (
                <Box hAlign='flex-start' key={index}>
                  <Label size='x-small'>{value?.sign}</Label>&nbsp;
                  {value!.value}
                </Box>
              )}
            />
          </TextView>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const Arrow = styled.div`
  position: relative;
  width: 40px;
  height: 2px;
  background: var(--color-pink-800);
  margin-right: 4px;

  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    display: inline-block;

    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 8px solid var(--color-pink-800);
    transform: translateY(calc(-50%)) rotate(90deg);
  }
`;

export default EMA01201;
