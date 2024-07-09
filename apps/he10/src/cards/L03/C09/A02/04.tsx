import { ChangeEvent, useEffect, useState } from 'react';
import { Input, InputStatus, IQuestionProps, Typography } from '@maidt-cntn/ui';
import HE02503, { IArticleProps, IContentList, IScrollQuestionProps } from '@maidt-cntn/pages/HE-025-03';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03_C09_A02 } from '@/cards/L03/C09/A02/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const pageNumber = 'P04';
  const pageKey = 'p04';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03_C09_A02);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'TEXT',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, mainKey, subKey, userInputs);
  };
  const [isShow, setShow] = useState(false);
  const submitAnswer = (isWrong: boolean[]) => {
    const isCorrect = isWrong.every(item => !item);
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: mainKey,
          inputData: [
            {
              subKey: subKey,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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

  const questionInfoProps: IQuestionProps = {
    text: cardData.common.questionInfo.text,
    size: cardData.common.questionInfo.size,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const arcitleInfo: IArticleProps = {
    titleText: cardData[pageKey].textView.titleText,
    titleColor: cardData[pageKey].textView.titleColor,
    text: cardData[pageKey].textView.text,
  };
  const data: IContentList[] = [
    {
      imgSrc: '/L03/C09/A02/HE1-L03-C09-A02-P04-01.jpg',
      imgAlt: '접시에 우유가 부어지고 있는 모습',
      children: (
        <>
          <Typography useGap={false}>
            Pour the <br />
            3)
          </Typography>
          <Input
            width='210px'
            maxLength={20}
            name={'value1'}
            value={cardData[pageKey].answer.value1}
            onChange={handleInputChangeEvent}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답란'
            readOnly={cardData[pageKey].isSubmitted}
            status={
              cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                ? InputStatus.ERROR
                : cardData[pageKey].isSubmitted
                ? InputStatus.DEFAULT
                : isNotEmptyString(cardData[pageKey].answer.value1)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            inputSize={'x-small'}
          />
          <Typography useGap={false}>into the dish.</Typography>
        </>
      ),
    },
    {
      imgSrc: '/L03/C09/A02/HE1-L03-C09-A02-P04-02.jpg',
      imgAlt: '접시에 담긴 우유에 식용 색소를 몇 방울 떨어트리는 모습',
      children: <Typography useGap={false}>Add some drops of food coloring into the milk</Typography>,
    },
    {
      imgSrc: '/L03/C09/A02/HE1-L03-C09-A02-P04-03.jpg',
      imgAlt: '우유와 식용색소가 담긴 접시 가운데 설거지 세제를 한 방울 떨어트린 모습',
      children: <Typography useGap={false}>Put a drop of dish soap in the center</Typography>,
    },
  ];
  const scrollQuestionInfo: IScrollQuestionProps = {
    questionTitle: 'Magic Rainbow Milk',
    questionSubTitle: 'Procedure',
    questionSubTitleColor: 'var(--color-green-500)',
    questionData: data,
  };

  return (
    <HE02503
      headerInfo={cardData.common.headerInfo}
      questionInfoProps={questionInfoProps}
      articleInfo={arcitleInfo}
      scrollQuestionInfo={scrollQuestionInfo}
      textViewHeight={'70px'}
      wordArr={cardData.common.wordArr}
      answer={[cardData[pageKey].solution.value1]}
      value={[cardData[pageKey].answer.value1]}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P04;
