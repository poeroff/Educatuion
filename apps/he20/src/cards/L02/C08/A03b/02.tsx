import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { Box, BoxWrap, Dropdown, IQuestionProps, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C08A03b } from './store';

const P02 = () => {
  const pageNo = 'P02';
  const pageKey = 'p02';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03b);
  const { userId } = useRecoilValue(studentAtom);

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
    const isCorrect = isAnswer(cardData[pageKey].userInput, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
            type: 'TEXT',
            value: cardData[pageKey].userInput,
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
            userInput: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].userInput,
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

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], userInput: !isNotEmptyString(value) ? prev[pageKey].userInput : value } }));
    changeData(pageNo, 1, 1, value);
  };

  const headerInfo = {
    headerText: 'Point 1 :  Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the grammatically correct words.',
    size: 'medium',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };
  const imageSrc = '/L02/C08/A03/HE2-L02-C08-A03-P01.jpg';

  const udl = [
    `이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:
    첫 번째 조각: "If you have,"
    두 번째 조각: "then you may have fallen prey to a dark pattern." (may have fallen은 빨간색 글씨로 작성됨)
    이 조각들이 합쳐져서 "If you have, then you may have fallen prey to a dark pattern."라는 문장이 된다.
`,
  ];

  const nodeData: IContentList[] = [
    {
      children: (
        <BoxWrap height='fit-content' flexDirection='column' marginBottom='50px'>
          <Box vAlign='center' hAlign='flex-start' flexDirection='row' flexWrap='wrap'>
            <Typography>2. Kevin is very kind to everyone. He</Typography>
            <Dropdown
              width='200px'
              type='up'
              dropdownList={cardData[pageKey]?.dropArr || []}
              selectedValue={cardData[pageKey].userInput}
              readOnly={cardData[pageKey].isSubmitted}
              onClick={value => handleChange(value ?? '')}
              ariaLabel='답 선택칸'
              isError={cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].userInput, cardData[pageKey].solution)}
            />
            <Typography>have had an</Typography>
            <Typography>argument with David.</Typography>
          </Box>
        </BoxWrap>
      ),
    },
    {
      children: <Typography color={'var(--color-blue-500)'}>Kevin은 모든 사람에게 매우 친절해. 그가 David와 다퉜을 리가 없어.</Typography>,
    },
  ];

  return (
    <HE02202
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageSrc={imageSrc}
      udl={udl}
      nodeData={nodeData}
      inputs={{ value1: cardData[pageKey].userInput }}
      answer={{ value1: cardData[pageKey].solution }}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={() => {
        onSubmit();
      }}
    />
  );
};

export default P02;
