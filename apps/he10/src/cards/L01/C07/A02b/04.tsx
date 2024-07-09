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
  PinchZoom,
  Scroll,
  SvgIcon,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow_right from '@/assets/icon/arrow_right.svg';
import { dialogContentA02, imageAltA02 } from '@/cards/L01/C07/commonData';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
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

const P04 = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: { ...prev.p04.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: { ...prev.p04.answer2, value } } }));
    }
    changeData('P04', 4, subKey, value);
  };

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      checkAnswerCorrect();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const checkAnswerCorrect = () => {
    const isCorrect1 = cardData.p04.answer1.value.trim().toLowerCase() === cardData.p04.answer1.solution;
    const isCorrect2 = cardData.p04.answer2.value.trim().toLowerCase() === cardData.p04.answer2.solution;
    const isAllCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer1: { ...prev.p04.answer1, isCorrect: isCorrect1 },
        answer2: { ...prev.p04.answer2, isCorrect: isCorrect2 },
        isAllCorrect: isAllCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 4,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1.value,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2.value,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P04', userSubmission, isAllCorrect);
  };

  const checkInputAllFilled = (): boolean => {
    return isNotEmptyString(cardData.p04.answer1.value) && isNotEmptyString(cardData.p04.answer2.value);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 4,
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
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            answer1: {
              ...prev.p04.answer1,
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || false,
            },
            answer2: {
              ...prev.p04.answer2,
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: userSubmissionList[0].inputData[1]?.isCorrect || false,
            },
            isAllCorrect: userSubmissionList[0].isCorrect,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the given words to summarize.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
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
                Neanderthals
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                were intelligent and had stronger bodies, living in smaller
              </Typography>
            </Box>
            <Box hAlign='flex'>
              <Typography useGap={false} weight={'medium'}>
                groups.
              </Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Homo Sapiens
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                lived in larger communities, working together and
              </Typography>
            </Box>
            <Box hAlign='flex' marginTop={'4px'}>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                (4){' '}
                <Input
                  width='168px'
                  name={'input4'}
                  maxLength={20}
                  value={cardData.p04.answer1.value}
                  onChange={e => handleInputChange(1, e.target.value)}
                  status={cardData.p04.isSubmitted && !cardData.p04.answer1.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                  ariaLabel={'4번 답 입력란'}
                  readOnly={cardData.p04.isSubmitted}
                />{' '}
                knowledge.
              </Typography>
            </Box>
            <Box hAlign='flex' marginTop={'20px'}>
              <SvgIcon src={arrow_right} size='34px' />
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                Homo sapiens (5){' '}
                <Input
                  width='133px'
                  name={'input5'}
                  maxLength={20}
                  value={cardData.p04.answer2.value}
                  onChange={e => handleInputChange(2, e.target.value)}
                  status={cardData.p04.isSubmitted && !cardData.p04.answer2.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                  ariaLabel={'5번 답 입력란'}
                  readOnly={cardData.p04.isSubmitted}
                />{' '}
              </Typography>
            </Box>
            <Box hAlign='flex' marginTop={'4px'}>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}></Typography>
            </Box>
            <Box>
              <Typography useGap={false} weight={'medium'} size={EStyleFontSizes.MEDIUM}>
                better to a changing environment and ultimately survived.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <Box marginTop='15px'>
        <TextView title='보기'>
          <List
            align='horizontal'
            data={['adapted', 'cooperative', 'exchanging', 'failed', 'ignoring', 'success']}
            row={({ value, index = 1 }) => <Typography key={`samples-${index}`}>{value}</Typography>}
          />
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='400px' show={showAnswer && cardData.p04.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
            <Typography useGap={false}>(4) {cardData.p04.answer1.solution}</Typography>
            <Typography useGap={false}>(5) {cardData.p04.answer2.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
