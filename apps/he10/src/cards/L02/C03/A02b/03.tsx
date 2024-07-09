import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C03A02b } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const vitePath = import.meta.env.VITE_CDN_PATH;
const backgroundImg = `${vitePath}/L02/C03/A02/HE1-L02-C03-A02-03.jpg`;

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02b);

  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the lecture notes using information from the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.mp3',
    captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.srt',
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => (idx === index ? true : false)));
    const updatedAnswers = cardData.p03.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData('P03', 1, 1, updatedAnswers);
  };

  const calcSubmitBtnColor = () => {
    if (cardData.p03.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY;
    } else {
      return cardData.p03.answer.every(value => isNotEmptyString(value || '')) ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  };

  const renderDropdown = (index: number) => {
    return (
      <Dropdown
        width='190px'
        dropdownList={cardData.p03.dropArr[index]}
        isOpen={openDropdown[index]}
        selectedValue={cardData.p03.answer[index]}
        onClick={value => handleDropdownClick(index, value)}
        readOnly={cardData.p03.isSubmitted}
        isError={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer[index] || '', cardData.p03.solution[index])}
        ariaLabel={`${index + 1}번째 답 선택 칸`}
        isInline
      />
    );
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(!isShowAnswer);
      return;
    } else {
      const isCorrect = cardData.p03.answer.every((item, idx = 0) => item === cardData.p03.solution[idx]);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect: cardData.p03.isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={calcSubmitBtnColor()}
      submitDisabled={cardData.p03.answer?.some(value => !isNotEmptyString(value || ''))}
      onSubmit={handleSubmit}
    >
      <BackgroundWrap>
        <BoxWrap>
          <Box width='200px'></Box>
          <Box paddingTop='15px' useFull>
            <Typography weight={800}>Lecture Notes</Typography>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box width='200px'>
            <Typography weight={800}>Topic</Typography>
          </Box>
          <Box useFull>
            <Typography>
              Every (1)
              {renderDropdown(0)}
              has its own unique traditions and customs.
            </Typography>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box width='200px'>
            <Typography weight={800}>Examples</Typography>
          </Box>
          <Box hAlign='flex' useFull>
            <Typography usePre>
              • Opening (2)
              {renderDropdown(1)}
              right away acceptable in most Western countries, but rude in China.{`\n`}• Touching a person’s (3) {renderDropdown(2)}
              impolite in Thailand and Laos, but okay in other countries.
            </Typography>
          </Box>
        </BoxWrap>
      </BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='20px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {cardData.p03.solution.map((value, index) => {
                return `(${index + 1}) ${value} \n`;
              })}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  min-height: 430px;
  width: 100%;
  background: top right / cover no-repeat url(${backgroundImg});
`;

export default P03;
