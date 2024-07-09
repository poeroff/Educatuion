import { Box, BoxWrap, IQuestionProps, Input, InputStatus, SvgIcon, Typography } from '@maidt-cntn/ui';
import arrowRight from '@maidt-cntn/assets/icons/arrow_right_template.svg';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { useEffect, ChangeEvent } from 'react';
import { isNotEmptyString, truncateToMaxBytes, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C08A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const pageNo = 'P02';
  const pageKey = 'p02';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo = {
    headerText: 'Point 1 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Rewrite the sentences, starting with the underlined parts.',
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const imageSrc = '/L03/C08/A03/HE1-L03-C08-A03-P01.jpg';

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다 :',
    '첫 번째 조각: "Rarely" (빨간색 글씨로 작성됨)',
    '두 번째 조각: "do" (파란색 글씨로 작성됨)',
    '세 번째 조각: "people" (초록색 글씨로 작성됨)',
    '네 번째 조각: "want" (파란색 글씨로 작성됨)',
    '다섯 번째 조각: "to put up with a lot of noise." 이 조각들이 합쳐져서 "Rarely do people want to put up with a lot of noise."라는 문장이 된다.',
  ];

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
        <BoxWrap>
          <Box>
            <Box>
              2. She can attend the science fair {''}
              <Typography textDecoration='underline' style={{ textUnderlinePosition: 'under' }} useGap={false}>
                only if she finishes her project by Friday.
              </Typography>
            </Box>
          </Box>
        </BoxWrap>
      ),
    },
    {
      children: (
        <>
          <BoxWrap>
            <Box hAlign={'flex-start'} marginTop='10px'>
              <SvgIcon src={arrowRight} size='20px' />
              <Typography>Only if she finishes her project by </Typography>
              <Input
                value={cardData[pageKey].answer}
                maxLength={70}
                onChange={handleChange}
                ariaLabel={'Only if she finishes her project by 이후에 들어갈 문장(단어)'}
                placeholder='내용을 넣어 주세요.'
                minWidth='450px'
                readOnly={cardData[pageKey].isSubmitted}
                inputSize={'x-small'}
                status={
                  cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                    ? InputStatus.ERROR
                    : isNotEmptyString(cardData[pageKey].answer) || cardData[pageKey].isSubmitted
                    ? InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
              />
            </Box>
          </BoxWrap>
          <Box>
            <Typography>Friday the science fair.</Typography>
          </Box>
        </>
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
