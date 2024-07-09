import { Container } from '@maidt-cntn/ui/en';
import { Box, EStyleButtonTypes, IQuestionProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useMemo } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L01C12A07 } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const [cardData, setCardData] = useRecoilState(L01C12A07);
  const isAllFilled = useMemo(
    () => cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5,
    [cardData.p01.answer1, cardData.p01.answer2, cardData.p01.answer3, cardData.p01.answer4, cardData.p01.answer5],
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Writing',
  };

  const questionInfo: IQuestionProps = {
    text: '14. 자신을 소개하는 글을 써 봅시다.',
  };

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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || prev.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || prev.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || prev.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || prev.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || prev.p01.answer5,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChangeEvent = (subKey: number, value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${subKey}`]: value } }));
    changeData('P01', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={cardData.p01.isSubmitted || !isAllFilled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p01.isSubmitted || !isAllFilled}
      submitLabel={'완료하기'}
    >
      <Box background={'white'} useRound padding={'20px 8px'}>
        <Box marginBottom={10}>
          <Typography>Hi. Nice to meet you. My name is </Typography>
          <Input
            width='290px'
            placeholder='내용을 넣어 주세요.'
            inputSize='x-small'
            textAlign='left'
            maxLength={999}
            ariaLabel='1번 답 입력란'
            value={cardData.p01.answer1}
            readOnly={cardData.p01.isSubmitted}
            onChange={event => handleInputChangeEvent(1, event.target.value)}
            status={!isNotEmptyString(cardData.p01.answer1) ? InputStatus.DEFAULT : InputStatus.ENABLE}
          />
          <Typography>.</Typography>
        </Box>
        <Box marginBottom={10}>
          <Typography>I like </Typography>
          <Input
            width='240px'
            placeholder='내용을 넣어 주세요.'
            inputSize='x-small'
            textAlign='left'
            maxLength={999}
            ariaLabel='2번 답 입력란'
            value={cardData.p01.answer2}
            readOnly={cardData.p01.isSubmitted}
            status={!isNotEmptyString(cardData.p01.answer2) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            onChange={event => handleInputChangeEvent(2, event.target.value)}
          />
          <Typography>. My favorite </Typography>
          <Input
            width='270px'
            placeholder='내용을 넣어 주세요.'
            inputSize='x-small'
            textAlign='left'
            maxLength={999}
            ariaLabel='3번 답 입력란'
            value={cardData.p01.answer3}
            readOnly={cardData.p01.isSubmitted}
            onChange={event => handleInputChangeEvent(3, event.target.value)}
            status={!isNotEmptyString(cardData.p01.answer3) ? InputStatus.DEFAULT : InputStatus.ENABLE}
          />
        </Box>
        <Box>
          <Typography>is </Typography>
          <Input
            width='260px'
            placeholder='내용을 넣어 주세요.'
            textAlign='left'
            inputSize='x-small'
            maxLength={30}
            ariaLabel='4번 답 입력란'
            value={cardData.p01.answer4}
            readOnly={cardData.p01.isSubmitted}
            status={!isNotEmptyString(cardData.p01.answer4) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            onChange={event => handleInputChangeEvent(4, event.target.value)}
          />
          <Typography>. I do not like </Typography>
          <Input
            width='280px'
            placeholder='내용을 넣어 주세요.'
            textAlign='left'
            inputSize='x-small'
            maxLength={30}
            ariaLabel='5번 답 입력란'
            value={cardData.p01.answer5}
            readOnly={cardData.p01.isSubmitted}
            status={!isNotEmptyString(cardData.p01.answer5) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            onChange={event => handleInputChangeEvent(5, event.target.value)}
          />
          <Typography>.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
