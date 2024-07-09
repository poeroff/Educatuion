import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dropdown,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  Question,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ShowText from './ShowText';
import { dialogContentA02, imgContentA02P06, semiTitleA02, titleA02 } from './commonData';
import { L04C07A02 } from './store';

const { imgSrc, imgAlt } = imgContentA02P06;
const currentPage = 'P06';

const P06 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A02);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
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

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));

    const originalValue = cardData.p06.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: newValues } }));
    }
    changeData(currentPage, 1, 1, newValues);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: getMarking(cardData.p06.isSubmitted, cardData.p06.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p06.answer.every(isNotEmptyString)}
      submitBtnColor={
        cardData.p06.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
      vAlign='center'
    >
      <Box hAlign='right'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap useFull>
        <Box width={'350px'} useFull>
          <PinchZoom>
            <Image width='350px' height='350px' src={imgSrc} ariaDescribedby={'img_desc'} />
          </PinchZoom>
          <Box type='hidden' id={'img_desc'}>
            {imgAlt}
          </Box>
        </Box>
        <Box useFull>
          <Scroll height='100%'>
            <Box hAlign='center' paddingBottom={'10px'}>
              <Typography weight={'var(--font-weight-bold)'}>5. solutions</Typography>
            </Box>
            <Box>
              <Question type='dot' size='small'>
                carefully consider neuroethics
              </Question>
            </Box>
            <Box display='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                establish a
              </Question>
              <Typography>(8)</Typography>
              <Dropdown
                width='200px'
                dropdownList={cardData.p06.dropArr[0]}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p06.answer[0]}
                readOnly={cardData.p06.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='8번 답 선택칸'
                isError={cardData.p06.isSubmitted && cardData.p06.answer[0] !== cardData.p06.solution[0]}
              />
              <Question size='small'>review</Question>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'>process</Question>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p06.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 8}) ${ans}`}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
      <ShowText
        title={titleA02}
        semiTitle={semiTitleA02}
        content={dialogContentA02}
        isShow={isDialogOpen}
        handleDiaglogClose={handleDialogClose}
        lastFocusedElementRef={lastFocusedElementRef}
      />
    </Container>
  );
};

export default P06;
