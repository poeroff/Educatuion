import { useState, useEffect, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  SvgIcon,
  BoxWrap,
  ESvgType,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  InputStatus,
  EStyleFontSizes,
  Tag,
  IQuestionProps,
  IAudioPlayerProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString, getMarking } from '@maidt-cntn/util/CommonUtil';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C12A03 } from './store';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const PAGE_KEY = 'p01';
  const PAGE_NUM = 'P01';
  const SOLUTIONS = ['go', 'camping'];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C12A03);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };
  const questionInfo: IQuestionProps = {
    text: '6. 잘 듣고, 물음에 답해 봅시다.',
    mark: getMarking(cardData[PAGE_KEY].isSubmitted, cardData[PAGE_KEY].isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C12/A03/ME1-L04-C12-A03-P01.mp3',
    captionSrc: '/L04/C12/A03/ME1-L04-C12-A03-P01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answers: userSubmissionList[0]?.inputData[0]?.value || cardData[PAGE_KEY].answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0]?.isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const tempAnswers = [...cardData[PAGE_KEY].answers];
    tempAnswers[Number(name.split('_')[1])] = value;

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answers: [...tempAnswers] } }));
    changeData(PAGE_NUM, 1, 1, tempAnswers);
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }
    const isCorrect1 = cardData[PAGE_KEY].answers[0] === SOLUTIONS[0];
    const isCorrect2 = cardData[PAGE_KEY].answers[1] === SOLUTIONS[1];
    const isAllCorrect = isCorrect1 && isCorrect2;

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[PAGE_KEY].answers,
            isAnswer: true,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true, isCorrect: isAllCorrect } }));
    submitDataWithResult(PAGE_NUM, userSubmission, isAllCorrect);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      onSubmit={handleSubmit}
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[PAGE_KEY].answers?.some(answer => answer === '')}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData[PAGE_KEY].answers.some(answer => answer === '')
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull flexDirection='column' paddingLeft='50px'>
        <Box useFull hAlign={'center'} vAlign='start' flexDirection='column'>
          <Box vAlign='center' marginBottom='10px'>
            <Typography>What will the boy’s family do this weekend?</Typography>
          </Box>
          <Box vAlign='center'>
            <SvgIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Typography>They’ll</Typography>
            <Input
              name='input_0'
              minWidth='20px'
              width='100px'
              textAlign='start'
              ariaLabel='첫번째 답란'
              value={cardData[PAGE_KEY].answers[0]}
              onChange={handleInputChange}
              readOnly={cardData[PAGE_KEY].isSubmitted}
              status={getStatus(cardData[PAGE_KEY].answers[0], SOLUTIONS[0])}
            />
            &nbsp;
            <Input
              name='input_1'
              minWidth='60px'
              textAlign='start'
              ariaLabel='두번째 답란'
              value={cardData[PAGE_KEY].answers[1]}
              onChange={handleInputChange}
              maxLength={50}
              readOnly={cardData[PAGE_KEY].isSubmitted}
              status={getStatus(cardData[PAGE_KEY].answers[1], SOLUTIONS[1])}
            />
            &nbsp;.
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              go camping
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
