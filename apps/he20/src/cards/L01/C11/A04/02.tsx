import { Box, Dropdown, IQuestionProps, List, Question, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import HE02301, { IContentList } from '@maidt-cntn/pages/HE-023-01-API';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01C11A04 } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';

const P02 = () => {
  const pageKey = 'p02';
  const pageNo = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Choose the grammatically correct words for (A)-(C).',
    mark: getMarking(
      cardData[pageKey].isSubmitted,
      cardData[pageKey].isCorrect[0] && cardData[pageKey].isCorrect[1] && cardData[pageKey].isCorrect[2],
    ),
  };
  const data = [
    { num: '(A)', dropdownList: ['have been', 'had been'] },
    { num: '(B)', dropdownList: ['filled', 'filling'] },
    { num: '(C)', dropdownList: ['active', 'actively'] },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAnswer = [
          userSubmissionList[0].inputData[0]?.value,
          userSubmissionList[0].inputData[1]?.value,
          userSubmissionList[0].inputData[2]?.value,
        ];
        const newCorrect = [
          userSubmissionList[0].inputData[0]?.isCorrect,
          userSubmissionList[0].inputData[1]?.isCorrect,
          userSubmissionList[0].inputData[2]?.isCorrect,
        ];

        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: newAnswer || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? newCorrect || cardData[pageKey].isCorrect : [false, false, false],
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
    const isCorrect1 = isAnswer(cardData[pageKey].answer[0], cardData[pageKey].solution[0].text);
    const isCorrect2 = isAnswer(cardData[pageKey].answer[1], cardData[pageKey].solution[1].text);
    const isCorrect3 = isAnswer(cardData[pageKey].answer[2], cardData[pageKey].solution[2].text);

    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: [isCorrect1, isCorrect2, isCorrect3] } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer[0],
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageKey].answer[1],
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData[pageKey].answer[2],
            isAnswer: true,
            isCorrect: isCorrect3,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const handleDropdownClick = (index: number, value: string) => {
    if (value !== '') {
      setCardData(prev => {
        const newAnswer = [...prev[pageKey].answer];
        newAnswer[index - 1] = value;

        return {
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: newAnswer,
          },
        };
      });

      changeData(pageNo, 1, index, value);
    }
  };

  const nodeData: IContentList[] = [
    {
      children: (
        <Box useFull useRound lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll tabIndex={0}>
            <Box padding='4px 22px 4px 12px'>
              &nbsp;&nbsp; Today, we did something special for Ben and Lily. These two baby bears were rescued after they{' '}
              <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'} textDecoration={'underline'}>
                  (A)
                </Typography>{' '}
                have been / had been
              </Typography>{' '}
              raised illegally in a tiny cage on a farm for many years. To help the bears restore their natural instincts, we carried out some special
              activities known as “behavioral enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log
              and{' '}
              <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'} textDecoration={'underline'}>
                  (B)
                </Typography>{' '}
                filled / filling
              </Typography>{' '}
              them with honey. Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures,
              they can become bored and stressed when lacking mental and physical stimulation. The honey-log feeders stimulate their natural curiosity
              and keep them as{' '}
              <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'} textDecoration={'underline'}>
                  (C)
                </Typography>{' '}
                active / actively
              </Typography>{' '}
              as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!
            </Box>
          </Scroll>
        </Box>
      ),
    },
    {
      children: (
        <List data={data}>
          {({ index = 0, value }) => (
            <Box hAlign='center' marginBottom='10px' padding='10px'>
              <Question type='text' size='small' key={`1${index}1`}>
                {value?.num}
              </Question>
              <Dropdown
                key={`1${index}2`}
                width={'225px'}
                marginLeft='10px'
                dropdownList={value?.dropdownList}
                onClick={value => handleDropdownClick(index, value || '')}
                selectedValue={cardData[pageKey].answer[index - 1]}
                disabled={cardData[pageKey].isSubmitted}
                isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect[index - 1]}
              />
            </Box>
          )}
        </List>
      ),
    },
  ];

  return (
    <HE02301
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      nodeData={nodeData}
      answer={cardData[pageKey].answer}
      solution={cardData[pageKey].solution}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P02;
