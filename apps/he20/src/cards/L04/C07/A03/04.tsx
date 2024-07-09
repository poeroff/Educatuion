import { BottomSheet, BoxWrap, Dropdown, EStyleFontSizes, ETagLine, Image, PinchZoom, Scroll, Tag, Typography } from '@maidt-cntn/ui';
import { Box, Button, EStyleButtonTypes, EStyleSizes, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { dialogContentA03, imgContentA03P01, titleA03, semiTitleA03 } from './commonData';
import { useEffect, useState } from 'react';
import ShowText from './ShowText';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C07A03 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const { imgSrc, imgAlt } = imgContentA03P01;

const P04 = () => {
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
    const updatedAnswers = cardData.p04.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer: updatedAnswers,
      },
    }));
    changeData('P04', 1, 1, updatedAnswers);
  };

  const onGrade = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p04.answer.every((a, idx = 0) => a === cardData.p04.solution[idx]);
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p04.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
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
    return !cardData.p04.answer.some(each => each === '' || each === undefined || each === null);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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

        <Box useFull width={'450px'}>
          <Scroll height='100%'>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>Some scientists suggest that in the</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>future, this technology could have</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>broader applications, such as</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>gaming and texting through our</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>(3)</Typography>
              <Dropdown
                width='200px'
                dropdownList={cardData.p04.dropArr}
                selectedValue={cardData.p04.answer[0]}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p04.isSubmitted}
                isError={cardData.p04.isSubmitted && cardData.p04.answer[0] !== cardData.p04.solution[0]}
                ariaLabel='3번 답란'
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
              thoughts
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <ShowText title={titleA03} semiTitle={semiTitleA03} content={dialogContentA03} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};

export default P04;
