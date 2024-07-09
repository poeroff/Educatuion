import { IQuestionProps, TMainHeaderInfoTypes, EStyleButtonTypes, Image, Box, Input, Typography, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, ChangeEvent } from 'react';

import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01_C03_A02 } from './store';
import { studentAtom } from '@/stores/student';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const PAGE_KEY = 'p03';
const PAGE_NUM = 'P03';

const P03 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L01_C03_A02);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 9,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      const newData = cardData[PAGE_KEY].data.map((data, index) => {
        return { ...data, answer: userSubmissionList[0]?.inputData[index]?.value || cardData[PAGE_KEY].data[index].answer };
      });

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            data: [...newData],
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Find a Person',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '활동을 직접 해 봅시다.',
  };

  const imgData = [
    { title: 'mint chocolate', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-01.jpg`, alt: '민트 초콜릿' },
    { title: 'baseball', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-02.jpg`, alt: '야구' },
    { title: 'English', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-03.jpg`, alt: '영어' },
    { title: 'dogs', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-04.jpg`, alt: '개' },
    { title: `today's lunch`, src: `/L01/C03/A02/ME1-L01-C03-A02-P03-05.jpg`, alt: '떡볶이' },
    {
      title: (
        <>
          our school
          <br /> uniform
        </>
      ),
      src: `/L01/C03/A02/ME1-L01-C03-A02-P03-06.jpg`,
      alt: '새',
    },
    { title: 'rainy day', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-07.jpg`, alt: '점심 급식' },
    { title: 'tteokbokki', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-08.jpg`, alt: '교복' },
    { title: 'birds', src: `/L01/C03/A02/ME1-L01-C03-A02-P03-09.jpg`, alt: '비 오는 날' },
  ];

  const handleInputChangeEvent = (subKey: number, value: string) => {
    const newData = [...cardData[PAGE_KEY].data];
    newData[subKey] = {
      ...newData[subKey],
      answer: value,
    };
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], data: newData } }));
    changeData(PAGE_NUM, 1, subKey + 1, value);
  };

  const submitDisabled = cardData[PAGE_KEY].isSubmitted || cardData[PAGE_KEY].data.some(data => data.answer === '');

  const submitBtnColor = submitDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
  const handleSubmit = () => {
    const result = cardData[PAGE_KEY];

    setCardData(prev => ({
      ...prev,
      [PAGE_KEY]: {
        ...prev[PAGE_KEY],
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
            value: result.data[0].answer,
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: result.data[1].answer,
            isAnswer: true,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: result.data[2].answer,
            isAnswer: true,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: result.data[3].answer,
            isAnswer: true,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: result.data[4].answer,
            isAnswer: true,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: result.data[5].answer,
            isAnswer: true,
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: result.data[6].answer,
            isAnswer: true,
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: result.data[7].answer,
            isAnswer: true,
          },
          {
            subKey: 9,
            type: 'TEXT',
            value: result.data[8].answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(PAGE_NUM, userSubmission);
  };

  return (
    <Container
      submitDisabled={submitDisabled}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={submitBtnColor}
      vAlign='start'
      submitLabel='완료하기'
      onSubmit={handleSubmit}
    >
      <Box display='flex' flexWrap='wrap' gap='10px'>
        {imgData.map((item, index) => {
          return (
            <Box position='relative' width='253px' height='212px' key={`box_${index}`}>
              <Box
                position='absolute'
                left='50%'
                top='6px'
                transform='translateX(-50%)'
                backgroundColor='rgba(255,255,255, 0.7)'
                borderRadius='8px'
                width='max-content'
              >
                <Typography lineHeight='42px' weight='var(--font-weight-bold)' align='center'>
                  {item.title}
                </Typography>
              </Box>
              <Box position='absolute' bottom='6px' left='50%' transform='translateX(-50%)'>
                <Input
                  name={`input_${index}`}
                  value={cardData[PAGE_KEY].data[index].answer}
                  ariaLabel={`${index + 1}번째 답변 입력란`}
                  onChange={e => handleInputChangeEvent(index, e.target.value)}
                  width='243px'
                  maxLength={999}
                  readOnly={cardData[PAGE_KEY].isSubmitted}
                  status={!isNotEmptyString(cardData[PAGE_KEY].data[index].answer) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                  placeholder='내용을 넣어 주세요.'
                />
              </Box>
              <Image src={item.src} alt={item.alt} size='100%' />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default P03;
