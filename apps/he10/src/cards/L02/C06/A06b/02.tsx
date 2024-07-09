import { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  EStyleSizes,
  Scroll,
  Typography,
  EStyleFontSizes,
  Dropdown,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02C06A06b } from './store';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A06b);
  const currentPage = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (4)',
  };

  const questionInfo = {
    text: 'Q4. Choose the correct word to complete the sentence.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const dropdownList = ['names', 'address'];

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [undefined],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    const updatedAnswers = cardData.p02.answer.map((ans, idx = 0) => (idx === index && value !== undefined ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p02.answer.every((a, idx = 0) => a === cardData.p02.solution[idx]);

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: cardData.p02.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const isActive = () => {
    return cardData.p02.answer[0] !== '';
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isActive() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isActive()}
    >
      <BoxWrap useFull>
        <Box vAlign='center' hAlign='flex-start' useFull tabIndex={101}>
          <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            The two old men recalled missing
            <Typography>
              <Dropdown
                width='200px'
                dropdownList={dropdownList}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p02.isSubmitted}
                selectedValue={cardData.p02.answer[0]}
                isError={cardData.p02.isSubmitted && !cardData.p02.isCorrect}
              />
            </Typography>
            from the afternoon to the evening.
          </Typography>
        </Box>

        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px'>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight={'48px'} useGap={false}>
                    Just before noon, we arrived at a small town called Murupara. “Where do we go now?” I asked Nani. He did not reply, but he was
                    searching inside himself, staring at the small houses. Then, at a street corner, he told us to turn. After turning the corner, we
                    saw an old man standing in front of a house. He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We
                    must hurry.” Now that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the
                    Maori words as they talked. All through the quiet afternoon and into the evening, they recalled missing names. I had a strange
                    feeling that there were other people in the room. I felt as if people from the past were looking over the shoulders of the two old
                    men to see if the work was correct. Finally, they stopped. It was done. After a moment of silence, the old man whispered to Nani,
                    “Goodbye, friend.” Crying, they pressed their noses together to say goodbye.
                  </Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <div>names</div>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
