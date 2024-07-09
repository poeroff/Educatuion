import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C12A05, getUserSubmissionStore } from './store';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission } from '@maidt-cntn/api';

const PAGE = 'P02';

const P02 = () => {
  const content1 = `Today, we had a new member on our team. Her name is Cathy and she is a cat! Cats are not good at playing fetch. We were `;
  const content2 = ` . But she surprised us. She was great at the ball game. After the game, we had another new member, Cookie. He is a goose! I like him already.`;

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C12A05);
  const defaultSubmission = getUserSubmissionStore(-1, false);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Typography useGap={false} fontSize='32px' lineHeight='50px' weight={'var(--font-weight-extraBold)'} style={{ paddingRight: '12px' }}>
          11.
        </Typography>
        다음 글의 내용과 일치하지{' '}
        <Typography
          textDecoration={'underline'}
          style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px', fontSize: '32px', padding: '4px 4px' }}
        >
          않는
        </Typography>{' '}
        것을 골라 봅시다.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const buttons = [
    {
      text: 'Cathy는 고양이다.',
    },
    {
      text: 'Cathy는 운동을 못한다.',
    },
    {
      text: '게임이 끝난 후에 새 팀원이 왔다.',
    },
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
    submitDataWithResult(PAGE, getUserSubmissionStore(cardData.p02.answer, isCorrect), isCorrect);
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
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
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
      submitDisabled={cardData.p02.answer === -1}
      submitBtnColor={cardData.p02.answer === -1 ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={!cardData.p02.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap useFull marginTop={10} alignItems='center'>
        <Box background='white' useRound useFull height='400px' lineHeight='40px' alignItems='center'>
          <Scroll tabIndex={0}>
            <Typography usePre style={{ textIndent: '15px' }}>
              {content1}
              <Typography type='blank' title='빈칸' width='100px' boxColor='var(--color-black)' />
              {content2}
            </Typography>
          </Scroll>
        </Box>

        <Box hAlign={'center'} useFull>
          <List
            data={buttons}
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
                <Box height='50px' alignContent='center'>
                  <Label value={index} /> {value?.text}
                </Box>
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
          <Box marginTop='12px'>{cardData.p02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
