import {
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  IQuestionProps,
  TMarkType,
  EStyleButtonTypes,
  Box,
  List,
  Radio,
  Label,
  BottomSheet,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03SP011State } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import AnswerTagBox from './components/AnswerTagBox';

const P13 = ({ _page = 'p13' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const [mark, setMark] = useState<TMarkType>('none');
  const ANSWER = 5;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 다음을 듣고, 안내 사항으로 언급되지 않은 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P13.mp3',
    captionSrc: '/L03/SP01-1/HE2-L03-SP01-1-P13.srt',
  };

  const data: IHE00401Data[] = [
    {
      text: '사진 촬영 가능 여부',
    },
    {
      text: '비상구의 위치',
    },
    {
      text: '공연 중 휴식 시간',
    },
    {
      text: '화장실의 위치',
    },
    {
      text: '공연 총 상영 시간',
    },
  ];

  const explanation = '총 상영 시간은 안내 사항으로 언급되지 않았다.';
  const script = (
    <Box display='flex'>
      <Box>{`W: `}</Box>
      <Box>
        {`Good evening, everyone. Welcome to the show! We’re thrilled to present to you the musical production of `}
        <Typography useGap={false} fontStyle={'italic'}>
          Matilda,
        </Typography>
        {` based on the popular novel by Roald Dahl. Before the show begins, we’d like to remind you of a few things to make sure everyone has an enjoyable experience. First, please turn off or silence any electronic devices including mobile phones, because these devices can distract the performers and the audience. Also, please keep in mind that you’re not allowed to take photographs or make video recordings during the performance. Finally, please take a moment to check the nearest emergency exits to your left and right in case of an emergency. There will be a 15-minute break between Act One and Act Two. You may take a rest, get some snacks, or use the restrooms on the first floor during that time. Thank you for joining us tonight, and enjoy this evening’s show!`}
      </Box>
    </Box>
  );
  const translation = (
    <Box display='flex'>
      <Box>{`여: `}</Box>
      <Box>
        {`좋은 저녁입니다, 여러분. 공연에 오신 것을 환영합니다! 저희는 Roald Dahl의 인기 소설을 바탕으로 한 뮤지컬 <마틸다>의 공연을 여러분께 기쁘게 선보이고자 합니다. 공연이 시작되기 전에, 모두가 즐거운 경험을 할 수 있도록 몇 가지 사항을 상기시켜 드리겠습니다. 먼저, 휴대 전화를 포함한 모든 전자기기의 전원을 끄거나 무음 처리해 주셔야 하는데, 이 기기들이 공연자와 관객들의 주의를 산만하게 할 수 있기 때문입니다. 또한 공연 중에는 사진을 찍거나 동영상을 촬영하는 것이 허용되지 않음을 유념해 주세요. 마지막으로, 비상 상황 발생 시를 대비하여 왼쪽과 오른쪽에 있는 가장 가까운 비상 출구를 확인해 주십시오. 제1막과 제2막 사이에는 15분의 휴식 시간이 있습니다. 그동안 1층에서 휴식을 취하거나, 간식을 사거나 화장실을 이용하실 수 있습니다. 오늘 밤 저희와 함께해 주셔서 감사합니다. 오늘 저녁 공연을 즐겨주세요!`}
      </Box>
    </Box>
  );

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

  const isCorrect = useMemo(() => cardData.p13.selectedIdx === ANSWER - 1, [cardData.p13.selectedIdx]);
  useEffect(() => {
    if (cardData.p13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p13.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => {
          let selectedIdx = prev.p13.selectedIdx;
          if (Number.isInteger(userSubmissionList[0].inputData[0]?.value)) {
            selectedIdx = userSubmissionList[0].inputData[0]?.value;
          }
          return {
            ...prev,
            p13: {
              ...prev.p13,
              selectedIdx,
              isSubmitted,
            },
          };
        });
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p13: { ...prev.p13, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p13.selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData.p13.isSubmitted) return;

    setCardData(prev => ({ ...prev, p13: { ...prev.p13, selectedIdx: index } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p13.isSubmitted) {
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
      submitLabel={cardData.p13.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p13.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p13.selectedIdx === null}
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
              value={index - 1 === cardData.p13.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.p13.isSubmitted}
              isError={cardData.p13.isSubmitted && cardData.p13.selectedIdx !== ANSWER - 1}
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
            {ANSWER}
          </AnswerTagBox>
          <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
