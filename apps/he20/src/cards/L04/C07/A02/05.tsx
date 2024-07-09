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
import { dialogContentA02, imgContentA02P05, semiTitleA02, titleA02 } from './commonData';
import { L04C07A02 } from './store';

const { imgSrc, imgAlt } = imgContentA02P05;
const currentPage = 'P05';

const P05 = () => {
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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p05.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p05.answer.every((a, idx = 0) => a === cardData.p05.solution[idx]);

    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect: cardData.p05.isCorrect,
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

    const originalValue = cardData.p05.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: newValues } }));
    }
    changeData(currentPage, 1, 1, newValues);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p05.answer.every(isNotEmptyString)}
      submitBtnColor={
        cardData.p05.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
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
          <Scroll height='100%' tabIndex={0}>
            <Box hAlign='center' paddingBottom={'10px'}>
              <Typography weight={'var(--font-weight-bold)'}>4. Ethical Concerns</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                confusion:
              </Question>
              <Typography>(6)</Typography>
              <Dropdown
                width='200px'
                dropdownList={cardData.p05.dropArr[0]}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p05.answer[0]}
                readOnly={cardData.p05.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='6번 답 선택칸'
                isError={cardData.p05.isSubmitted && cardData.p05.answer[0] !== cardData.p05.solution[0]}
              />
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'>questioning our own humanity</Question>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                privacy worries: risks of illegal access and
              </Question>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'>controlling our thoughts and emotions</Question>
            </Box>

            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                social
              </Question>
              <Typography>(7)</Typography>
              <Dropdown
                width='200px'
                type='up'
                dropdownList={cardData.p05.dropArr[1]}
                isOpen={openDropdown[1]}
                selectedValue={cardData.p05.answer[1]}
                readOnly={cardData.p05.isSubmitted}
                onClick={value => handleDropdownClick(1, value)}
                ariaLabel='7번 답 선택칸'
                isError={cardData.p05.isSubmitted && cardData.p05.answer[1] !== cardData.p05.solution[1]}
              />
              <Question size='small'>: intensifying</Question>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'> the social division due to the high cost</Question>
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
            {cardData.p05.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 6}) ${ans}    `}</Box>;
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

export default P05;
