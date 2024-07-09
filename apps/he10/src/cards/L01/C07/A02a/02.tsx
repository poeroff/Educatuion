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
  PinchZoom,
  Scroll,
  SvgIcon,
  Tag,
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
import arrow_right from '@/assets/icon/arrow_right.svg';
import { dialogContentA02, imageAltA02 } from '@/cards/L01/C07/commonData';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const DialogHeader = () => (
  <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
    <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM} lineHeight='unset'>
      The Power of Friendliness: Soft but Strong
    </Typography>
  </Box>
);

const P02 = () => {
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
    text: 'Fill in the blanks to summarize the main text.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value } } }));
    }
    changeData('P02', 2, subKey, value);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      checkAnswerCorrect();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const checkAnswerCorrect = () => {
    const isCorrect1 =
      cardData.p02.answer1.value.trim().toLowerCase() === cardData.p02.answer1.solution ||
      cardData.p02.answer1.value.trim().toLowerCase() === cardData.p02.answer1.solution.substring(1);
    const isCorrect2 =
      cardData.p02.answer2.value.trim().toLowerCase() === cardData.p02.answer2.solution ||
      cardData.p02.answer2.value.trim().toLowerCase() === cardData.p02.answer2.solution.substring(1);
    const isAllCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: { ...prev.p02.answer1, isCorrect: isCorrect1 },
        answer2: { ...prev.p02.answer2, isCorrect: isCorrect2 },
        isAllCorrect: isAllCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 2,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1.value,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2.value,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isAllCorrect);
  };

  const checkInputAllFilled = (): boolean => {
    return (
      cardData.p02.answer1.value !== undefined &&
      isNotEmptyString(cardData.p02.answer1.value) &&
      cardData.p02.answer2.value !== undefined &&
      isNotEmptyString(cardData.p02.answer2.value)
    );
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 2,
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            answer1: {
              ...prev.p02.answer1,
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || false,
            },
            answer2: {
              ...prev.p02.answer2,
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: userSubmissionList[0].inputData[1]?.isCorrect || false,
            },
            isAllCorrect: userSubmissionList[0].isCorrect,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!checkInputAllFilled()}
      submitBtnColor={checkInputAllFilled() ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
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
      <BoxWrap>
        <Box width={'50%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image
              type={EImageType.IMG}
              src={'/L01/C07/A02/HE1-L01-C07-A02-P02.jpg'}
              alt=''
              height='240px'
              width='486px'
              ariaDescribedby={'img_desc'}
            />
            <Box type='hidden' id={'img_desc'}>
              {imageAltA02}
            </Box>
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} height={'342px'} width='50%' hAlign='center'>
          {' '}
          <Scroll height={'282px'} width={'434px'} tabIndex={0}>
            <Box>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Dogs
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                easily found the cup by following the human’s pointing gestures
              </Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Wolves
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                chose cups randomly,
              </Typography>
            </Box>
            <Box hAlign='flex'>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                (1) i{' '}
                <Input
                  width='130px'
                  name={'answer1'}
                  maxLength={20}
                  value={cardData.p02.answer1.value}
                  onChange={e => handleInputChange(1, e.target.value)}
                  status={cardData.p02.isSubmitted && !cardData.p02.answer1.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                  ariaLabel={'1번 답 입력란'}
                  readOnly={cardData.p02.isSubmitted}
                />{' '}
                the human’s
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                gestures.
              </Typography>
            </Box>
            <Box hAlign='flex'>
              <SvgIcon src={arrow_right} size='34px' />
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                Dogs' (2) c{' '}
                <Input
                  width='210px'
                  name={'answer2'}
                  maxLength={20}
                  value={cardData.p02.answer2.value}
                  onChange={e => handleInputChange(2, e.target.value)}
                  status={cardData.p02.isSubmitted && !cardData.p02.answer2.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                  ariaLabel={'2번 답 입력란'}
                  readOnly={cardData.p02.isSubmitted}
                />
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                skills with humans and friendly nature may have helped them survive better than wolves.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

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
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                {paragraph}
              </Typography>
              <br />
              {index !== arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Box>
      </Dialog>
      {/* 답안보기 바텀시트 */}
      <BottomSheet bottomSheetTargetId='targetContainer' height='400px' show={showAnswer && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography>
              (1) {cardData.p02.answer1.solution.substring(1)}
              <br />
              {cardData.p02.answer1.solution}(정답 인정)
            </Typography>
            <Typography>
              (2) {cardData.p02.answer2.solution.substring(1)}
              <br />
              {cardData.p02.answer2.solution}(정답 인정)
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
