import { Box, Input, Typography, InputStatus, IQuestionProps } from '@maidt-cntn/ui';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { useEffect, ChangeEvent } from 'react';
import { isNotEmptyString, truncateToMaxBytes, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C08A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const pageNo = 'P02';
  const pageKey = 'p02';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo = {
    headerText: 'Point 1 :  Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write the given words in the correct order.',
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const imageSrc = '/L02/C08/A03/HE1-L02-C08-A03-P01.jpg';

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:',
    '첫 번째 조각: "I was shocked to see"',
    '두 번째 조각: "how thin" (빨간색과 파란색 글씨로 작성됨)',
    '세 번째 조각: "Nani Tama" (빨간색 글씨로 작성됨)',
    '네 번째 조각: "was."',
    '이 조각들이 합쳐져서 "I was shocked to see how thin Nani Tama was."라는 문장이 된다.',
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));
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
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
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
      init();
    }
  }, [pageIds]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncateValue } }));
    changeData(pageNo, 1, 1, truncateValue);
  };

  const nodeData: IContentList[] = [
    {
      children: (
        <Box marginTop='24px'>
          <Typography>2. We were impressed by </Typography>
          <Input
            value={cardData[pageKey].answer}
            onChange={handleChange}
            placeholder='내용을 넣어 주세요.'
            width='390px'
            maxLength={2000}
            inputSize='x-small'
            status={
              cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                ? InputStatus.ERROR
                : isNotEmptyString(cardData[pageKey].answer) || cardData[pageKey].isSubmitted
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[pageKey].isSubmitted}
            ariaLabel='답란'
          />{' '}
          <Typography useGap={false} usePre>{`when \n`}</Typography>
          <Typography>traveling in Ireland.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
          <Typography color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
            제시어 : how / were to us / the local people / kind
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <HE02202
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageSrc={imageSrc}
      udl={udl}
      nodeData={nodeData}
      inputs={{ value1: cardData[pageKey].answer }}
      answer={{ value1: cardData[pageKey].solution }}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={check => {
        onSubmit();
      }}
    />
  );
};

export default P02;
