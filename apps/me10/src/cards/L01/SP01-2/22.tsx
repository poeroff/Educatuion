import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
  TextView,
  EStyleFontSizes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0102 } from './store';

const P22 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0102);

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P14.mp3',
  };

  const question =
    '(A) No, I don’t. I like sports. My favorite sport is baseball.\n (B) Yes, I do. K-pop is my favorite music. Do you like music, too?\n (C) Cool!';

  const choices = ['(A) - (B) - (C)', '(B) - (A) - (C)', '(B) - (C) - (A)', '(C) - (A) - (B)', '(C) - (B) - (A)'];
  const answer = 2;
  const explanation =
    '음악을 좋아하는지 묻는 질문에 이어, 좋아한다고 답하며, 상대방에게도 음악을 좋아하는지 묻는 (B)가 가장 먼저 나오는 것이 자연스럽다. 음악을 좋아하지 않고, 스포츠를 좋아한다는 답변에 이어(A), 그에 대한 반응으로(C) 이어지는 것이 적절하다.';
  const script =
    'B: Mira, do you like music?\n G: No, I don’t. I like sports. My favorite sport is baseball.\n B: Yes, I do. K-pop is my favorite music. Do you like music, too?\n G: Cool!';
  const translation =
    'B: 미라야, 음악 좋아해?\n G: 응, 그래. K-pop이 가장 좋아. 너도 음악 좋아하니? \n B: 아니, 그렇지 않아. 나는 스포츠를 좋아해. 가장 좋아하는 스포츠는 야구야.\n G: 멋진데!';

  const [mark, setMark] = useState<TMarkType>('none');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const pageNumber = 'P22';
  const pageKey = 'p22';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: '2. 대화를 듣고, 주어진 말에 이어질 대화를 순서대로 배열한 것을 고르시오.',
      mark: mark,
    }),
    [mark],
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: null,
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => cardData[pageKey].selectedIdx === answer - 1, [cardData[pageKey].selectedIdx]);
  useEffect(() => {
    if (cardData[pageKey].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageKey].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            selectedIdx: userSubmissionList[0].inputData[0]?.value || prev[pageKey].selectedIdx,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData[pageKey].isSubmitted) return;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], selectedIdx: index } }));
    changeData(pageNumber, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsModalOpen(!isModalOpen);
    } else {
      submitAnswer();
    }
  };

  const data = choices.map(text => ({ text }));

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isModalOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[pageKey].selectedIdx == null}
      submitBtnColor={
        cardData[pageKey].selectedIdx != null ? (isModalOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmitClick}
    >
      <Box useFull hAlign='center' padding='20px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='left' display='inline' alignContent='center' padding='10px' background='white' useRound>
            <Typography>A : Mira, do you like music?</Typography>
          </Box>
          <Box width='910px' height='148px' display='inline' margin={'-10px 0 10px 0px'}>
            <TextView title='보기' vAlign='start' hAlign='start' padding='20px 16px'>
              <Typography align='left' usePre useGap={false} fontSize={'24px'} lineHeight={'36px'}>
                {question}
              </Typography>
            </TextView>
          </Box>
          <Scroll height='70%' width='910px' tabIndex={0}>
            <List
              gap={0}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index - 1 === cardData[pageKey].selectedIdx}
                  onClick={() => handleRowClick(index - 1)}
                  readOnly={cardData[pageKey].isSubmitted}
                  isError={cardData[pageKey].isSubmitted && cardData[pageKey].selectedIdx !== answer - 1}
                >
                  <Box vAlign='center'>
                    <Label value={index} marginRight={8} />
                    {value?.text}
                  </Box>
                </Radio>
              )}
              align='horizontal'
            />
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isModalOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {answer}
            </Typography>
          </Box>
          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label={'문제해설'} />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {explanation}
            </Typography>
          </Box>
          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label={'스크립트'} />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {script}
            </Typography>
          </Box>
          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label={'해석'} />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {translation}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P22;
