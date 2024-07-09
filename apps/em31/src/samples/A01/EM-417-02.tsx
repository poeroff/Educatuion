import { useState } from 'react';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Image, Label, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';

const pieceData = [
  {
    src: '/example/EM-417-02/A-EM41-020008-0501_1.png',
    imgSize: { width: '141px', height: '141px' },
    before: { top: 13, left: 374 },
    after: { top: 60, left: 277, rotae: '18deg' },
  },
  {
    src: '/example/EM-417-02/A-EM41-020008-0501_2.png',
    imgSize: { width: '155px', height: '166px' },
    before: { top: 164, left: 338 },
    after: { top: 159, left: 250 },
  },
  {
    src: '/example/EM-417-02/A-EM41-020008-0501_3.png',
    imgSize: { width: '147px', height: '100px' },
    before: { top: 29, left: 118 },
    after: { top: 65, left: 156 },
  },
  {
    src: '/example/EM-417-02/A-EM41-020008-0501_4.png',
    imgSize: { width: '158px', height: '106px' },
    before: { top: 194, left: 60 },
    after: { top: 159, left: 110 },
  },
];

const EM41702 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '사각형을 잘라 붙여 네 각의 크기의 합 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        사각형을 네 조각으로 잘라 네 꼭짓점이 한 점에 모이도록 이어 붙여 보세요.
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
            src='/example/EM-417-02/A-EM41-020008-0501.png'
            alt='사각형 각 네변의 가운데 점에서, 각각 네각형의 중점까지 선을 긋고, 그 선을 따라 가위로 사각형을 자릅니다. 자르게 되면 사각형 4개가 나오는데 사각형의 원래 네 각인 부분을 서로 이어 붙여 각도가 얼마인지 봅니다.'
            width='353px'
            height='338px'
          />
        </Box>
        <Box flex={1} border='4px solid var(--color-grey-100)' borderRadius='8px' width='353px' height='338px' hAlign='center' position='relative'>
          {pieceData.map((value, index) => (
            <Box
              key={index}
              position='absolute'
              top={pieceButtons[index] ? value.after.top : value.before.top}
              left={pieceButtons[index] ? value.after.left : value.before.left}
              zIndex={pieceButtons[index] ? 1 : 0}
              transform={pieceButtons[index] ? `rotate(${value.after.rotae})` : undefined}
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
  margin-bottom: 12px;

  background-color: ${({ isClick }) => (isClick ? ' var(--color-blue-700)' : 'var(--color-grey-800)')};
  ${({ isClick }) => isClick && 'outline: 3px solid var(--color-blue-200)'};
  border-radius: 50%;
`;

export default EM41702;
