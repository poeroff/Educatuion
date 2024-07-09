import styled from '@emotion/styled';
import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Box, Button, EImageType, EStyleButtonTypes, EStyleSizes, IQuestionProps, Image, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const EM09802 = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '지도에서 거리 어림하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄷ'} color='var(--color-white)' background='var(--color-grey-600)' />
        학교에서 약 2 km 떨어진 장소에 소방서를 지으려고 합니다. 지도에서 소방서를 지을 수 있는 위치를 찾아 붙임딱지를 붙여 보세요.
      </>
    ),
  };

  const onSelectedToggle = () => {
    setSelected(!selected);
  };

  const handleStickerClick = () => {
    setButtonPosition({ x: null, y: null });
    setSelected(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (selected) {
      setButtonPosition({ x: col, y: row });
      setSelected(false);
    }
  };

  const renderGrid = (row: number, col: number, cW: number, cH: number) => {
    const rows = row;
    const cols = col;
    const cellWidth = cW;
    const cellHeight = cH;

    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid.push(
          <CellBox
            type='button'
            aria-label={`${row}-${col}번째 셀`}
            key={`${row}-${col}`}
            width={cellWidth}
            height={cellHeight}
            top={row * cellHeight}
            left={col * cellWidth}
            onClick={() => handleCellClick(row, col)}
          />,
        );
      }
    }
    return grid;
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {}}
      vAlign='flex-start'
    >
      <Box vAlign='flex-start' width={684} margin='0 auto'>
        <StyledBox onClick={onSelectedToggle} selected={selected}>
          <Box hAlign='center' width={126} height={111} padding={24} position='relative'>
            <Sticker
              onClick={handleStickerClick}
              color={EStyleButtonTypes.NORMAL}
              size={EStyleSizes['FULL-AUTO']}
              top={buttonPosition.y !== null ? buttonPosition.y * 64 - 25 : 0}
              left={buttonPosition.x !== null ? buttonPosition.x * 80 + 135 : 0}
            >
              <Image src={'/example/EM-098-02/MA315082.png'} height='63px' alt='소방서 모양의 붙임딱지입니다.' />
            </Sticker>
            <StickerPlaceholder>
              <Image src={'/example/EM-098-02/MA315082.png'} height='63px' alt='소방서 모양의 붙임딱지입니다.' />
            </StickerPlaceholder>
          </Box>
        </StyledBox>
        <Box margin='0 32px'>
          <Box position='relative'>
            <Image
              type={EImageType.IMG_BG}
              src={'/example/EM-098-02/MA315081.jpg'}
              alt='학교, 도서관, 은행, 병원, 박물관, 지하철역이 그려진 지도가 있습니다. 학교와 도서관의 거리는 약 500미터입니다.'
              width='400px'
              height='321px'
            />
            <Box position='absolute' top={0} left={0} width={400} height={321} onClick={() => setSelected(false)}>
              {renderGrid(5, 5, 80, 64)}
            </Box>
          </Box>
        </Box>
        <Box width='100%'>눈금없는자교구</Box>
      </Box>
    </Container>
  );
};

const StyledBox = styled.div<{ selected?: boolean }>`
  border: 1px solid ${({ selected }) => (selected ? 'var(--color-blue-700)' : '#D0D3D9')};
  border-radius: var(--border-radius);
  background-color: ${({ selected }) => (selected ? 'var(--color-blue-50)' : 'var(--color-white)')};
  position: relative;
`;

const Sticker = styled(Button)<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top = 0 }) => top}px;
  left: ${({ left = 0 }) => left}px;
  z-index: 99;
`;

const CellBox = styled.button<{ width: number; height: number; top: number; left: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

const StickerPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.2;
`;

export default EM09802;
