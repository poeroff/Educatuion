import arrow from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { Box, BoxWrap, Dropdown, IQuestionProps, SvgIcon, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C08A03b } from './store';

const P04 = () => {
  const pageNo = 'P04';
  const pageKey = 'p04';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A03b);
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
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], userInput: value === '' ? prev[pageKey].userInput : value } }));
    changeData(pageNo, 1, 1, value);
  };

  const headerInfo = {
    headerText: 'Point 1 :  Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the Korean and fill in the blanks with the given words.',
    size: 'medium',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };
  const imageSrc = '/L03/C08/A03/HE2-L03-C08-A03-P01.jpg';

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 두 개의 문장을 보여준다. ',
    '첫 번째 문장은 다음과 같다: ',
    '첫 번째 조각: "Although" (빨간색 글씨로 작성됨)',
    '두 번째 조각: "he" ',
    '세 번째 조각: "became" ',
    '네 번째 조각: "a free man," ',
    '다섯 번째 조각: "he still faced racial discrimination." ',
    '이 조각들이 합쳐져서 "Although he became a free man, he still faced racial discrimination."라는 문장이 된다. ',
    '두 번째 문장은 다음과 같다: ',
    '첫 번째 조각: "Despite" (파란색 글씨로 작성됨) ',
    '두 번째 조각: "challenges in their lives,“ ',
    '세 번째 조각: "the artists never gave up on their art.“ ',
    '이 조각들이 합쳐져서 "Despite challenges in their lives, the artists never gave up on their art."라는 문장이 된다.',
  ];

  const nodeData: IContentList[] = [
    {
      children: (
        <Box marginTop='12px'>
          <Typography>4. 그 팀은 전문적인 훈련 덕분에 잘 해냈다.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <BoxWrap height='100px' flexDirection='column' marginTop='24px'>
          <Box vAlign='center' hAlign='flex-start' flexDirection='row'>
            <Box>
              <SvgIcon size='38px' src={arrow} title='오른쪽을 가리키는 화살표 아이콘' />
            </Box>
            <Box>
              <Typography>The team performed well</Typography>
            </Box>
            <Dropdown
              width='264px'
              type='up'
              dropdownList={cardData[pageKey].dropArr}
              selectedValue={cardData[pageKey].userInput}
              readOnly={cardData[pageKey].isSubmitted}
              onClick={value => handleChange(value ?? '')}
              ariaLabel='답 선택칸'
              isError={cardData[pageKey].isSubmitted && cardData[pageKey].userInput !== cardData[pageKey].solution}
            />
            <Box>
              <Typography>the professional </Typography>
            </Box>
          </Box>
          <Box>
            <Typography>training.</Typography>
          </Box>
        </BoxWrap>
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
      inputs={{ value1: cardData[pageKey].userInput }}
      answer={{ value1: cardData[pageKey].solution }}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={() => {
        onSubmit();
      }}
    />
  );
};

export default P04;
