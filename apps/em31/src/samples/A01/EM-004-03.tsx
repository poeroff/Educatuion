import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  EStyleTableTypes,
  IQuestionProps,
  Image,
  Input,
  Label,
  OverlayTooltip,
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
import { useEffect, useState } from 'react';

import bear from '../../assets/example/EM-004-03/bear.svg';
import blue_arrow from '../../assets/example/EM-004-03/math_arrow.svg';
import red_arrow from '../../assets/example/EM-004-03/math_arrow2.svg';
import mouse from '../../assets/example/EM-004-03/mouse.svg';
import number from '../../assets/example/EM-004-03/number.svg';
import square from '../../assets/example/EM-004-03/sqaure.svg';

type boxType = 'red' | 'blue';

const EM00403 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [value5, setValue5] = useState<string>('');

  // 햐단 state들을 false로 바꾸면 피그마에 작성된 페이지 플로우로 볼 수 있습니다.
  // 현재 전체 페이지 확인을 위해 임의로 true로 설정해두었습니다.
  const [isBlueClicked, setIsBlueClicked] = useState<boolean>(true);
  const [showDepth, setShowDepth] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '쓰레기 자루 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />수 모형으로 주운 쓰레기 자루 수를 알아보세요.
      </>
    ),
  };

  // 1 영역 클릭시
  const onBlueClick = () => {
    setIsBlueClicked(true);
  };

  // 값이 변경될 때마다 정답 체크하는 (임시) 로직
  useEffect(() => {
    if (value1 === '8') {
      setShowDepth(true);
      setShowAnswer(true);
    }
  }, [value1]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={() => {}}
      submitLabel='채점하기'
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull position='relative' justifyContent='center' boxGap={70} alignItems='flex-start'>
        <Box padding='0 38px'>
          <Image src={'/example/EM-004-03/math_example_img.jpg'} alt='십 모형 한 개와 일 모형 두 개가 네 줄로 있다..' width='203px' height='190px' />
          <AreaBox type='red' top='-6px' left='223px' width='49px' height='200px' isClicked={showDepth}></AreaBox>
          <AreaBox type='blue' top='-6px' left='277px' width='98px' height='200px' onClick={onBlueClick} isClicked={isBlueClicked}></AreaBox>
        </Box>
        <Box padding='24px 48px'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['12', '*', '4']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            {showDepth && (
              <TFoot>
                <TR>
                  <TD vAlign='middle'>
                    <Input value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='일의 자리 답' />
                  </TD>
                  <TD>
                    <Box position='absolute' top='-1px' left='0' zIndex={-1} width='104px' height='56px' backgroundColor='rgba(248, 203, 188, 0.5)' />
                    <Input value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='십의 자리 답' />
                  </TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD hAlign='center'>
                    <Input value={value4} onChange={e => setValue4(e.target.value)} ariaLabel='일의 자리 답' />
                  </TD>
                  <TD hAlign='center'>
                    <Input value={value5} onChange={e => setValue5(e.target.value)} ariaLabel='십의 자리 답' />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            )}
            <TFoot>
              <TR>
                <TD>
                  {isBlueClicked &&
                    (showAnswer ? (
                      <Box
                        position='absolute'
                        top='-1px'
                        left='0'
                        zIndex={-1}
                        width='52px'
                        height='50px'
                        backgroundColor='rgba(181, 214, 241, 0.5)'
                        lineHeight='48px'
                      >
                        8
                      </Box>
                    ) : (
                      <Input value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='십의 자리 답' />
                    ))}
                </TD>
                <TD width='52px' height='50px'></TD>
                <TD width='52px' height='50px'></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      {isBlueClicked && (
        <Box position='absolute' width='186px' height='100px' top='26%' left='41%' background={`url(${blue_arrow}) center no-repeat`} hAlign='center'>
          <Box backgroundColor='var(--color-white)' hAlign='center'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>2×4</Typography>
          </Box>
        </Box>
      )}
      {showAnswer && (
        <Box position='absolute' width='313px' height='44px' top='44%' left='28.8%' background={`url(${red_arrow}) center no-repeat`} hAlign='center'>
          <Box backgroundColor='var(--color-white)' vAlign='center' width='80px' marginLeft='105px' marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>10×4</Typography>
          </Box>
        </Box>
      )}
      <MouseBalloon>
        <OverlayTooltip type='cloud' place='top'>
          <Box vAlign='center'>
            일 모형&nbsp;
            <SvgIcon src={square} size='22px' />
            &nbsp;은&nbsp;
            <SvgIcon src={number} size='22px' />
            &nbsp;으로
          </Box>
          나타낼 수 있어요.
        </OverlayTooltip>
      </MouseBalloon>

      {showDepth && (
        <BearBallon>
          <OverlayTooltip type='cloud' place='top'>
            8과 40을
            <br />
            더해요.
          </OverlayTooltip>
        </BearBallon>
      )}
    </Container>
  );
};

export default EM00403;

const MouseBalloon = styled.span`
  position: absolute;
  left: 60px;
  bottom: 46px;

  display: inline-block;
  background: url(${mouse}) bottom center no-repeat;
  height: 194px;
  width: 147px;
`;

const BearBallon = styled(MouseBalloon)`
  left: 80%;
  bottom: 74px;

  height: 205px;
  width: 96px;
  background: url(${bear}) bottom center no-repeat;
`;

const AreaBox = styled.div<{
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  type?: boxType;
  isClicked?: boolean;
}>`
  position: absolute;
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ isClicked, type }) =>
    isClicked &&
    type === 'red' &&
    `
    border: 3px solid #EBAA9D;
    `}
    ${({ isClicked, type }) =>
    isClicked &&
    type === 'blue' &&
    `
    border: 3px solid #85B2E0;
  `}
`;
