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
import { HE20DT1 } from './store';

interface pageType {
  _page?: string;
}

const P06 = ({ _page = 'P06' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(HE20DT1);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 1;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '의사소통기능 진단',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 내용을 듣고, 여자가 하는 말의 목적으로 가장 적절한 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P13.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '10대를 위한 피부관리 제품을 홍보하려고',
    },
    {
      text: '안전한 피부관리 사용법에 대해 소개하려고',
    },
    {
      text: '피부관리 제품 사용의 위험성을 경고하려고',
    },
    {
      text: '올바른 소셜미디어 쇼핑에 대한 팁을 알려주려고',
    },
    {
      text: '웹사이트에 상품 후기를 게시하는 방법을 설명하려고',
    },
  ];

  const explanation =
    '10대들에게 GREEN PLUS 피부관리 제품의 성분, 가격 등에 대해 소개하면서 제품의 구매를 권장하고 있으므로, 여자가 하는 말의 목적으로 가장 적절한 것은 1번이다. ';
  const script =
    'W: Hello, everyone! Welcome to live social media shopping for teenagers! I’m Emma. Today, I’d like to show you one of our best-sellers, the GREEN PLUS skin-care set, which includes a facial wash and cream! Lots of teenagers have oily but sensitive skin. If you have similar issues, our all-natural products are better for your skin than the chemical-based ones commonly found in stores. That’s because our products contain natural ingredients and vitamins. As you can see, more than 90 percent of our customers are satisfied with our products and have felt the difference. The GREEN PLUS skin-care set usually sells for 40 dollars. But, order now and you can receive the entire set for only 30 dollars. Additionally, if you post a photo review on our website, we’ll send you a free sample of GREEN PLUS hand cream. Don’t miss out on this special opportunity today!';
  const translation =
    '여: 안녕하세요, 여러분! 10대들을 위한 라이브 소셜 미디어 쇼핑에 오신 것을 환영합니다! 저는 Emma입니다. 오늘 저는 저희의 베스트셀러 중 하나로, 세안제와 크림이 포함된 GREEN PLUS 피부관리 세트를 보여드리려고 합니다! 많은 10대들이 지성이지만 민감한 피부를 가지고 있습니다. 만약 여러분에게 비슷한 문제가 있다면, 천연 원료로만 만든 우리의 제품이 가게에서 흔히 볼 수 있는 화학 성분에 기반한 제품보다 여러분의 피부에 더 좋습니다. 그것은 우리 제품이 천연 성분과 비타민을 포함하고 있기 때문입니다. 보시다시피, 저희 고객의 90% 이상이 저희 제품에 만족하고 차이를 느껴본 적이 있습니다. GREEN PLUS 피부관리 세트는 보통 40달러에 판매됩니다. 그러나 지금 주문하시면 전체 세트를 단 30달러에 받으실 수 있습니다. 또 저희 웹사이트에 사진 리뷰를 올려주시면, GREEN PLUS 핸드크림 무료 샘플을 보내드립니다. 오늘 이 특별한 기회를 놓치지 마세요!';

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
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const selectedIdx = userSubmissionList[0].inputData[0]?.value;
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            selectedIdx: selectedIdx !== null && selectedIdx !== undefined ? selectedIdx : prev.p06.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isCorrect = useMemo(() => cardData.p06.selectedIdx === answer - 1, [cardData.p06.selectedIdx]);

  useEffect(() => {
    if (cardData.p06.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p06.isSubmitted, isCorrect]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p06.selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(_page, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData.p06.isSubmitted) return;

    setCardData(prev => ({ ...prev, p06: { ...prev.p06, selectedIdx: index } }));
    changeData(_page, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p06.isSubmitted) {
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
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.p06.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p06.selectedIdx === null}
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
              value={index - 1 === cardData.p06.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.p06.isSubmitted}
              isError={cardData.p06.isSubmitted && cardData.p06.selectedIdx !== answer - 1}
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

export default P06;
