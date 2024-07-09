import usePageData from '@/hooks/usePageData';
import {
  BottomSheet,
  Box,
  EDefaultInequalitySignType,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Label,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container, IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { STC01000252 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import empty_circle from '@/assets/icon/math_empty_circle.svg';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(STC01000252);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };
  const [questionData, setQuestionData] = useState<Array<IInequalitySignBoxProps>>([
    {
      toolTipId: 'tooltip-1',
      leftQuestionText: '403+326',
      rightQuestionText: '542+201',
      value: cardData.p01.answer as EDefaultInequalitySignType,
    },
  ]);
  const submitBtnColor = cardData.p01.isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.YELLOW;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const handleOnChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    const newQuestionData = questionData.map(item => {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: type } }));
      changeData('P01', 1, 1, type);
      return item.toolTipId === toolTipId ? { ...item, value: type } : item;
    });
    setQuestionData(newQuestionData);
  };
  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p01.answer === cardData.p01.solution);
      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isSubmitted: true, isCorrect: cardData.p01.answer === cardData.p01.solution },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect: cardData.p01.answer === cardData.p01.solution,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
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
  useEffect(() => {
    setQuestionData([
      {
        toolTipId: 'tooltip-1',
        leftQuestionText: '403+326',
        rightQuestionText: '542+201',
        value: cardData.p01.answer as EDefaultInequalitySignType,
      },
    ]);
  }, [cardData.p01.answer]);
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p01.answer === EDefaultInequalitySignType.DEFAULT}
      background={'var(--color-white)'}
      useRound
      bodyId='targetContainer'
    >
      <Box marginBottom={200} vAlign='center' flexDirection='column'>
        <Box display='flex' justifyContent='center' flexWrap='wrap'>
          {questionData.map(data => {
            return (
              <Box hAlign='center' key={data.toolTipId}>
                <InequalitySignBox
                  {...data}
                  size='large'
                  isError={cardData.p01.isSubmitted && !cardData.p01.isCorrect}
                  onChange={handleOnChange}
                  readOnly={cardData.p01.isSubmitted}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{'<'}</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>403+326=729, 542+201=743 ➡ 729{'<'}743</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
