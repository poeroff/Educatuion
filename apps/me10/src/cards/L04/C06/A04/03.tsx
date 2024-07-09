import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Input,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
  Typography,
  TextareaStatus,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useMemo, useRef, useState, useEffect } from 'react';
import { isNotEmptyString, getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L04C06A04 } from './store';

const P03 = () => {
  const pageNo = 'P03';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A04);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isPassageShow, setPassageShow] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const inputs = { value1: cardData.p03.answer };

  const isDisabled = useMemo(() => !inputs.value1, [inputs]);
  const status = useMemo(() => (isNotEmptyString(inputs.value1) ? TextareaStatus.ENABLE : TextareaStatus.DEFAULT), [inputs]);

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setPassageShow(true);
  };

  const closeModal = () => {
    setPassageShow(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(prevState => !prevState);
      return;
    } else {
      onSubmit();
    }
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
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
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const onSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      const isCorrect = cardData.p03.answer === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p03.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '​Plan B Was Great, Too! (1)',
  };
  const questionInfo = {
    text: 'Fill in the blank.​ ',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };
  const content = (
    <>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}
        This Saturday is my grandma’s birthday. Dad and I will visit her in Gunsan. Dad usually makes the plans for family trips, but I will make the
        plan this time!
      </Typography>
      <Typography style={{ whiteSpace: 'pre-line' }} color='var(--color-green-800)' weight='var(--font-weight-bold)'>
        {'\n'}My Plan
      </Typography>
      <Typography style={{ whiteSpace: 'pre-line' }}>
        &nbsp;&nbsp; First, I need bus tickets! I will buy tickets for the first bus from Suwon to Gunsan. The streets will not be busy early in the
        morning.
        {'\n\n   '}&nbsp;&nbsp; Second, I will get a birthday cake! I will buy a strawberry cake at a famous bakery in Gunsan. My grandma loves
        strawberries.
        {'\n\n   '}&nbsp;&nbsp; Third, I will prepare for my grandma’s birthday party! I will find a nice seafood restaurant. Fourth, I will take
        family pictures! Taking family photos in a studio will be great. I’m so excited!
      </Typography>
    </>
  );

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box hAlign='flex' marginTop={'4px'}>
          <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
            {' '}
            <Input
              width='168px'
              name={'value1'}
              maxLength={20}
              value={inputs?.value1}
              onChange={e => {
                handleInputChange(e.target.value);
              }}
              status={status[0]}
              ariaLabel={'답 입력란'}
              readOnly={cardData.p03.isSubmitted}
            />{' '}
            am making the plan for the trip to Gunsan.
          </Typography>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isPassageShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={closeModal}
                  tabIndex={104}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} usePre>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문 보기' minWidth='118px' useRound onClick={openModal} tabIndex={103} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>{cardData.p03.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
