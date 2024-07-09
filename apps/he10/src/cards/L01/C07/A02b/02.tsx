import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  SvgIcon,
  IQuestionProps,
  Input,
  BottomSheet,
  Tag,
  ETagLine,
  TextView,
  List,
  EStyleSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { dialogContentA02, imageAltA02 } from '@/cards/L01/C07/commonData';
import { L01C07A02b } from './store';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        The Power of Friendliness: Soft but Strong
      </Typography>
    </Box>
  );
};

const P02 = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the given words to summarize.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const wordArr = ['adapted', 'cooperative', 'exchanging', 'failed', 'ignoring', 'success'];
  const answer = 'ignoring';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value: e.target.value } },
    }));
    changeData('P02', 1, 1, e.target.value);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      checkAnswerCorrect();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const checkAnswerCorrect = () => {
    const isCorrect = cardData.p02.answer1.value.trim().toLowerCase() === answer;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: { ...prev.p02.answer1, isCorrect },
        isAllCorrect: isCorrect,
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
            value: cardData.p02.answer1.value,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const checkInputAllFilled = (): boolean => {
    return cardData.p02.answer1.value !== undefined && isNotEmptyString(cardData.p02.answer1.value);
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
            isAllCorrect: userSubmissionList[0].isCorrect,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!checkInputAllFilled()}
      submitBtnColor={checkInputAllFilled() ? (showAnswer ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
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
        <Box width={'50%'} hAlign={'center'} height={'240px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={'/L01/C07/A02/HE1-L01-C07-A02-P02.jpg'} alt='' width='486px' ariaDescribedby={'img_desc'} />
            <Box type='hidden' id={'img_desc'}>
              {imageAltA02}
            </Box>
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} height={'240px'} width='50%' hAlign='center'>
          <Scroll width={'434px'} tabIndex={0}>
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
                (1){' '}
                <Input
                  width='130px'
                  maxLength={20}
                  value={cardData.p02.answer1.value}
                  onChange={handleInputChange}
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
                Dogs' communicative skills
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                with humans and friendly nature may have helped them survive better than wolves.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Box marginTop='15px'>
        <TextView title='보기'>
          <List align='horizontal' data={wordArr} row={({ value, index = 1 }) => <Typography key={`samples-${index}`}>{value}</Typography>} />
        </TextView>
      </Box>
      <Dialog
        useHeader
        header={DialogHeader}
        topHeight={50}
        width={893}
        height={458}
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
            <Typography useGap={false}>(1) {answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
