import { Box, Input, Typography, SvgIcon, IQuestionProps } from '@maidt-cntn/ui';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { useEffect, ChangeEvent } from 'react';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C08A05a } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P01 = () => {
  const pageNo = 'P01';
  const pageKey = 'p01';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo = {
    headerText: 'Point 2 : Practice',
  };
  const questionInfo: IQuestionProps = {
    text: 'Rewrite the sentences using the structure above.',
    size: 'medium',
  };
  const imageSrc = '/L03/C08/A05/HE1-L03-C08-A05-P01.jpg';

  const udl = [
    '이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:',
    '첫 번째 조각: "It"는 빨간색으로 강조되어 있다.',
    '두 번째 조각: "is possible"는 검은색으로 표시되어 있다.',
    '세 번째 조각: "for drivers"는 파란색으로 강조되어 있다.',
    '네 번째 조각: "to focus on driving without being disturbed."는 빨간색으로 강조된 부분("to focus")과 검은색으로 표시된 부분이 있다.',
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
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNo, userSubmission);
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
          <Typography weight={'var(--font-weight-bold)'}>1.</Typography>
          <Typography useGap={false}> We can feel the popularity of Korean food around the world. </Typography>
          <Box vAlign='center' marginTop='10px'>
            <SvgIcon src={arrow_right} size='34px' />
            <Typography useGap={false}> It is possible&nbsp; </Typography>
            <Input
              value={cardData[pageKey].answer}
              onChange={handleChange}
              placeholder='내용을 넣어 주세요.'
              maxLength={2000}
              width='700px'
              inputSize='x-small'
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답란'
            />
            <Typography useGap={false}>&nbsp;.</Typography>
          </Box>
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
      submitType='complete'
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={check => {
        onSubmit();
      }}
    />
  );
};

export default P01;
