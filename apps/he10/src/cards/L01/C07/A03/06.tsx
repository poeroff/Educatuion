import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Dialog,
  TextView,
  Button,
  EStyleButtonTypes,
  Typography,
  ETextViewColor,
  Label,
  List,
  Dropdown,
  EStyleFontSizes,
  IQuestionProps,
  Question,
  EStyleSizes,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect, useRef } from 'react';
import { ContentInfo } from './contentInfo';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C07A03 } from './store';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'medium'} size={EStyleFontSizes.MEDIUM}>
        The Power of Friendliness: Soft but Strong
      </Typography>
    </Box>
  );
};

const P06 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A03);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const currentPage = 'P06';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
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
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p06.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p06.answer.every((a, idx = 0) => a === cardData.p06.solution[idx]);

    setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p06.answer,
            isAnswer: true,
            isCorrect: cardData.p06.isCorrect,
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

  const handleButtonClick = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words to complete the review notes.',
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const wordArr = ['Lecture Topic', 'Speaker', 'Interesting Points', 'My Reflection'];

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p06.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p06: {
        ...prev.p06,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p06.answer?.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !cardData.p06.answer?.some(value => value === '' || value === undefined)
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull width={920}>
        <Box hAlign='center' useFull>
          <Box width='380px'>
            <TextView type={ETextViewColor.SKYBLUE} title={'Review Notes'}>
              <Box padding='32px 20px'>
                <List
                  data={wordArr}
                  row={({ value, index = 1 }) => (
                    <BoxWrap>
                      <Box display='flex' alignItems='center' marginRight='10px'>
                        <Label value={index} type={'icon'} size={'xx-small'} disabled={index !== 3} />
                      </Box>
                      <Typography fontSize='var(--font-size-28)' align='left'>
                        {value}
                      </Typography>
                    </BoxWrap>
                  )}
                />
              </Box>
            </TextView>
          </Box>
        </Box>
        <Box useFull hAlign='center' flexDirection='column'>
          <Box alignSelf='end'>
            <Button
              minWidth='118px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문보기'
              useRound
              onClick={() => {
                handleButtonClick();
              }}
            />
          </Box>
          <Box useFull alignSelf='start' hAlign='center'>
            <Scroll width='510px' height='295px'>
              <Box hAlign='flex' whiteSpace='nowrap'>
                <Question type='dot' size='small'>
                  Although Neanderthals could make
                </Question>
              </Box>
              <Box hAlign='flex' whiteSpace='nowrap'>
                <Question size='small'>tools and fire and had</Question>
              </Box>
              <Box hAlign='flex' whiteSpace='nowrap'>
                <Typography>(7)</Typography>
                <Dropdown
                  width='264px'
                  dropdownList={cardData.p06.dropArr[0]}
                  isOpen={openDropdown[0]}
                  selectedValue={cardData.p06.answer[0]}
                  readOnly={cardData.p06.isSubmitted}
                  onClick={value => handleDropdownClick(0, value)}
                  ariaLabel='7번째 답 선택칸'
                />
                <Question size='small'> </Question>
                <Question size='small'>physical </Question>
              </Box>
              <Box hAlign='flex' whiteSpace='nowrap'>
                <Question size='small'>attributes than Homo sapiens, it was</Question>
              </Box>
              <Box hAlign='flex' whiteSpace='nowrap'>
                <Typography>(8)</Typography>
                <Dropdown
                  width='264px'
                  dropdownList={cardData.p06.dropArr[1]}
                  isOpen={openDropdown[1]}
                  selectedValue={cardData.p06.answer[1]}
                  readOnly={cardData.p06.isSubmitted}
                  onClick={value => handleDropdownClick(1, value)}
                  ariaLabel='8번째 답 선택칸'
                />
                <Question size='small'>who thrived.</Question>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
      <Dialog
        useHeader
        header={DialogHeader}
        isShow={isDialogOpen}
        width={893}
        height={458}
        topHeight={50}
        useFooter
        onClose={() => handleDialogClose()}
        closeLabel='닫기'
        tabIndex={101}
      >
        <Typography>
          <ContentInfo />
        </Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p06.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 1}) ${ans}    `}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
