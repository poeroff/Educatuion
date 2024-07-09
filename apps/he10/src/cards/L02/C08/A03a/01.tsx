import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import { Box, EStyleFontSizes, IQuestionProps, Input, InputStatus, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import arrow_right from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { L02C08A03a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

type CardProps = {
  headerInfo: TMainHeaderInfoTypes;
  udl: string[];
  imageSrc: string;
};

const P01 = ({ headerInfo, udl, imageSrc }: CardProps) => {
  const pageNo = 'P01';
  const pageKey = 'p01';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03a);

  const submitType = 'complete';

  const questionInfo: IQuestionProps = {
    text: 'Complete the sentences with the given words, using the structure above.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

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

  const onSubmit = () => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNo, userSubmission);
  };

  const handleChange = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncateValue } }));
    changeData(pageNo, 1, 1, truncateValue);
  };

  const nodeData: IContentList[] = [
    {
      children: (
        <Box marginTop='24px'>
          <Typography useGap={false}>1. 마을에서 가장 큰 나무가 몇 살인지 아는 사람은 아무도 없다. </Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box marginTop='24px' paddingLeft={'20px'} vAlign='center'>
          <SvgIcon src={arrow_right} size='34px' />
          <Typography useGap={true}>No one in town knows </Typography>{' '}
          <Input
            value={cardData[pageKey].answer}
            onChange={e => handleChange(e.target.value)}
            placeholder='내용을 넣어 주세요.'
            width='390px'
            maxLength={cardData[pageKey].answer.length + 5}
            inputSize='x-small'
            readOnly={cardData[pageKey].isSubmitted}
            ariaLabel='답란'
          />{' '}
          <Typography useGap={false}>.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
          <Typography useGap={false} color='var(--color-blue-800)' fontSize={EStyleFontSizes['X-MEDIUM']}>
            제시어 : old, the largest tree
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
      submitType={submitType}
      onSubmit={onSubmit}
    />
  );
};

export default P01;
