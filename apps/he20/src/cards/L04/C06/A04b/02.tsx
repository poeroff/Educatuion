import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  BoxWrap,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Button,
  EStyleSizes,
  Dialog,
  List,
  Question,
  ChipButton,
  EChipButtonType,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
  Scroll,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { CommonData } from './commonData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C06A04b } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import React from 'react';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A04b);
  const { userId } = useRecoilValue(studentAtom);

  const currentPage = 'P02';
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (2)',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.data[0].userAnswer === cardData.p02.solution[0];
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p02.data[0].userAnswer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(currentPage, userSubmission, isCorrect);
    }
  };

  const handleChange = (newAnswer: boolean | undefined) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        data: [
          {
            ...prev.p02.data[0],
            userAnswer: newAnswer,
          },
        ],
      },
    }));
    changeData(currentPage, 1, 1, newAnswer);
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
            data: [
              {
                ...prev.p02.data[0],
                userAnswer:
                  userSubmissionList[0].inputData[0]?.value !== undefined
                    ? userSubmissionList[0].inputData[0]?.value
                    : cardData.p02.data[0].userAnswer,
              },
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
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

  const questionText = (
    <Typography>
      <Typography weight={'var(--font-weight-bold)'}>Q2.</Typography> Check T (true) or F (false) according to the passage.
    </Typography>
  );
  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmit}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p02.data[0].userAnswer === undefined}
      submitBtnColor={
        cardData.p02.data[0].userAnswer === undefined
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      vAlign='flex-start'
      bodyId='targetContainer'
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button tabIndex={101} label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>
      <List data={cardData.p02.data} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 참 버튼'}
                  status={EChipButtonType.TRUE}
                  isActive={value?.userAnswer === true}
                  size={'48px'}
                  onClick={() => handleChange(true)}
                  readOnly={cardData.p02.isSubmitted}
                  isError={
                    cardData.p02.isSubmitted && value?.userAnswer === true
                      ? value?.userAnswer === cardData.p02.solution[index - 1]
                        ? false
                        : true
                      : false
                  }
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 거짓 버튼'}
                  status={EChipButtonType.FALSE}
                  isActive={value?.userAnswer === false}
                  size={'48px'}
                  onClick={() => handleChange(false)}
                  readOnly={cardData.p02.isSubmitted}
                  isError={
                    cardData.p02.isSubmitted && value?.userAnswer === false
                      ? value?.userAnswer === cardData.p02.solution[index - 1]
                        ? false
                        : true
                      : false
                  }
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{`T`}</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        width={940}
        height={500}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
              Will AI-Powered Neural Implants Make Us Super-Humans? (2)
            </Typography>
          </Box>
        )}
        isShow={isShowModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel='지문 닫기'
      >
        {CommonData.content.split('\n').map((paragraph, index, arr) => (
          <React.Fragment key={index}>
            <Typography useGap={true} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
              {paragraph}
            </Typography>
            {index !== arr.length - 1}
          </React.Fragment>
        ))}
      </Dialog>
    </Container>
  );
};

export default P02;
