import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP01_1 } from './store';

interface pageType {
  _page?: string;
}

const P14 = ({ _page = 'P14' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP01_1);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 2;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        2. 다음을 듣고, 햄스터의 특징으로 옳지
        <Typography fontSize='18' textDecoration='underline'>
          않은
        </Typography>
        것을 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P14.mp3',
    captionSrc: '/L01/SP01-1/HE2-L01-SP01-1-P14.srt',
  };

  const data: IHE00401Data[] = [
    {
      text: '매우 예민하다.',
    },
    {
      text: '낮에 활동하고 밤에는 잠을 잔다.',
    },
    {
      text: '생활공간이 정기적으로 청소되어야 한다.',
    },
    {
      text: '깨끗한 음식과 물이 매일 공급되어야 한다.',
    },
    {
      text: '시력이 나쁘지만 청력이 뛰어나다.',
    },
  ];

  const explanation =
    '햄스터들은 밤에는 활동적이고 낮에는 잠을 자서 낮 동안에 조용한 환경을 제공하는 것이 매우 중요하다고 했으므로, 햄스터의 특징으로 옳지 않은 것은 2번이다.';
  const script =
    'G: Hello, everyone! I’m Kelly. Are you thinking of adopting a hamster? Today, I’d like to share what I’ve learned from raising my hamster. First of all, it’s \n' +
    'important to understand that hamsters are quite sensitive. While many people think that taking care of hamsters is easy, they actually require a lot of special attention. For example, hamsters are active at night and sleep during the day, so it’s crucial to provide a quiet environment during the day. Also, their living areas need to be cleaned regularly, and they should be provided with fresh food and water every day. One final tip: hamsters have poor vision but have a strong sense of hearing. So, try to spend some time talking to them near their cage, and you’ll be amazed at how they recognize your voice and respond to it. Keep these tips in mind and take responsibility for your hamster’s care.';
  const translation =
    '여: 안녕하세요, 여러분! 저는 Kelly입니다. 여러분은 햄스터를 입양할 생각이 있나요? 오늘 저는 제가 햄스터를 기르면서 배운 것을 공유하고 싶습니다. 우선, 햄스터들이 매우 예민하다는 것을 이해하는 것이 중요합니다. 많은 사람들이 햄스터를 돌보는 것이 쉽다고 생각하지만, 사실 그들은 특별한 주의를 많이 필요로 합니다. 예를 들어서, 햄스터들은 밤에 활동하고 낮에는 잠을 자므로, 낮 동안에 조용한 환경을 제공하는 것이 매우 중요합니다. 또한, 그들의 생활 영역은 정기적으로 청소되어야 하고, 그들은 매일 신선한 음식과 물을 제공받아야 합니다. 마지막 조언 하나는 햄스터들은 시력은 좋지 않지만 청각이 매우 뛰어나다는 것입니다. 그래서 햄스터 우리 근처에서 그들에게 이야기하는 데 시간을 보내려 해보시면, 여러분은 그들이 여러분의 목소리를 인식하고 그것에 반응하는 방식에 놀랄 것입니다. 이 조언들을 명심하고 햄스터를 보살피는 것에 책임감을 가지세요.\n';

  const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
    <>
      <Box marginTop={marginTop}>
        <Tag type={ETagLine.GREEN} label={label} />
      </Box>
      <Box marginTop='10px'>
        <Typography size={EStyleFontSizes.MEDIUM} usePre>
          {children}
        </Typography>
      </Box>
    </>
  ));

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
      submitLabel={cardData.p14.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p14.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p14.selectedIdx === null}
      onSubmit={handleSubmitClick}
      bodyId='targetContainer'
    >
      <Box vAlign='center' useFull>
        <List
          gap={4}
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
          <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P14;
