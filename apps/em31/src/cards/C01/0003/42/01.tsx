import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Box, Typography, Input, SvgIcon, ETagLine, Tag, BottomSheet, EStyleButtonTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01000342 } from './store';

import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000342);
  const [isShow, setShow] = useState<boolean>(false);

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
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
    // eslint-disable-next-line
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        4장의 카드에 쓰인 수 중에서 가장 큰 수와 가장 작은 수의 합을 구해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      useRound
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Box justifyContent={'center'} type='paint' display={'flex'} flexDirection={'row'} useRound gap={24}>
          <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 304'>
                304
              </Typography>
            </Box>
          </Box>
          <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 510'>
                510
              </Typography>
            </Box>
          </Box>
          <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography weight={'var(--font-weight-bold)'} ariaLabel='세번째 카드 : 476'>
                476
              </Typography>{' '}
            </Box>
          </Box>
          <Box background='yellow' textAlign='center' useRound marginBottom={36} marginTop={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography weight={'var(--font-weight-bold)'} ariaLabel='네번째 카드 : 298'>
                298
              </Typography>{' '}
            </Box>
          </Box>
        </Box>
        <Box marginTop='20px'>
          <Input
            width='263px'
            type='number'
            value={cardData.p01.answer}
            onChange={event => handleChange(1, event.target.value)}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답란'
            readOnly={cardData.p01.isSubmitted}
            status={cardData.p01.isSubmitted && cardData.p01.answer.trim() !== cardData.p01.solution ? 'error' : ''}
          />
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>808</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'10>476>304>298이므로 가장 큰 수는 510, 가장 작은 수는 298입니다. ➡ 510+298=808'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'먼저 주어진 수를 비교하여 가장 큰 수와 가장 작은 수를 찾아봐요.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
