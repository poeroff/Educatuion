import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, VideoPlayer, IQuestionProps, TMainHeaderInfoTypes, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { currentPageGradeData } from '@/stores';
import { useRecoilValue } from 'recoil';

interface Props {
  Layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    video: {
      src: string;
      srt: string;
    };
    cardList: string[];
  };
  INITIAL: {
    isValChk: boolean;
    isAnswer: string;
    isComplete: boolean;
    isCorrect: boolean | undefined;
  };
}

const P05 = () => {
  const mainKey = 5;
  const gradeData = useRecoilValue(currentPageGradeData);
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const CONST: Props['Layout'] = {
    headerInfo: { headerText: 'Story 2' },
    questionInfo: {
      text: '영상을 보고, 엘라가 주말에 하는 활동이 무엇인지 골라 봅시다.',
      mark: isSubmittedInput(mainKey, 'TEXT-01')
        ? gradeData.find(data => data.mainKey === mainKey)?.isCorrect === undefined
          ? 'none'
          : gradeData.find(data => data.mainKey === mainKey)?.isCorrect
          ? 'correct'
          : 'star'
        : 'none',
      markSize: 'middle',
    },
    video: {
      src: '/L12/C01/A05/EE4-L12-C01-A05-P05.mp4',
      srt: `
      1
      00:00:00,000 --> 00:00:30,000
      Good moning
      `,
    },
    cardList: ['play the piano', 'watch movie', 'walk my dog'],
  };

  const INITIAL: Props['INITIAL'] = {
    isValChk: getValueInputData(mainKey, 'TEXT-01') ? true : false,
    isAnswer: String(getCorrectData(mainKey)[0].inputDatas[0][0].value),
    isComplete: isSubmittedInput(mainKey, 'TEXT-01'),
    isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fnOnDragStartEvt = (e: any) => {
    e.dataTransfer.setData('id', e.target.id);
  };

  const handleConfirmSync = () => {
    if (!INITIAL.isComplete) {
      gradeSubmitPageData();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const fnOnDropEndEvt = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <Container
      useExtend
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitLabel={INITIAL.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={INITIAL.isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!INITIAL.isValChk}
      onSubmit={() => handleConfirmSync()}
    >
      <BoxWrap gap='10px' useFull>
        <Box hAlign={'center'} useFull width='450px'>
          <VideoPlayer srtFile={CONST.video.srt} videoSrc={CONST.video.src} />
        </Box>
        <Box vAlign={'center'} useFull width='532px' flexDirection={'column'} justifyContent={'center'}>
          <Box>엘라가 주말에 하는 활동:</Box>
          <List>
            {[...Array(1)].map((item, idx) => {
              return (
                <CardBox key={idx} width='100%'>
                  <Cards
                    type={getValueInputData(mainKey, 'TEXT-0' + (idx + 1)) === '' ? 'answer' : 'exam'}
                    onDragOver={e => {
                      !INITIAL.isComplete && e.preventDefault();
                    }}
                    onDrop={e => fnOnDropEndEvt(mainKey, 'TEXT-0' + (idx + 1), e.dataTransfer.getData('id'))}
                  >
                    {String(getValueInputData(mainKey, 'TEXT-0' + (idx + 1)))}
                  </Cards>
                </CardBox>
              );
            })}
            {CONST.cardList.map((item, idx) => {
              return (
                <CardBox key={idx} width='100%'>
                  {![getValueInputData(mainKey, 'TEXT-01'), getValueInputData(mainKey, 'TEXT-02')].includes(item) && (
                    <Cards type='exam' id={item} draggable={!INITIAL.isComplete} onDragStart={e => fnOnDragStartEvt(e)}>
                      {item}
                    </Cards>
                  )}
                </CardBox>
              );
            })}
          </List>
        </Box>
      </BoxWrap>
      {isOpen && (
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Box>
                <Tag type={ETagLine.GREEN} label={'정답'} />
              </Box>
              <Box marginTop='12px'>
                {getCorrectData(mainKey)[0].inputDatas[0].map((item, idx) => {
                  return idx === 0 ? item.value : ',' + item.value;
                })}
              </Box>
            </Box>
          </Box>
        </BottomSheet>
      )}
    </Container>
  );
};

const List = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 30px;
  flex-wrap: wrap;
`;

const CardBox = styled.div<{ width: string }>`
  width: ${({ width }) => 'calc(' + width + ' - 15px)'};
  height: 56px;
  line-height: 56px;
`;

const Cards = styled.div<{ type: string; width?: string; isCorrect?: boolean }>`
  width: 100%;
  height: 100%;
  border: 1px dashed #b0b6c0;
  background: #f8f8f8;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  background: url(/src/assets/writing/drop_icon.png) no-repeat #f8f8f8 50% 50%;
  ${({ type }) =>
    type === 'exam' &&
    `
      border:1px solid #fff0cc;
      font-size:32px;
      text-align:center;
      background:#fff0cc;
      color:#232426;
      box-shadow: 0 4px 3px 0px rgba(0,0,0,25%);
  `}
  ${({ isCorrect }) =>
    isCorrect &&
    `
      border:2px solid #EB1807;
      background:#FFF4F3;
      color:#C11D00;
      box-shadow: none;
  `};
`;

export default P05;
