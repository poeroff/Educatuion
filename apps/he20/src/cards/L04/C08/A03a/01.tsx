import arrow from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { Box, BoxWrap, IQuestionProps, Input, SvgIcon, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C08A03a } from './store';

const P01 = () => {
  const pageNo = 'P01';
  const pageKey = 'p01';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A03a);
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

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].userInput,
            },
          ],
        },
      ];
      submitData(pageNo, userSubmission);
    }
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
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], userInput: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const headerInfo = {
    headerText: 'Point 1 :  Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the sentences with the given words, using the structure above. If necessary, change the forms of the words.',
  };
  const imageSrc = '/L04/C08/A03/HE2-L04-C08-A03-P01.jpg';

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:',
    '첫 번째 조각: "Advances in neural implants will"',
    '두 번째 조각: "make" (파란색 글씨로 작성됨)',
    '세 번째 조각: "it"',
    '네 번째 조각: "possible"',
    '다섯 번째 조각: "to install" (빨간색 글씨로 작성됨)',
    '여섯 번째 조각: "software in our brains."',
    '이 조각들이 합쳐져서 "Advances in neural implants will make it possible to install software in our brains."라는 문장이 된다.',
  ];

  const nodeData: IContentList[] = [
    {
      children: (
        <Box marginTop='12px'>
          <Typography>1. 그녀는 제2외국어를 배우는 것을 흥미로워한다.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <BoxWrap height='70px' flexDirection='column' marginTop='24px'>
          <Box vAlign='center' hAlign='flex-start' flexDirection='row'>
            <Box>
              <SvgIcon size='38px' src={arrow} title='오른쪽을 가리키는 화살표 아이콘' />
            </Box>
            <Box>
              <Typography>She</Typography>
            </Box>
            <Input
              value={cardData[pageKey].userInput}
              onChange={e => handleChange(e.target.value)}
              placeholder='내용을 넣어 주세요.'
              width='390px'
              maxLength={2000}
              inputSize='x-small'
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답란'
            />
            <Typography>a second language.</Typography>
          </Box>
        </BoxWrap>
      ),
    },
    {
      children: (
        <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' paddingLeft='20px' marginBottom={'12px'}>
          <Typography color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
            제시어 : find, interesting, learn
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
      inputs={{ value1: cardData[pageKey].userInput }}
      answer={{ value1: cardData[pageKey].solution }}
      submitType='complete'
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={() => {
        handleSubmit();
      }}
    />
  );
};

export default P01;
