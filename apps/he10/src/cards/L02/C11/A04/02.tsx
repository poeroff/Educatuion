import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Scroll,
  Typography,
  EStyleButtonTypes,
  Textarea,
  BottomSheet,
  ETagLine,
  Tag,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A04, getUserSubmissionStoreP02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P02';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A04);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const defaultSubmission = getUserSubmissionStoreP02('', '');
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: `2. Choose the one with a grammatical error among (a) -  (d) and correct it.`,
  };

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
        When I arrived at Auntie’s place, I was shocked to see {getUnderlineAndBold('a', 'how thin was Nani Tama', true)}.
      </Typography>
      <Typography usePre>
        “Look, Nani,” I said. “I’m not taking you anywhere.
        {getUnderlineAndBold('A', 'You could die on me!”')}
      </Typography>
      <Typography usePre>Nani looked at me in anger. </Typography>
      <Typography usePre>
        “You want me to die here in this room?
        {getUnderlineAndBold('B', 'Looking at these four walls?')}
        When the whakapapa {getUnderlineAndBold('b', 'is not yet finished?”', true)}
      </Typography>
      <Typography usePre>
        The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but he tried to walk. I{' '}
        {getUnderlineAndBold('c', 'could not help but carry', true)}
        him to the car, and we set off with Auntie.
      </Typography>
      <Typography usePre>
        We traveled all night, mostly in silence, {getUnderlineAndBold('d', 'listening to Nani chanting', true)}
        in the darkness. It was strange but wonderful to hear him.
      </Typography>
    </>
  );

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleChangeValues = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, [name]: value } }));
    changeData(PAGE, 1, name === 'answer1' ? 1 : 2, value);
  };

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    submitDataWithResult(PAGE, getUserSubmissionStoreP02(cardData.p02.answer1, cardData.p02.answer2), true);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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
    if (!isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p02]);

  return (
    <Container
      bodyId='targetContainer'
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={isButtonDisabled}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={!cardData.p02.isSubmitted ? handleSubmit : handleShowAnswer}
    >
      <BoxWrap>
        <Box height='384px' width='50%' background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>{script}</Scroll>
        </Box>
        <Box
          vAlign='center'
          useFull
          width='50%'
          marginLeft='50px'
          height='350px'
          flex='1'
          verticalAlign='vertical'
          display='block'
          alignContent='center'
        >
          <Box>
            <Typography useGap={false}>틀린 부분</Typography>
            <Textarea
              width='350px'
              height='100px'
              name='answer1'
              ariaLabel={'틀린 부분 입력'}
              value={cardData.p02.answer1}
              onChange={handleChangeValues}
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
          <Box paddingTop='40px'>
            <Typography useGap={false}>고친 내용</Typography>
            <Textarea
              width='350px'
              height='100px'
              name='answer2'
              ariaLabel={'고친 내용 입력'}
              value={cardData.p02.answer2}
              onChange={handleChangeValues}
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution1}</Box>
          <Box marginTop='12px'>{cardData.p02.solution2}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
