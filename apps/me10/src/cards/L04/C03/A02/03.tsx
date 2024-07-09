import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Typography, PinchZoom, EStyleFontSizes, Input, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'World Food Festival',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '활동 방법을 직접 해 봅시다.',
  };

  const handleChangeA = (index: number, value: string) => {
    const updatedAnswers = cardData.p03.answerA.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answerA: updatedAnswers,
      },
    }));
    changeData('P03', 1, 1, updatedAnswers);
  };

  const handleChangeB = (index: number, value: string) => {
    const updatedAnswers = cardData.p03.answerB.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answerB: updatedAnswers,
      },
    }));
    changeData('P03', 1, 2, updatedAnswers);
  };

  const getInputComponent = (index: number) => {
    return (
      <Box hAlign='center' gap={20} useFull>
        <Box>
          <Box background='#FFF0CC' width='100px' marginBottom='10px' useRound>
            <Typography>{`(A-${index})`}</Typography>
          </Box>
          <Input
            value={cardData.p03.answerA[index - 1]}
            readOnly={cardData.p03.isSubmitted}
            onChange={e => handleChangeA(index - 1, e.target.value)}
            textAlign='left'
            width='250px'
            inputSize='x-small'
            placeholder={index === 1 ? 'e.g. Mexican Food' : '내용을 넣어 주세요.'}
            ariaLabel={`A-${index}의 답`}
          />
        </Box>
        <Box>
          <Box background='#EB6707' marginBottom='10px' width='100px' useRound>
            <Typography>{`(B-${index})`}</Typography>
          </Box>
          <Input
            value={cardData.p03.answerB[index - 1]}
            readOnly={cardData.p03.isSubmitted}
            onChange={e => handleChangeB(index - 1, e.target.value)}
            width='250px'
            inputSize='x-small'
            placeholder={index === 1 ? 'e.g. Thai Food' : '내용을 넣어 주세요.'}
            ariaLabel={`B-${index}의 답`}
          />
        </Box>
      </Box>
    );
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answerA: userSubmissionList[0].inputData[0]?.value || cardData.p03.answerA,
            answerB: userSubmissionList[0].inputData[1]?.value || cardData.p03.answerB,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) return;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answerA,
            isAnswer: true,
          },
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answerB,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P03', userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={submitAnswer}
      submitDisabled={
        cardData.p03.isSubmitted ||
        cardData.p03.answerA.some(val => !isNotEmptyString(val)) ||
        cardData.p03.answerB.some(val => !isNotEmptyString(val))
      }
      submitBtnColor={
        cardData.p03.isSubmitted ||
        cardData.p03.answerA.some(val => !isNotEmptyString(val)) ||
        cardData.p03.answerB.some(val => !isNotEmptyString(val))
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} flexDirection='column' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C03/A02/ME1-L04-C03-A02-P01.jpg'}
              width='360px'
              height='340px'
              alt='세계 음식 축제를 하는 공원의 지도 음식점 자리마다 번호가 쓰여있다. '
            />
          </PinchZoom>
          <Box width='400px' justifyContent='flex' background='#FFF0CC'>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'(A) Mexican Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Italian Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Chinese Food'}</Typography>
          </Box>
          <Box width='400px' justifyContent='flex' background='#EB6707'>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'(B) American Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Thai Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Indian Food'}</Typography>
          </Box>
        </Box>
        <Box marginLeft='10px' hAlign='center'>
          <List data={cardData.p03.answerA} gap={20}>
            {({ value, index = 1 }) => getInputComponent(index)}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P03;
