import {
  TMainHeaderInfoTypes,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  Image,
  BoxWrap,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  IQuestionProps,
  PinchZoom,
  Dropdown,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C03A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02b);
  const { userId } = useRecoilValue(studentAtom);

  const dropArr = ['Buy things on sale', 'Make a spending plan'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the man’s advice? Choose the correct one.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.mp3',
    captionSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.srt',
  };

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
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(prev => !prev);
      return;
    }
    const isCorrect = isAnswer(cardData.p01.answer, cardData.p01.solution);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const handleDropdownClick = (value: string | undefined) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value ? value : '' } }));
    changeData('P01', 1, 1, value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={!isNotEmptyString(cardData.p01.answer)}
      submitBtnColor={
        isNotEmptyString(cardData.p01.answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      audioInfo={audioInfo}
    >
      <BoxWrap>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={'/L02/C03/A02/HE2-L02-C03-A02-01.jpg'} width='300px' height='330px' alt='미소짓는 남자 앞에 돼지저금통과 쌓인 동전이 있음' />
          </PinchZoom>
        </Box>
        <Box hAlign='center'>
          <BoxWrap height='100px' flexDirection='column' marginTop={'30px'} marginBottom={'70px'}>
            <Box display='flex' alignItems='center' flexWrap='wrap'>
              <Dropdown
                width={`330px`}
                dropdownList={dropArr}
                selectedValue={cardData.p01.answer}
                onClick={value => handleDropdownClick(value)}
                readOnly={cardData.p01.isSubmitted}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                ariaLabel='1번째 답 선택칸'
              />
              &nbsp; to use
              <Typography>money wisely.</Typography>
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
