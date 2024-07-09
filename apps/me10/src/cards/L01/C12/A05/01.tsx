import { useEffect, useState } from 'react';
import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { L01C12A05 } from './store';
const P01 = () => {
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C12A05);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionText = (
    <>
      <Typography useGap={false} fontSize='var(--font-size-32)'>
        9. 다음 글의 내용과 일치하지&nbsp;
      </Typography>
      <Typography textDecoration='underline' fontSize='var(--font-size-32)' useGap={false}>
        않는
      </Typography>
      <Typography useGap={false} fontSize='var(--font-size-32)'>
        &nbsp;것을 골라 봅시다.
      </Typography>
    </>
  );

  const data = [
    {
      text: '오늘은 학교 가는 첫날이다.',
    },
    {
      text: '나는 school survival kit를 만든다.',
    },
    {
      text: '테니스공을 꽉 잡으면 긴장감이 사라진다.',
    },
  ];

  const info = {
    text: (
      <>
        Tomorrow is the first day of school. I make my own school survival kit. In my survival kit, I have a tennis ball. I hold it tightly. Then I am
        not nervous anymore. Also, I have many pens. I love colors!
      </>
    ),
    data: data,
  };

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

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

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
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

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.answer === 0}
      submitBtnColor={cardData.p01.answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={submitAnswer}
    >
      <Box display='flex' boxGap={24}>
        <Box background='white' width={500} lineHeight='48px' useRound marginRight={24}>
          {info.text}
        </Box>
        <Box paddingRight={5}>
          <List
            gap={10}
            data={info.data}
            row={({ value, index = 1 }) => (
              <Radio
                ariaLabel={index + '번 보기'}
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p01.answer}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                onClick={() => handleChange(index)}
                readOnly={cardData.p01.isSubmitted}
                defaultValue={cardData.p01.answer === cardData.p01.solution}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
