import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AnswerTagBox from './components/AnswerTagBox';
import L04SP011State from './store';

const P14 = ({ _page = 'P14' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP011State);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 4;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        2. 다음을 듣고, 서비스에 관해 언급되지{' '}
        <Typography useGap={false} fontSize='inherit' textDecoration='underline'>
          않은
        </Typography>{' '}
        것을 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE1-L04-SP01-1-P14.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '수거 물품 종류',
    },
    {
      text: '서비스 이용 방법',
    },
    {
      text: '수거 물품 처리 방식',
    },
    {
      text: '수거 업체 주소',
    },
    {
      text: '서비스 웹사이트 주소',
    },
  ];

  const explanation = '수거 업체의 주소는 언급되지 않았으므로 정답은 4 번이다.';
  const script =
    "M: Do you need to throw away your old large home appliances like refrigerators, air conditioners, TVs, and more? Why don't you try our service, Waste Collection King? It's free and easy to use. Just visit our website and choose your preferred pick-up date. We'll confirm the date of our visit and then come to your home and pick up your unwanted appliances. The appliances we pick up are taken to recycling centers where they're properly disposed of. By taking advantage of our service, you can also do your part for the environment. For more information, please visit our website at www.wastecollectionking.com.";
  const translation =
    '남 : 냉장고, 에어컨, TV 등 오래된 대형 가전제품을 버려야 하나요? 저희 Waste Collection King 서비스를 이용해 보는 것은 어떠세요? 무료이며 이용 하기 쉽습니다. 저희 웹사이트를 방문하여 원하는 수거 날짜를 선택하세요. 방문 날짜를 확정한 후 댁으로 방문하여 불필요한 가전제품을 수거해 드립니다. 저희가 수거한 가전제품은 재활용 센터로 옮겨져 적절하게 처리됩니다. 저희 서비스를 이용하심으로써 여러분은 환경을 위한 역할에도 동참하실 수 있습니다. 자세한 내용은 저희 웹사이트 www.wastecollectionking.com 을 방문하세요.';

  const [isShow, setShow] = useState<boolean>(false);
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

  const isCorrect = useMemo(() => cardData.p14.selectedIdx === answer - 1, [cardData.p14.selectedIdx]);
  useEffect(() => {
    if (cardData.p14.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p14.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p14: {
            ...prev.p14,
            selectedIdx: userSubmissionList[0].inputData[0]?.value ?? prev.p14.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p14: { ...prev.p14, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p14.selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
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

  const handleRowClick = (index: number) => {
    if (cardData.p14.isSubmitted) return;

    setCardData(prev => ({ ...prev, p14: { ...prev.p14, selectedIdx: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p14.isSubmitted) {
      setShow(!isShow);
    } else {
      submitAnswer();
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p14.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.p14.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p14.selectedIdx === null}
      onSubmit={handleSubmitClick}
      bodyId='targetContainer'
    >
      <Box vAlign='center' useFull>
        <List<IHE00401Data>
          gap={24}
          data={data}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              value={index - 1 === cardData.p14.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.p14.isSubmitted}
              isError={cardData.p14.isSubmitted && cardData.p14.selectedIdx !== answer - 1}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={8} />
                {value?.text}
              </Box>
            </Radio>
          )}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {answer}
          </AnswerTagBox>
          <AnswerTagBox label='문제해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P14;
