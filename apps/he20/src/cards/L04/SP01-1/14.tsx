import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
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
import { L04SP01_1 } from './store';

const P14 = ({ _page = 'P14' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_1);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 2;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제 ',
  };

  const questionInfo = {
    text: '2. 다음을 듣고, 여자가 하는 말의 요지로 가장 적절한 것을 고르시오.',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P14.mp3',
    captionSrc: '/L04/SP01-1/HE2-L04-SP01-1-P14.srt',
  };

  const data = [
    {
      text: '기후 변화로 인한 식량 위기 상황이 우려된다.',
    },
    {
      text: '기술의 발달로 미래 식량 생산의 전망이 밝다.',
    },
    {
      text: '육류 소비의 증가로 인한 온실가스 문제가 심각하다.',
    },
    {
      text: '실험실에서 생산되는 고기는 인체에 무해하다.',
    },
    {
      text: '새로운 방법으로 농작물을 재배하는 기술이 필요하다.',
    },
  ];

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const selectedIdx = userSubmissionList[0].inputData[0]?.value;
        setCardData(prev => ({
          ...prev,
          P14: {
            ...prev.P14,
            selectedIdx: selectedIdx !== null && selectedIdx !== undefined ? selectedIdx : prev.P14.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isCorrect = useMemo(() => cardData.P14.selectedIdx === answer - 1, [cardData.P14.selectedIdx]);

  useEffect(() => {
    if (cardData.P14.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.P14.isSubmitted, isCorrect]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, P14: { ...prev.P14, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.P14.selectedIdx,
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
    if (cardData.P14.isSubmitted) return;

    setCardData(prev => ({ ...prev, P14: { ...prev.P14, selectedIdx: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.P14.isSubmitted) {
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
      submitLabel={cardData.P14.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.P14.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.P14.selectedIdx === null}
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
              value={index - 1 === cardData.P14.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.P14.isSubmitted}
              isError={cardData.P14.isSubmitted && cardData.P14.selectedIdx !== answer - 1}
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
          <AnswerTagBox label='해설'>
            <Typography>
              여자는 기술 덕분에 미래에는 AI가 제어하는 건물에서 작물을 재배하거나 실험실에서 고기를 개발할 수 있다고 했다. 그리고 마지막 부분에서는
              기술이 식품의 미래를 진정으로 밝게 만들 것이라고 했으므로, 여자가 하는 말의 요지로 가장 적절한 것은 2번이다.
            </Typography>
          </AnswerTagBox>
          <AnswerTagBox label='스크립트'>
            <Typography>
              W: Hello, I’m Jennifer Jones, a food scientist. Today, I’ll talk about the future of food. People are worried that, in the future, the
              soil might lose nutrients or the climate could change in such a way that we won’t be able to grow crops. However, thanks to technology,
              we will be able to grow crops under LED lights in AI-controlled buildings rather than on land. Others are concerned about meat
              consumption because of the greenhouse gases produced by cows. Not to worry. Food scientists have been developing meat with animal cells
              or plant-based materials in laboratories. This laboratory meat tastes almost exactly the same as real meat. I believe that technology
              will make the future of food truly bright. Future food is expected to be both delicious and environmentally friendly.
            </Typography>
          </AnswerTagBox>
          <AnswerTagBox label='해석'>
            <Typography>
              여: 안녕하세요, 저는 식품 과학자 Jennifer Jones입니다. 오늘은 식량의 미래에 관해 이야기해 보겠습니다. 사람들은 미래에 토양이 영양분을
              잃거나 기후가 변화하여 작물을 재배할 수 없게 될까 봐 걱정하고 있습니다. 하지만 기술 덕분에 우리는 땅이 아닌 AI가 제어하는 건물의 LED
              조명 아래서 작물을 재배할 수 있을 것입니다. 소가 배출하는 온실가스 때문에 육류 소비에 대해 우려하는 사람들도 있습니다. 걱정하지 마세요.
              식품 과학자들은 실험실에서 동물 세포나 식물성 재료로 고기를 개발하고 있습니다. 이 실험실 고기는 실제 고기와 거의 똑같은 맛을 냅니다.
              저는 기술이 식품의 미래를 진정으로 밝게 만들 것이라고 믿습니다. 미래의 식품은 맛있고 환경친화적일 것으로 예상됩니다.
            </Typography>
          </AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P14;
