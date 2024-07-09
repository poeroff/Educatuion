import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, IQuestionProps, Input, Label, InputStatus, EStyleTableTypes, Table, TBody, TR, TH, TD } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01_0001_00 } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import EM05001 from '@maidt-cntn/math/pages/EM-050-01';

const P19 = () => {
  const pageNumber = 'P19';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='19' type='icon' />
        {cardData[pageNumber].questionText}
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect.every(value => value) ? 'correct' : 'incorrect') : 'none',
  };
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageNumber].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const questionData = cardData[pageNumber].questionData;
  const answerNode = (
    <>
      <Box display={'flex'} marginRight={'100px'}>
        <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['130px', '130px']} caption='반별 인형수'>
          <TBody>
            <TR key={1}>
              <TH key={1} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                선택보기
              </TH>
              <TD key={2} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                {/*Todo: 색상 추가 및 변경 필요, 임시로 TD 사용(from Amy)*/}
                가,나
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>
      <Box marginRight={'20px'}>
        <Input
          width='256px'
          ariaLabel='무게의 합이 4kg인 것의 기호 입력란'
          marginLeft={8}
          maxLength={2}
          name={'value1'}
          textAlign={'center'}
          value={cardData[pageNumber].answer.value1.toString()}
          onChange={handleInputChangeEvent}
          readOnly={cardData[pageNumber].isSubmitted}
          status={
            cardData[pageNumber].isSubmitted
              ? !cardData[pageNumber].isCorrect[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageNumber].answer.value1)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
        />
      </Box>
    </>
  );
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];
  const submitAnswer = (state: boolean[]) => {
    const isCorrect = state.every(val => val);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: state } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value1,
            isAnswer: true,
            isCorrect: state[0],
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData[pageNumber].answer.value2,
            isAnswer: true,
            isCorrect: state[1],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: {
              value1: userSubmissionList[0].inputData[0].value,
              value2: userSubmissionList[0].inputData[1].value,
            },
            isCorrect: [userSubmissionList[0].inputData[0].isCorrect, userSubmissionList[0].inputData[1].isCorrect],
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
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
  return (
    <EM05001
      questionInfo={questionInfo}
      questionData={questionData}
      answerNode={answerNode}
      answer={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      commentary={cardData[pageNumber].commentary}
      onSubmit={submitAnswer}
      submitType={'marking'}
      isSubmitted={cardData[pageNumber].isSubmitted}
    />
  );
};

export default P19;
