import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Typography,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Radio,
  List,
  Label,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C12A05 } from './store';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const PAGE = 'P02';

const P02 = () => {
  const content1 = `I want to be a `;
  const content2 = ` person in the future. I will listen to others and think of their feelings. I will help people in need around the world. How about you? Who do you want to be in the future?`;
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L06C12A05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Box marginRight='10px'>
          <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'}>
            11.
          </Typography>
          <Typography fontSize='32px'>다음 글의 ‘ I’ 에 관한 설명으로 알맞은 것을 골라 봅시다.</Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const data = [
    { text: '다른 사람들의 말에 귀를 기울일 것이다.' },
    { text: '다른 사람들에게 음악을 들려줄 것이다.' },
    { text: '어려움에 처했을 때 주변 사람들에게 도움을 요청할 것이다.' },
  ];

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData(PAGE, 1, 1, index);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p02.answer === cardData.p02.solution;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].isCorrect,
          },
        }));
      }
      initData(PAGE, userSubmissionList, [], isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
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
      vAlign='center'
      submitLabel={!cardData.p02.isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={cardData.p02.answer === 0}
      submitBtnColor={cardData.p02.answer === 0 ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={!cardData.p02.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap useFull marginTop={10} alignItems='center'>
        <Box background='white' useRound useFull lineHeight='40px' alignItems='center'>
          <Typography useGap={false}>
            &nbsp;&nbsp;&nbsp;{content1}
            {''}
            <Typography type='blank' title='빈칸' width='100px' boxColor='var(--color-black)' />
            {content2}
          </Typography>
        </Box>

        <Box hAlign={'center'} useFull>
          <List
            gap={10}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={index === cardData.p02.answer}
                onClick={() => handleChangeValue(index)}
                readOnly={cardData.p02.isSubmitted}
                isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>1 </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
