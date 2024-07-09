import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  Image,
  InputStatus,
  List,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C09A03 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [btnColor, setBtnColor] = useState<EStyleButtonTypes>(EStyleButtonTypes.SECONDARY);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [cardData, setCardData] = useRecoilState(L04C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

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
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const { answer, isSubmitted, contents, contentsAnswer } = cardData.p01;

  useEffect(() => {
    if (!answer.some(val => val === '') && !showAnswer) {
      setIsDisabled(false);
      setBtnColor(EStyleButtonTypes.PRIMARY);
    }
  }, [cardData, showAnswer]);

  const handleSubmit = () => {
    if (isSubmitted) {
      if (!showAnswer) {
        setBtnColor(EStyleButtonTypes.GRAY);
      }
      setShowAnswer(!showAnswer);
      return;
    }

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, updatedAnswers);
  };

  const questionInfo = {
    text: `Look at the graph and answer the questions.`,
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!isSubmitted ? '완료하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      onSubmit={() => {
        handleSubmit();
      }}
      submitBtnColor={btnColor}
      submitDisabled={isDisabled}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'}>
          <PinchZoom>
            <Image src={'/L04/C09/A03/HE1-L04-C09-A03-P01.jpg'} width='450px' height='300px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>이 이미지는 원형그래프 입니다.</p>
              <p>
                Distribution of Home Energy Consumption Others 10% Water Heating 16% Household Appliances 19% Lighting 2% Space Heating 53% Source:
                IEA, 2018
              </p>
            </Box>
          </PinchZoom>
        </Box>
        <Box tabIndex={0} display='flex' alignItems='center'>
          <List data={contents} gap={20}>
            {({ value: item, index = 0 }) => (
              <Box>
                <Typography>{item}</Typography>
                <Box marginTop={'8px'}>
                  <Textarea
                    width='100%'
                    height='90px'
                    value={answer[index - 1]}
                    textAlign='left'
                    placeholder='내용을 넣어 주세요.'
                    readOnly={isSubmitted}
                    status={isSubmitted ? InputStatus.DEFAULT : InputStatus.ENABLE}
                    onChange={e => handleChange(index - 1, e.target.value)}
                    ariaLabel={`${index + 1}번 답 입력란`}
                  />
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box display='flex' flexDirection='column' marginTop='12px'>
            <Scroll>
              {contentsAnswer.map((value, index) => (
                <Box display='flex' flexDirection='column' key={index}>
                  <Typography useGap={false} title='asdf'>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Scroll>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
