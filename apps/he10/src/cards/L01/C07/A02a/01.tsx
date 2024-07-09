import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  List,
  Question,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L01C07A02a } from './store';
import { dialogContentA02, imageAltA02 } from '@/cards/L01/C07/commonData';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM} lineHeight='unset'>
        The Power of Friendliness: Soft but Strong
      </Typography>
    </Box>
  );
};

const P01 = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02a);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarize the main text.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const wordArr = ['Conclusion', 'Differences', 'Examples', 'Topic'];

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: { ...prev.p01.answer3, value } } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: { ...prev.p01.answer4, value } } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      checkAnswerCorrect();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const checkAnswerCorrect = () => {
    const isCorrect1 = cardData.p01.answer1.value.trim().toLowerCase() === cardData.p01.answer1.solution.toLowerCase();
    const isCorrect2 = cardData.p01.answer2.value.trim().toLowerCase() === cardData.p01.answer2.solution.toLowerCase();
    const isCorrect3 = cardData.p01.answer3.value.trim().toLowerCase() === cardData.p01.answer3.solution.toLowerCase();
    const isCorrect4 = cardData.p01.answer4.value.trim().toLowerCase() === cardData.p01.answer4.solution.toLowerCase();

    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: {
          ...cardData.p01.answer1,
          isCorrect: isCorrect1,
        },
        answer2: {
          ...cardData.p01.answer2,
          isCorrect: isCorrect2,
        },
        answer3: {
          ...cardData.p01.answer3,
          isCorrect: isCorrect3,
        },
        answer4: {
          ...cardData.p01.answer4,
          isCorrect: isCorrect4,
        },
        isAllCorrect: isAllCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1.value,
            isCorrect: cardData.p01.answer1.value.trim().toLowerCase() === cardData.p01.answer1.solution.toLowerCase(),
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2.value,
            isCorrect: cardData.p01.answer2.value.trim().toLowerCase() === cardData.p01.answer2.solution.toLowerCase(),
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer3.value,
            isCorrect: cardData.p01.answer3.value.trim().toLowerCase() === cardData.p01.answer3.solution.toLowerCase(),
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer4.value,
            isCorrect: cardData.p01.answer4.value.trim().toLowerCase() === cardData.p01.answer4.solution.toLowerCase(),
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const checkInputAllFilled = (): boolean => {
    return (
      isNotEmptyString(cardData.p01.answer1.value.trim().toLowerCase()) &&
      isNotEmptyString(cardData.p01.answer2.value.trim().toLowerCase()) &&
      isNotEmptyString(cardData.p01.answer3.value.trim().toLowerCase()) &&
      isNotEmptyString(cardData.p01.answer4.value.trim().toLowerCase())
    );
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            answer1: {
              ...prev.p01.answer1,
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || false,
            },
            answer2: {
              ...prev.p01.answer2,
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: userSubmissionList[0].inputData[1]?.isCorrect || false,
            },
            answer3: {
              ...prev.p01.answer3,
              value: userSubmissionList[0].inputData[2]?.value || '',
              isCorrect: userSubmissionList[0].inputData[2]?.isCorrect || false,
            },
            answer4: {
              ...prev.p01.answer4,
              value: userSubmissionList[0].inputData[3]?.value || '',
              isCorrect: userSubmissionList[0].inputData[3]?.isCorrect || false,
            },
            isAllCorrect: userSubmissionList[0].isCorrect,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!checkInputAllFilled()}
      submitBtnColor={checkInputAllFilled() ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      useExtend
    >
      <BoxWrap>
        <Box marginLeft={'70px'} hAlign={'center'}>
          <Image
            type={EImageType.IMG}
            src={'/L01/C07/A02/HE1-L01-C07-A02-P01.jpg'}
            alt=''
            height='450px'
            width='789px'
            ariaDescribedby={'img_desc'}
          />
          <Box type='hidden' id={'img_desc'}>
            {imageAltA02}
          </Box>
        </Box>
        <Box hAlign='flex-end' vAlign='flex-start'>
          <Button
            minWidth='96px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문 보기'
            onClick={() => {
              lastFocusedElementRef.current = document.activeElement as HTMLElement;
              setShowModal(true);
            }}
            useRound
          />
        </Box>
      </BoxWrap>
      <Box display={'flex'} marginTop='20px' width={'100%'} gap={'10px'}>
        <ListItem>
          <Box hAlign='center'>
            <Question type='text' size='small'>
              (1)
            </Question>
            <ItemWrap>
              <Input
                status={cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                name='answer1'
                width={'177px'}
                maxLength={30}
                value={cardData.p01.answer1.value}
                onChange={e => handleInputChange(1, e.target.value)}
                ariaLabel='1번 답 입력란'
                readOnly={cardData.p01.isSubmitted}
              />
            </ItemWrap>
          </Box>
        </ListItem>
        <ListItem>
          <Box hAlign='center'>
            <Question type='text' size='small'>
              (2)
            </Question>
            <ItemWrap>
              <Input
                status={cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                name='answer2'
                width={'177px'}
                maxLength={30}
                value={cardData.p01.answer2.value}
                onChange={e => handleInputChange(2, e.target.value)}
                ariaLabel='2번 답 입력란'
                readOnly={cardData.p01.isSubmitted}
              />
            </ItemWrap>
          </Box>
        </ListItem>
        <ListItem>
          <Box hAlign='center'>
            <Question type='text' size='small'>
              (3)
            </Question>
            <ItemWrap>
              <Input
                status={cardData.p01.isSubmitted && !cardData.p01.answer3.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                name='answer3'
                width={'177px'}
                maxLength={30}
                value={cardData.p01.answer3.value}
                onChange={e => handleInputChange(3, e.target.value)}
                ariaLabel='3번 답 입력란'
                readOnly={cardData.p01.isSubmitted}
              />
            </ItemWrap>
          </Box>
        </ListItem>
        <ListItem>
          <Box hAlign='center'>
            <Question type='text' size='small'>
              (4)
            </Question>
            <ItemWrap>
              <Input
                status={cardData.p01.isSubmitted && !cardData.p01.answer4.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                name='answer4'
                width={'177px'}
                maxLength={30}
                value={cardData.p01.answer4.value}
                onChange={e => handleInputChange(4, e.target.value)}
                ariaLabel='4번 답 입력란'
                readOnly={cardData.p01.isSubmitted}
              />
            </ItemWrap>
          </Box>
        </ListItem>
      </Box>
      <Box marginTop='20px'>
        <TextView title='보기'>
          <List align='horizontal' data={wordArr} row={({ value, index = 1 }) => <Typography key={`samples-${index}`}>{value}</Typography>} />
        </TextView>
      </Box>

      <Dialog
        useHeader
        header={DialogHeader}
        width={893}
        height={458}
        topHeight={50}
        isShow={showModal}
        onClose={() => {
          setShowModal(false);
          if (lastFocusedElementRef.current) {
            lastFocusedElementRef.current.focus();
          }
        }}
        useFooter={true}
        closeLabel={'지문 닫기'}
        tabIndex={101}
      >
        <Box>
          {dialogContentA02.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                {paragraph}
              </Typography>
              <br />
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Box>
      </Dialog>

      {/* 답안보기 바텀시트 */}
      <BottomSheet bottomSheetTargetId='targetContainer' height='400px' show={showAnswer && cardData.p01.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box vAlign={'center'} display={'flex'} marginTop='12px' gap={'30px'}>
            <Typography useGap={false}>(1) {cardData.p01.answer1.solution}</Typography>
            <Typography useGap={false}>(2) {cardData.p01.answer2.solution}</Typography>
            <Typography useGap={false}>(3) {cardData.p01.answer3.solution}</Typography>
            <Typography useGap={false}>(4) {cardData.p01.answer4.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const ListItem = styled.li`
  white-space: pre-line;
  line-height: 40px;
  display: inline-block;
`;
