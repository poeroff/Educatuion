import { useState } from 'react';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Image, Label, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';

const pieceData = [
  {
    src: '/example/EM-417-01/A-EM41-020007-0501_1.png',
    imgSize: { width: '131px', height: '147px' },
    before: { top: 90, left: 34 },
    after: { top: 80, left: 135 },
  },
  {
    src: '/example/EM-417-01/A-EM41-020007-0501_2.png',
    imgSize: { width: '137px', height: '168px' },
    before: { top: 19, left: 215 },
    after: { top: 58, left: 210 },
  },
  {
    src: '/example/EM-417-01/A-EM41-020007-0501_3.png',
    imgSize: { width: '166px', height: '112px' },
    before: { top: 144, left: 364 },
    after: { top: 113, left: 264 },
  },
];

const EM41701 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '삼각형을 잘라 붙여 네 각의 크기의 합 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        삼각형을 세 조각으로 잘라 세 꼭짓점이 한 점에 모이도록 이어 붙여 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [dotIsClick, setDotIsClick] = useState<boolean>(false);
  const [pieceButtons, setPieceButtons] = useState<boolean[]>(Array(pieceData.length).fill(false));
  const handlePieceButtonOnClick = (buttonIndex: number) => {
    if (dotIsClick && !pieceButtons[buttonIndex]) {
      setPieceButtons(prev => prev.map((value, index) => (index === buttonIndex ? true : value)));
    }
  };

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
        <Box>
          <Image
            src='/example/EM-417-01/A-EM41-020007-0501.png'
            alt='삼각형 각 세변의 가운데 점에서, 각각 삼각형의 중점까지 선을 긋고, 그 선을 따라 가위로 삼각형을 자릅니다. 자르게 되면 사각형 4개가 나오는데 삼각형의 원래 세 각인 부분을 서로 이어 붙여 각도가 얼마인지 봅니다.'
            width='353px'
            height='338px'
          />
        </Box>
        <Box
          flex={1}
          border='4px solid var(--color-grey-100)'
          borderRadius='8px'
          width='353px'
          height='338px'
          vAlign='flex-end'
          justifyContent='center'
          position='relative'
        >
          {pieceData.map((value, index) => (
            <Box
              key={index}
              position='absolute'
              top={pieceButtons[index] ? value.after.top : value.before.top}
              left={pieceButtons[index] ? value.after.left : value.before.left}
              zIndex={pieceButtons[index] ? 1 : 0}
            >
              <Radio
                title={pieceButtons[index] ? '중심점으로 이동됨' : undefined}
                name='piece-radio'
                value={pieceButtons[index]}
                onClick={() => handlePieceButtonOnClick(index)}
              >
                <Box
                  width={value.imgSize.width}
                  height={value.imgSize.height}
                  outline={dotIsClick && !pieceButtons[index] ? '2px solid var(--color-blue-700)' : ''}
                >
                  <Image src={value.src} alt='' size='100%' />
                </Box>
              </Radio>
            </Box>
          ))}
          <DotButton type='button' title={dotIsClick ? '중심점 선택됨' : undefined} isClick={dotIsClick} onClick={() => setDotIsClick(!dotIsClick)} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

const DotButton = styled.button<{ isClick: boolean }>`
  width: 24px;
  height: 24px;
  margin-bottom: 95px;

  background-color: ${({ isClick }) => (isClick ? ' var(--color-blue-700)' : 'var(--color-grey-800)')};
  ${({ isClick }) => isClick && 'outline: 3px solid var(--color-blue-200)'};
  border-radius: 50%;
`;

export default EM41701;
