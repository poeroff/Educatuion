import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  Dropdown,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C07A02b } from './store';
import { textContentA02b, imgContentA02P03 } from './commonData';

const DialogHeader = () => {
  const { title, subTitle } = textContentA02b;
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        {title}
        {'    '}
      </Typography>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
        {subTitle}
      </Typography>
    </Box>
  );
};

const P03 = () => {
  const { content } = textContentA02b;
  const { imgSrc, imgAlt } = imgContentA02P03;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A02b);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P03';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

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
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p03.answer.every((a, idx = 0) => a === cardData.p03.solution[idx]);

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
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p03.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the story.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isActive = () => {
    return !cardData.p03.answer.some(each => each === '' || each === undefined || each === null);
  };
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isActive()}
      submitBtnColor={isActive() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
      vAlign='center'
    >
      <Box hAlign='flex-end'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} height='44px' onClick={handleButtonClick}>
          <CustomButtonLabel>지문보기</CustomButtonLabel>
        </Button>
      </Box>
      <BoxWrap>
        <Box hAlign={'center'} flexDirection={'column'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} height='282px' width='430px' />
            <Box type='hidden' id='img-desc'>
              {imgAlt}
            </Box>
          </PinchZoom>
        </Box>
        <Box height={'356px'} width={'511px'} hAlign='start'>
          <Scroll height={'316px'} width={'479px'} tabIndex={0}>
            <Box hAlign='center'>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Rising Action
              </Typography>
            </Box>
            <Box display='inline'>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                Nani Tama dedicated almost two years to rewriting{' '}
              </Typography>
            </Box>

            <Box display='inline'>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                the whakapapa, which had been destroyed by{' '}
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography weight={700} useGap={false}>
                {'2)'}
              </Typography>{' '}
              <Dropdown
                type='up'
                width='264px'
                dropdownList={cardData.p03.dropArr}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p03.answer[0]}
                readOnly={cardData.p03.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                isError={cardData.p03.isSubmitted && !cardData.p03.answer[0]}
                ariaLabel='3페이지 답 선택칸'
              />
            </Box>
            <Box display='inline'>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                Despite his efforts, there were still missing names.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog
        useHeader
        header={DialogHeader}
        topHeight={50}
        width={893}
        height={458}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        <Typography>
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
                {paragraph}
              </Typography>
              {index !== arr.length - 1}
            </React.Fragment>
          ))}
        </Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p03.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`${ans}`}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: var(--color-grey-700);
  line-height: 24px;
  white-space: nowrap;
`;
