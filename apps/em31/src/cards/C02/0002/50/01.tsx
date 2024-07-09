import { IQuestionProps, Typography, BoxWrap, Radio, SvgIcon } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C02_0002_50 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import React, { useEffect } from 'react';
import EM0410301 from '@maidt-cntn/math/pages/EM-041-03-01';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const pageNumber = 'P01';
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C02_0002_50);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer:
              { value1: userSubmissionList[0].inputData[0]?.value, value2: userSubmissionList[0].inputData[1]?.value } || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted
              ? { value1: userSubmissionList[0].inputData[0]?.isCorrect, value2: userSubmissionList[0].inputData[1]?.isCorrect }
              : { value1: false, value2: false },
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const submitAnswer = (isCorrect: boolean[]) => {
    setCardData(prev => ({
      ...prev,
      [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: { value1: isCorrect[0], value2: isCorrect[1] } },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value1,
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageNumber].answer.value2,
            isCorrect: isCorrect[1],
          },
        ],
        isCorrect: isCorrect.every((correct: boolean) => correct),
      },
    ];
    submitDataWithResult(
      pageNumber,
      userSubmission,
      isCorrect.every((correct: boolean) => correct),
    );
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        알맞은 말을 고르세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted
      ? Object.keys(cardData[pageNumber].isCorrect).every((key: string) => cardData[pageNumber].isCorrect[key])
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  const imageInfo = {
    altText: '가는 구부러진 선으로, 나는 반듯한 선으로 그려진 그림입니다.',
    imageSrc: '/C02/0002/50/DEC312003.png',
    imageHeight: '250px',
  };
  //기획 변경 가능성으로 인해 우선 미삭제
  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
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

  const inputNode: React.ReactNode = (
    <BoxWrap justifyContent={'center'}>
      <Typography usePre>
        가와 같이 구부러진 선을 (&nbsp;
        <Radio
          type={'box'}
          name={'value1'}
          label={'곧은'}
          value={cardData[pageNumber].answer.value1 === '곧은'}
          onClick={handleChange}
          isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value1}
          readOnly={cardData[pageNumber].isSubmitted}
          ariaLabel={`1번째 답의 1번 보기`}
        >
          곧은
        </Radio>
        <Typography>,</Typography>
        <Radio
          type={'box'}
          name={'value1'}
          label={'굽은'}
          value={cardData[pageNumber].answer.value1 === '굽은'}
          onClick={handleChange}
          isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value1}
          readOnly={cardData[pageNumber].isSubmitted}
          ariaLabel={`1번째 답의 2번 보기`}
        >
          굽은
        </Radio>
        &nbsp;) 선이라 하고,
        <br />
        나와 같이 반듯한 선을 (&nbsp;
        <Radio
          type={'box'}
          name={'value2'}
          label={'곧은'}
          value={cardData[pageNumber].answer.value2 === '곧은'}
          onClick={handleChange}
          isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value2}
          readOnly={cardData[pageNumber].isSubmitted}
          ariaLabel={`2번째 답의 1번 보기`}
        >
          곧은
        </Radio>
        <Typography>,</Typography>
        <Radio
          type={'box'}
          name={'value2'}
          label={'굽은'}
          value={cardData[pageNumber].answer.value2 === '굽은'}
          onClick={handleChange}
          isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect.value2}
          readOnly={cardData[pageNumber].isSubmitted}
          ariaLabel={`2번째 답의 2번 보기`}
        >
          굽은
        </Radio>
        &nbsp;) 선이라고 합니다.
      </Typography>
    </BoxWrap>
  );
  const commentary = '반듯하지 않고 구부러진 선을 굽은 선, 반듯한 선을 곧은 선이라고 합니다.';

  return (
    <EM0410301
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      answers={cardData[pageNumber].answer}
      solution={cardData[pageNumber].solution}
      inputNode={inputNode}
      commentary={commentary}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P01;
