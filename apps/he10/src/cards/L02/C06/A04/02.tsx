import {
  Question,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  SvgIcon,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  BoxWrap,
  Button,
  Dialog,
  EStyleFontSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import arrow_right from '@/assets/icon/arrow_right.svg';
import React from 'react';
import { textContentA04 } from './commonData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C06A04 } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const { title, content } = textContentA04;
  const [isMainTextOpen, setIsMainTextOpen] = useState(false);

  const currentPage = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (2)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q2. Fill in the blanks to complete the sentences.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };
  const handleButtonClick = () => setIsMainTextOpen(true);
  const handleDialogClose = () => setIsMainTextOpen(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(currentPage, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData(currentPage, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <>
      <Container
        bodyId='targetContainer'
        headerInfo={headerInfo}
        questionInfo={questionInfo}
        vAlign='flex-start'
        onSubmit={onGrade}
        flex-direction='column'
        submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
        submitDisabled={isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2) ? false : true}
        submitBtnColor={
          !(isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2))
            ? EStyleButtonTypes.SECONDARY
            : isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
        }
      >
        <Content>
          <Box>
            <Question size={'small'}>How long did it take Nani Tama to gather most of the whakapapa?</Question>

            <Box hAlign='center' vAlign='flex-start'>
              <SvgIcon src={arrow_right} size='38px' style={{ marginTop: '8px' }} />
              <Box display='inline' useFull vAlign='center' hAlign='center'>
                <Typography>It took him almost</Typography>
                <Input
                  value={cardData.p02.answer1}
                  onChange={event => handleChange(1, event.target.value)}
                  textAlign='left'
                  width='235px'
                  maxLength={20}
                  ariaLabel='1번 입력칸'
                  readOnly={cardData.p02.isSubmitted}
                  status={
                    !isNotEmptyString(cardData.p02.answer1)
                      ? InputStatus.DEFAULT
                      : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                />
                <Typography>years to</Typography>
                <Input
                  value={cardData.p02.answer2}
                  onChange={event => handleChange(2, event.target.value)}
                  textAlign='left'
                  width='235px'
                  ariaLabel='2번 입력칸'
                  maxLength={20}
                  readOnly={cardData.p02.isSubmitted}
                  status={
                    !isNotEmptyString(cardData.p02.answer2)
                      ? InputStatus.DEFAULT
                      : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                />
                <Typography>most of the whakapapa.</Typography>
              </Box>
            </Box>
          </Box>
        </Content>
        <BoxWrap justifyContent={'flex-end'} width={'100%'} flex={1}>
          <Box width={'30%'}></Box>
          <Box width={'30%'} hAlign='flex-end'>
            <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px', marginTop: 'auto' }} onClick={handleButtonClick}>
              <CustomButtonLabel>지문 보기</CustomButtonLabel>
            </Button>
          </Box>
        </BoxWrap>
        <Dialog
          width={893}
          height={458}
          topHeight={50}
          useHeader
          header={() => (
            <Box height='50px' marginBottom='20px' background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
              <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                {title}
              </Typography>
            </Box>
          )}
          isShow={isMainTextOpen}
          onClose={handleDialogClose}
          useFooter={true}
          closeLabel={'지문 닫기'}
        >
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography useGap={true} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                {paragraph}
              </Typography>
              <br />
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Dialog>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Box>
            <Box marginTop='12px'>
              <Typography usePre>{`(1) ` + cardData.p02.solution1 + `\n(2) ` + cardData.p02.solution2}</Typography>
            </Box>
          </Box>
        </BottomSheet>
      </Container>
    </>
  );
};
const Content = styled.div`
  padding: 14px 0 0 20px;
  margin-top: 55px;
  margin-left: 20px;
`;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;

export default P02;
