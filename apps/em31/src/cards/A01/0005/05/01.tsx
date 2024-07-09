import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { TBgColors } from 'packages/ui/src/components/atoms/Table/Table.style';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { A01_0005_05 } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

interface IVerticalSubtraction {
  minuend: number;
  subtrahend: number;
}

const P01 = () => {
  const pageNo = 'P01';

  const subtraction: IVerticalSubtraction = {
    minuend: 244,
    subtrahend: 112,
  };

  const explanation = [
    `- 일의 자리끼리 빼면 4-2=2 이므로 일의 자리에 2를 씁니다.`,
    `- 십의 자리끼리 빼면 4-1=3 이므로 십의 자리에 3을 씁니다.`,
    `- 백의 자리끼리 빼면 2-1=1 이므로 백의 자리에 1을 씁니다.`,
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0005_05);

  const [ready, setReady] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [startState, setStartState] = useState<boolean>(cardData.p01.answer.some(val => val));

  const isAllFilled = useMemo(() => cardData.p01.answer.every(val => isNotEmptyString(val)), [cardData.p01.answer]);
  const enables = useMemo(
    () => cardData.p01.answer.map((_, idx) => startState && (!idx || cardData.p01.answer[idx - 1] === [...cardData.p01.solution].reverse()[idx - 1])),
    [cardData.p01.answer, startState, cardData.p01.solution],
  );

  const colors: TBgColors[] = useMemo(() => ['blue', 'red', 'green'], []);
  const bgColors = useMemo(() => colors.filter((_, idx) => enables[idx]), [enables, colors]);

  const submitBtnColor = useMemo(() => {
    if (cardData.p01.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    } else {
      return isAllFilled ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p01.isSubmitted, isShowAnswer, isAllFilled]);

  const mark = useMemo(
    () => (cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'),
    [cardData.p01.isSubmitted, cardData.p01.isCorrect],
  );
  const status = useMemo(
    () =>
      cardData.p01.answer.map((val, idx) =>
        isNotEmptyString(val)
          ? !cardData.p01.isSubmitted || isAnswer(val, [...cardData.p01.solution].reverse()[idx])
            ? InputStatus.ENABLE
            : InputStatus.ERROR
          : InputStatus.DEFAULT,
      ),
    [cardData.p01.isSubmitted, cardData.p01.answer, cardData.p01.solution],
  );

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRefs = useMemo(() => [inputRef1, inputRef2, inputRef3], []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '244-112 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='var(--color-grey-600)' />
        244-112를 계산하는 방법을 알아보세요.
      </>
    ),
    mark: mark,
  };

  const tableHeaders = ['일의 자리', '십의 자리', '백의 자리', '연산 기호'];

  const defaultSubmission: userSubmissionType<string[]>[] = useMemo(
    () => [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: ['', '', ''],
            isAnswer: true,
          },
        ],
      },
    ],
    [],
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
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
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      (async () => {
        await init();
        setReady(true);
      })();
    }
  }, [pageIds]);

  useEffect(() => {
    if (ready) {
      setStartState(cardData.p01.answer.some(val => val));
    }
  }, [ready]);

  useEffect(() => {
    const idx = enables.lastIndexOf(true);
    if (idx !== -1) {
      inputRefs[idx].current?.focus();
    }
  }, [enables, inputRefs]);

  const handleChangeInput = (value: string, index: number) => {
    const newValues = [...cardData.p01.answer];
    newValues[index] = value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newValues } }));
    changeData(pageNo, 1, 1, newValues);
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      const markings = [...cardData.p01.solution].reverse().map((ans, idx) => isAnswer(cardData.p01.answer[idx], ans));
      const isCorrect = markings.every(marking => marking);

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      useRound
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p01.isSubmitted && !isAllFilled}
      submitBtnColor={submitBtnColor}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding='20px 44px' useRound>
          <Table color={EStyleTableTypes.MATH} bgColors={bgColors} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={[String(subtraction.minuend), '-', String(subtraction.subtrahend)]} />
            <THead hidden>
              <TR>
                {tableHeaders.map((header, index) => (
                  <TH key={`header-${index + 1}`} scope='col'>
                    {header}
                  </TH>
                ))}
              </TR>
            </THead>
            <TBody>
              <TR>
                {['', ...String(subtraction.minuend)].reverse().map((val, idx) => (
                  <TD key={`minuend-${idx + 1}`}>
                    <Box onClick={idx ? undefined : () => setStartState(true)}>{val}</Box>
                  </TD>
                ))}
              </TR>
              <TR>
                {['-', ...String(subtraction.subtrahend)].reverse().map((val, idx) => (
                  <TD key={`subtrahend-${idx + 1}`}>
                    <Box onClick={idx ? undefined : () => setStartState(true)}>{val}</Box>
                  </TD>
                ))}
              </TR>
            </TBody>
            <TFoot>
              <TR>
                {cardData.p01.answer.map((value, idx) => (
                  <TD key={`answer-${idx + 1}`}>
                    <Box onClick={idx ? undefined : () => setStartState(true)}>
                      <Input
                        type='number'
                        inputRef={inputRefs[idx]}
                        value={value}
                        onChange={event => handleChangeInput(event.target.value, idx)}
                        maxLength={1}
                        ariaLabel={`${tableHeaders[idx]}, 답`}
                        status={status[idx]}
                        readOnly={cardData.p01.isSubmitted || !enables[idx] || enables[idx + 1]}
                      />
                    </Box>
                  </TD>
                ))}
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p01.solution.join(', ')}</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            {explanation.map((text, idx) => (
              <Typography key={`explanation-${idx + 1}`} size={EStyleFontSizes.MEDIUM}>
                {text}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
