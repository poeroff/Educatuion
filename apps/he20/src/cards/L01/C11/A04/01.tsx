import { Box, BoxWrap, IQuestionProps, Label, List, Radio, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import HE02901, { IContentList } from '@maidt-cntn/pages/HE-029-01-API';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C11A04 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';

const P01 = () => {
  const pageNo = 'P01';
  const pageKey = 'p01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '1. What is true according to the passage?',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const data = [
    'The two baby bears, Ben and Lily, are living in a cage on a farm.',
    'Honey-log feeders are made to restore bears’ natural instincts.',
    'Bears are known for having a low level of curiosity.',
    'Mental and physical stimulation can be harmful to bears.',
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
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

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index } }));
    changeData(pageNo, 1, 1, index);
  };

  const onSubmit = () => {
    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
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

  const nodeData: IContentList[] = [
    {
      children: (
        <Box useFull background='white' useRound borderRadius={8} marginBottom={'15px'} paddingRight={'4px'} gap={4}>
          <Scroll tabIndex={0}>
            &nbsp;&nbsp; Today, we did something special for Ben and Lily. These two baby bears were rescued after they{' '}
            <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              (A) have been / had been
            </Typography>{' '}
            raised illegally in a tiny cage on a farm for many years. To help the bears restore their natural instincts, we carried out some special
            activities known as “behavioral enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log
            and{' '}
            <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              (B) filled / filling
            </Typography>{' '}
            them with honey. Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures,
            they can become bored and stressed when lacking mental and physical stimulation. The honey-log feeders stimulate their natural curiosity
            and keep them as{' '}
            <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              (C) active / actively
            </Typography>{' '}
            as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!
          </Scroll>
        </Box>
      ),
    },
    {
      children: (
        <Scroll tabIndex={1}>
          <List
            gap={10}
            data={data}
            align={'vertical'}
            row={({ value, index = 1 }) => (
              <Radio
                key={`1${index}2`}
                type={'square'}
                align={'vertical'}
                name={'radio-question-A'}
                label={value}
                value={index === cardData[pageKey].answer}
                defaultValue={index === cardData[pageKey].answer}
                isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
                onClick={() => handleRadioClick(index)}
                readOnly={cardData[pageKey].isSubmitted}
                ariaLabel={`답란${index}`}
              >
                <BoxWrap key={`2${index}3`} alignItems='baseline'>
                  <Label key={`3${index}4`} value={index} />
                  <Typography key={`4${index}5`}>{value}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Scroll>
      ),
    },
  ];

  return (
    <HE02901
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      nodeData={nodeData}
      answer={cardData[pageKey].answer}
      solution={{ correctAnswer: cardData[pageKey].solution }}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P01;
