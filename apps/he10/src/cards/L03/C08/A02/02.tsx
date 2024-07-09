import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C08A02 } from './store';

import { Box, TMainHeaderInfoTypes, Typography, SvgIcon, IQuestionProps, EStyleButtonTypes, Input } from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';

import arrow from '../../../../assets/icon/arrow_right.svg';

const P02 = () => {
  const PAGE_NUMBBER = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };
  const questionInfo: IQuestionProps = {
    text: 'Discovering the Patterns',
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
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = true;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBBER)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    }
    changeData(PAGE_NUMBBER, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBBER);
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
      submitBtnColor={
        !cardData.p02.answer || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData.p02.answer || cardData.p02.isSubmitted}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(prev => !prev);
        onSubmit();
      }}
    >
      <Box flexDirection='column' background={'white'} padding='20px' useRound>
        <Box vAlign='flex-start' tabIndex={101}>
          <SvgIcon src={arrow} size='38px' />
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            <Typography color='var(--color-red-800)' useGap={false} title='빨간색 글자'>
              Never
            </Typography>{' '}
            <Typography color='var(--color-blue-800)' useGap={false} title='파란색 글자'>
              did
            </Typography>{' '}
            <Typography color='var(--color-green-800)' useGap={false} title='초록색 글자'>
              she
            </Typography>{' '}
            <Typography color='var(--color-blue-800)' useGap={false} title='파란색 글자'>
              dream
            </Typography>{' '}
            of becoming the world’s most popular movie star.
          </Typography>
        </Box>
        <Box vAlign='flex-start' marginTop={'20px'} tabIndex={102}>
          <SvgIcon src={arrow} size='38px' />
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            <Typography color='var(--color-red-800)' useGap={false} title='빨간색 글자'>
              At the top of the mountain
            </Typography>{' '}
            <Typography color='var(--color-blue-800)' useGap={false} title='파란색 글자'>
              were
            </Typography>{' '}
            <Typography color='var(--color-green-800)' useGap={false} title='초록색 글자'>
              a couple of climbers
            </Typography>{' '}
            drinking hot chocolate.
          </Typography>
        </Box>
      </Box>
      <Box marginTop={'15px'}>
        <Box tabIndex={103}>
          <Typography useGap={false} color='var(--color-grey-900)'>
            How are the colored words ordered in the sentences?
          </Typography>
        </Box>
        <Box marginTop={'8px'}>
          <Input
            width='100%'
            value={cardData.p02.answer}
            readOnly={cardData.p02.isSubmitted}
            maxLength={100}
            onChange={e => handleChange(1, e.target.value)}
            ariaLabel='답란'
            placeholder='내용을 넣어 주세요.'
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
