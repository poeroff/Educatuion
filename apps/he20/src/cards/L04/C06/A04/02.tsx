import React, { useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  Button,
  Input,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  SvgIcon,
  BottomSheet,
  Tag,
  Typography,
  ETagLine,
  IQuestionProps,
  Dialog,
  EStyleFontSizes,
  InputStatus,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';

import { textContentA04 } from './commonData';
import { isNotEmptyString, isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L04C06A04 } from './store';

const P02 = () => {
  const pageKey = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const { content } = textContentA04;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q2. Fill in the blanks to complete the sentences.',
    mark: getMarking(cardData.P02.isSubmitted, cardData.P02.isCorrect),
  };

  const titleA04 = 'Will AI-Powered Neural Implants Make Us Super-Humans? (2)';

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

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect1 =
        isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1) || isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1_2);
      const isCorrect2 =
        isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2) || isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2_2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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
          [pageKey]: {
            ...prev[pageKey],
            answer1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
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
      submitLabel={cardData[pageKey].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitBtnColor={
        !isNotEmptyString(cardData[pageKey].answer1) || !isNotEmptyString(cardData[pageKey].answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!isNotEmptyString(cardData[pageKey].answer1) || !isNotEmptyString(cardData[pageKey].answer2)}
    >
      <Box background={'white'} useRound>
        <Box height='300px'>
          <Box>
            <Typography>How do neural implants work to treat brain disorders?</Typography>
          </Box>
          <Box>
            <SvgIcon style={{ verticalAlign: 'text-top' }} src={arrow_right} alt='오른쪽을 가르키는 화살표 아이콘' type={ESvgType.IMG} />
            <Typography>
              Neural implants electrically stimulate t
              <Input
                ariaLabel='1번 답 입력란'
                status={
                  cardData[pageKey].isSubmitted &&
                  !isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1) &&
                  !isAnswer(cardData[pageKey].answer1, cardData[pageKey].solution1_2)
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData[pageKey].answer1)
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                readOnly={cardData[pageKey].isSubmitted}
                maxLength={20}
                value={cardData[pageKey].answer1}
                onChange={e => {
                  handleChange(1, e.target.value);
                }}
                width='255px'
                placeholder='내용을 넣어 주세요.'
              />
            </Typography>
            <Typography>
              r
              <Input
                ariaLabel='2번 답 입력란'
                status={
                  cardData[pageKey].isSubmitted &&
                  !isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2) &&
                  !isAnswer(cardData[pageKey].answer2, cardData[pageKey].solution2_2)
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData[pageKey].answer2)
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                readOnly={cardData[pageKey].isSubmitted}
                maxLength={20}
                value={cardData[pageKey].answer2}
                onChange={e => {
                  handleChange(2, e.target.value);
                }}
                width='255px'
                placeholder='내용을 넣어 주세요.'
              />
              &nbsp; of the brain at the right time to treat brain disorders.
            </Typography>
          </Box>
        </Box>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='132px' useRound onClick={openModal} />
        </Box>
      </BoxWrap>

      <Dialog
        tabIndex={102}
        width={893}
        isShow={isShowModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel={'지문 닫기'}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='auto' marginBottom='20px' background={'var(--color-grey-100)'} vAlign='center' useRound={true}>
            <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
              {titleA04}
            </Typography>
          </Box>
        )}
      >
        <Box height='270px'>
          <Typography weight='var(--font-weight-medium)' size={EStyleFontSizes.MEDIUM}>
            &nbsp;{content}
          </Typography>
        </Box>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>{`targeted regions`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
