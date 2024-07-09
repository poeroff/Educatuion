import { BottomSheet, BoxWrap, Dropdown, EStyleFontSizes, ETagLine, Image, PinchZoom, Question, Scroll, Tag, Typography } from '@maidt-cntn/ui';
import { Box, Button, EStyleButtonTypes, EStyleSizes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { dialogContentA02b, imgContentA02bP05, titleA02b } from './commonData';
import { useEffect, useRef, useState } from 'react';
import ShowText from './ShowText';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04C07A02b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const { imgSrc } = imgContentA02bP05;

const dropArr = ['minds', 'inequality'];
const dropAnswer = 'inequality';

const P05 = () => {
  const [isTextOpen, setIsTextOpen] = useState(false);
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A02b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const currentPage = 'P05';

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

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

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p05.answer === cardData.p05.solution;
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P05', userSubmission, isCorrect);
  };

  const handleDropdownClick = (index: number) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: index } }));
    changeData('P05', 1, 1, index);
  };

  const handleClickDropdown = (value?: string) => {
    const answerIndex = dropArr.findIndex(label => label === value);
    if (answerIndex >= 0) {
      handleDropdownClick(answerIndex + 1);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handleSubmit}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={cardData.p05.answer === 0}
      submitBtnColor={
        cardData.p05.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p05.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='right'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap useFull>
        <Box width={'350px'} useFull>
          <PinchZoom>
            <Image width='350px' height='350px' ariaDescribedby='imgDesc' alt='' src={imgSrc} />
            <Box type='hidden' id='imgDesc'>
              <p tabIndex={101}>4 Ethical Concerns에 관한 인포그래픽</p>
              <p tabIndex={102}>identity confusion: questioning our own humanity</p>
              <p tabIndex={103}>privacy worries: risks of illegal access and controlling our thoughts and emotions</p>
              <p tabIndex={104}>social 4 빈칸 : intensifying the social division due to the high cost</p>
              <p tabIndex={105}>의자에 앉아 노트북을 보고 있는 사람</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Scroll height='100%'>
            <Box hAlign='center' paddingBottom={'10px'}>
              <Typography weight={'var(--font-weight-bold)'}>4. Ethical Concerns</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                identity confusion:
              </Question>
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
              <Typography weight={'var(--font-weight-bold)'}>4)</Typography>
              <Dropdown
                dropdownList={dropArr}
                width={'240px'}
                onClick={handleClickDropdown}
                aria-label='답란'
                readOnly={cardData.p05.isSubmitted}
                selectedValue={dropArr[cardData.p05.answer - 1]}
                isError={cardData.p05.isSubmitted ? (cardData.p05.answer === cardData.p05.solution ? false : true) : false}
                type='up'
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
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' flexDirection='column' display='flex'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              4){dropAnswer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <ShowText title={titleA02b} content={dialogContentA02b} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};

export default P05;
