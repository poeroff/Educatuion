import imageSrc from '@/assets/A01/0001/12/0101-12-03.png';
import { useState } from 'react';
import { Box, Button, Dialog, Drawing, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import Activity1SVG from '@/assets/A01/0001/12/activity1.svg';
import PuzzleRule from './components/PuzzleRule';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import styled from 'styled-components';

const P03 = () => {
  const { gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });
  const [isShow, setIsShow] = useState(false);
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'funPlayAndMathEmotion' }}
      questionInfo={{ text: '어떻게 색칠하면 될까?' }}
      useExtend
      vAlign='start'
      submitLabel='완료하기'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted}
    >
      <Box display='flex' flexDirection='column' gap='20px'>
        <Box display='flex' gap='20px' alignItems='center'>
          <SvgIcon src={Activity1SVG} type={ESvgType.IMG} width='96px' height='38px' />
          <Box>위와 같은 성질을 이용하여 다음 규칙에 따라 퍼즐을 풀어 보자.</Box>
        </Box>
        <Box display='flex' gap='20px' justifyContent='center'>
          <Drawing width='644px' height='276px' image={{ src: FILE_URL, alt: '퍼즐' }} />
          <Button
            onClick={() => {
              setIsShow(true);
            }}
            width='123px'
            height='48px'
            style={{
              backgroundColor: '#0091FF',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: '42px',
            }}
            useRound
          >
            규칙보기
          </Button>
        </Box>
      </Box>

      <Dialog isShow={isShow} onClose={() => setIsShow(false)} width={984} height={525} useHeader>
        <Box display='flex' flexDirection='column' gap='24px'>
          <DialogTitle>규칙 보기</DialogTitle>
          <PuzzleRule />
        </Box>
      </Dialog>
    </MContainer>
  );
};

const DialogTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 123px;
  height: 48px;
  border-radius: 44px;
  font-family: SUIT;
  font-size: 24px;
  font-weight: 700;
  line-height: 42px;
  text-align: center;
  background-color: var(--color-blue-500, #0091ff);
  color: var(--color-white, #fff);
`;

export default P03;

const FILE_URL = '/A01/0001/12/A-MM1-0101-12-03.png';
