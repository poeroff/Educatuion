import { BottomSheet, BoxWrap, Dropdown, EStyleFontSizes, ETagLine, Image, PinchZoom, Scroll, Tag, Typography } from '@maidt-cntn/ui';
import { Box, Button, EStyleButtonTypes, EStyleSizes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { dialogContentA03, imgContentA03P01, semiTitleA03, titleA03 } from './commonData';
import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C07A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import ShowText from './ShowText';

const { imgSrc, imgAlt } = imgContentA03P01;

const P02 = () => {
  const [isTextOpen, setIsTextOpen] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p02.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData('P02', 1, 1, updatedAnswers);
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
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
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
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
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
        },
      ],
    },
  ];

  const isActive = () => {
    return !cardData.p02.answer.some(each => each === '' || each === undefined || each === null);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Choose',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words to complete the news article based on the main text.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isActive() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={onGrade}
      submitDisabled={!isActive()}
    >
      <Box hAlign='right' marginBottom={'10px'}>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap>
        <Box width={'450px'} useFull hAlign='center'>
          <PinchZoom>
            <Image width='450px' height='320px' src={imgSrc} />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
        </Box>

        <Box useFull height={'320px'} width={'450px'}>
          <Scroll>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>Jaden Smith, whose legs were</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>paralyzed, took his first steps on</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>Friday thanks to remarkable</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>progress in neuroscience.</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>Researchers inserted AI-powered</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>neural implants in brain and</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>(1)</Typography>
              <Dropdown
                width='200px'
                dropdownList={cardData.p02.dropArr}
                selectedValue={cardData.p02.answer[0]}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p02.isSubmitted}
                isError={cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]}
                ariaLabel='1번 답란'
              />
              <Typography>.</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              spine
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <ShowText title={titleA03} semiTitle={semiTitleA03} content={dialogContentA03} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};

export default P02;
