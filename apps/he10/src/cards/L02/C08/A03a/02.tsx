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

const P02 = ({ headerInfo, udl, imageSrc }: CardProps) => {
  const pageNo = 'P02';
  const pageKey = 'p02';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03a);

  const submitType = 'complete';

  const answer = {
    value1: 'how kind the local people were to us',
  };

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
          <Typography useGap={false}>2. 우리는 아일랜드 여행 시 현지인들이 우리에게 얼마나 친절하게 대해주는지에 깊은 인상을 받았다.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box>
          <Box marginTop='24px' paddingLeft={'30px'} vAlign='center'>
            <SvgIcon src={arrow_right} size='34px' />
            <Typography useGap={true}>We were impressed by </Typography>{' '}
            <Input
              value={cardData[pageKey].answer}
              onChange={e => handleChange(e.target.value)}
              placeholder='내용을 넣어 주세요.'
              width='420px'
              maxLength={cardData[pageKey].answer.length + 5}
              inputSize='x-small'
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답란'
            />
          </Box>
          <Box paddingLeft={'76px'}>
            <Typography useGap={false}>when traveling in Ireland.</Typography>
          </Box>
        </Box>
      ),
    },
    {
      children: (
        <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
          <Typography useGap={false} color='var(--color-blue-800)' fontSize={EStyleFontSizes['X-MEDIUM']}>
            제시어 : kind, the local people, were to us
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

export default P02;