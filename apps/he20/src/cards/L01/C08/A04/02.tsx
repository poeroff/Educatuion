import { ChangeEvent, useEffect, useState } from 'react';
import { Box, TMainHeaderInfoTypes, Typography, Input, SvgIcon, EStyleButtonTypes, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A04);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  const questionInfo = {
    text: 'Discovering the Patterns',
  };

  const questionText = 'Which events happened first, the red or the blue parts?';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p02.answer,
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const { answer, isSubmitted } = cardData.p02;
    if (!isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(PAGE_NUMBER, userSubmission);
    }
  };

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      submitDisabled={cardData.p02.isSubmitted || !cardData.p02.answer}
      submitBtnColor={cardData.p02.answer && !cardData.p02.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%' flexDirection='column' gap='20px'>
        <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
          <Box width={'100%'} display='flex'>
            <Typography>
              <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
              My dad{' '}
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                had
              </Typography>{' '}
              already{' '}
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                prepared
              </Typography>{' '}
              lunch when I{' '}
              <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                arrived
              </Typography>{' '}
              home.
            </Typography>
          </Box>

          <Box width={'100%'} display='flex'>
            <Typography>
              <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
              Ferdi{' '}
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                had
              </Typography>{' '}
              never{' '}
              <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                seen
              </Typography>{' '}
              snow before he{' '}
              <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                moved
              </Typography>{' '}
              to Korea from Indonesia.
            </Typography>
          </Box>
        </Box>

        <Box width={'100%'}>
          <Typography>{questionText}</Typography>
        </Box>

        <Box marginTop={'8px'} paddingLeft={'12px'} width={'100%'}>
          <Input
            width='100%'
            value={cardData.p02.answer}
            onChange={handleAnswerChange}
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='서술 답안 입력란'
            status={cardData.p02.isSubmitted ? InputStatus.DEFAULT : InputStatus.ENABLE}
            readOnly={cardData.p02.isSubmitted}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
