import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
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
  BottomSheet,
  ETagLine,
  Tag,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A04, getUserSubmissionStoreP01 } from './store';
import { getUserSubmission } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P01';

const P01 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A04);
  const defaultSubmission = getUserSubmissionStoreP01(-1, false);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };
  const questionInfo: IQuestionProps = {
    text: '1. Which of the following best describes the characters’ feelings in (A) and (B)?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const data = [
    {
      text: 'worried …… upset',
    },
    {
      text: 'nervous …… indifferent',
    },
    {
      text: 'shameful …… disappointed',
    },
    {
      text: 'disinterested …… relieved',
    },
  ];

  const getUnderlineAndBold = (alphabet: string, text: string, bold = false) => {
    return (
      <>
        <Typography usePre weight={bold ? 'bold' : ''}>{`(${alphabet})`}</Typography>
        <Typography
          textDecoration='underline'
          style={{ display: 'inline', textUnderlinePosition: 'under' }}
          weight={bold ? 'bold' : ''}
          useGap={false}
        >
          {text}
        </Typography>{' '}
      </>
    );
  };

  const script: React.ReactNode = (
    <>
      <Typography usePre>
        When I arrived at Auntie’s place, I was shocked to see
        {getUnderlineAndBold('a', 'how thin was Nani Tama')}.
      </Typography>
      <Typography usePre>
        “Look, Nani,” I said. “I’m not taking you anywhere.
        {getUnderlineAndBold('A', 'You could die on me!”', true)}
      </Typography>
      <Typography usePre>Nani looked at me in anger. </Typography>
      <Typography usePre>
        “You want me to die here in this room? {getUnderlineAndBold('B', 'Looking at these four walls?', true)} When the whakapapa
        {getUnderlineAndBold('b', 'is not yet finished?”')}
      </Typography>
      <Typography usePre>
        The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but he tried to walk. I{' '}
        {getUnderlineAndBold('c', 'could not help but carry')}
        him to the car, and we set off with Auntie.
      </Typography>
      <Typography usePre>
        We traveled all night, mostly in silence, {getUnderlineAndBold('d', 'listening to Nani chanting')}
        in the darkness. It was strange but wonderful to hear him.
      </Typography>
    </>
  );

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValue = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData(PAGE, 1, 1, index);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p01.answer === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    submitDataWithResult(PAGE, getUserSubmissionStoreP01(cardData.p01.answer, isCorrect), isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].inputData[0].isCorrect : false,
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

  useEffect(() => {
    if (cardData.p01.answer === 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p01]);

  return (
    <Container
      bodyId='targetContainer'
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p01.isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={!cardData.p01.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap alignItems='center'>
        <Box height='384px' width='50%' background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px' alignItems='center'>
          <Scroll>{script}</Scroll>
        </Box>
        <Box useFull width='50%' height='280px' flex='1'>
          <Scroll>
            <List gap={10} data={data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  ariaLabel={index + '번 보기'}
                  value={index === cardData.p01.answer}
                  defaultValue={index === cardData.p01.answer}
                  onClick={() => handleChangeValue(index)}
                  readOnly={cardData.p01.isSubmitted}
                  isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
