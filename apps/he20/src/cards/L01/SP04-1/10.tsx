import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  IQuestionProps,
  Radio,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Label,
  BoxWrap,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP041 } from './store';
import arrow from '@/assets/icon/arrow_right.svg';

interface pageType {
  _page?: string;
}

const P10 = ({ _page = 'P10' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP041);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: <>2. 다음 우리말을 영작할 때 빈칸에 들어갈 말이 차례대로 짝지어진 것을 고르시오.</>,
    markSize: 'middle',
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  const data = [
    {
      text: 'never tried-goes',
    },
    {
      text: 'never tired-had gone',
    },
    {
      text: 'had never tried-goes',
    },
    {
      text: 'had never tried-went',
    },
    {
      text: 'had never tried-has gone',
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p10.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p10.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p10.answer === cardData.p10.solution;
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p10.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
  };

  const setAnswerIdx = (answerIndex: number) => {
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, answer: answerIndex } }));
    changeData(_page.toUpperCase(), 1, 1, answerIndex);
    if (answerIndex > 0) {
      setIsSubmittable(true);
    }
  };
  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
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
      onSubmit={handleSubmit}
      submitLabel={cardData.p10.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!cardData.p10.isSubmitted && cardData.p10.answer === 0}
      submitBtnColor={
        cardData.p10.answer !== 0
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull>
        <Box>
          <Box tabIndex={101} width='100%' background='white' lineHeight='48px' useRound>
            <Typography>Tom은 작년에 알프스로 겨울 여행을 가기 전까지 스키를 타 본 적이 없었다.</Typography>
            <Box display='flex' flexDirection='row'>
              <Box paddingTop='5px'>
                <SvgIcon size='38px' src={arrow} alt='' />
              </Box>
              <Box>
                <Typography>Tom</Typography>
                <Typography type='blank' width='55px' title='빈칸' boxColor='var(--color-black)'></Typography>
                <Typography>skiing until he </Typography>
                <Typography type='blank' width='55px' title='빈칸' boxColor='var(--color-black)'></Typography>
                <Typography>on a winter trip to the Alps last year.</Typography>
              </Box>
            </Box>
          </Box>
          <Box marginTop={20}>
            <List
              gap={2}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p10.answer}
                  onClick={() => setAnswerIdx(index)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.answer !== cardData.p10.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography tabIndex={150 + index}>{value?.text}</Typography>
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
              <Typography useGap={false}>4</Typography>
            </Box>
            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='문제해설' />
            </Box>
            <Box marginTop='22px'>
              <Typography useGap={false}>
                Tom이 작년에 알프스로 겨울 휴가를 간 것은 과거의 사실이고 그 이전에 스키를 타 본 적이 없다는 것은 시간상으로 더 먼저 일어난 일에
                해당하므로, 주절의 동사에 had never tried를 쓰고 부사절의 동사에 went를 쓰는 것이 적절하다.
              </Typography>
            </Box>
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default P10;
