import React, { useEffect, useState } from 'react';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Image, Label, Radio, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B03000810Atom } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B03000810Atom);
  const [isShow, setIsShow] = useState(false);
  const containerId = `A01000104P04`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={3} size='small' />
        해열제 종류별로 하루 동안 먹을 수 있는 횟수를 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  const imageInfo = {
    altText:
      '3가지 해열제가 있습니다. 해열제의 이름과 용법은 다음과 같습니다. 다나 : 4시간마다 먹어요, 시원 : 6시간마다 먹어요, 튼튼 : 8시간마다 먹어요',
    imageSrc: '/B03/0008/10/B-EM31-03-0008-1002.png',
    imageWidth: `${Math.floor(447 * 0.9)}px`,
    imageHeight: `${Math.floor(224 * 0.9)}px`,
  };

  const radioInfo = [
    {
      value: 'dividend',
      text: '나누어지는 수',
    },
    {
      value: 'divisor',
      text: '나누는 수',
    },
    {
      value: 'quotient',
      text: '몫',
    },
  ];

  const solutionDetails = {
    solution: radioInfo[2].text,
    commentary: '해열제 종류별로 하루 동안 먹을 수 있는 횟수를 구하는 나눗셈으로 나타내고 몫을 구합니다.',
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

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p04.answer, cardData.p04.solution);
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isInit: true,
          },
        }));
      } else {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            isInit: true,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleRadioChange = (value: string) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData('P04', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId={containerId}
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p04.answer}
      submitBtnColor={!cardData.p04.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      vAlign='start'
      useRound
    >
      <Box useRound tabIndex={101}>
        <Box vAlign='center' flexDirection='column'>
          <Image src={imageInfo.imageSrc} width={imageInfo?.imageWidth || '100%'} height={imageInfo?.imageHeight || '100%'} alt={imageInfo.altText} />
        </Box>
      </Box>
      <Box>
        <Box marginTop='10px' vAlign='flex-start'>
          <Box height={'60px'} display='flex' alignItems='center'>
            <Label value='ㄷ' lineColor='none' background='#969590' color='var(--color-white)' />
          </Box>
          <Box marginLeft='8px'>
            <Typography fontSize='var(--font-size-36)' lineHeight='56px'>
              문제를 어떻게 해결할 수 있을지 생각해 보세요.
            </Typography>
          </Box>
        </Box>
        <Box flexDirection='column' marginLeft='60px'>
          해열제를 종류별로 하루 동안 먹을 수 있는 횟수를 구하는 나눗셈으로 나타내고 (&nbsp;
          {cardData.p04.isInit &&
            radioInfo.map((radio, index) => {
              return (
                <React.Fragment key={index}>
                  <Radio
                    gap={0}
                    type={'box'}
                    name={'radio-group'}
                    label={radio.text}
                    ariaLabel={radio.text}
                    value={radio.value === cardData.p04.answer}
                    onClick={() => handleRadioChange(radio.value)}
                    readOnly={cardData.p04.isSubmitted}
                    isError={cardData.p04.isSubmitted && cardData.p04.answer !== cardData.p04.solution}
                  >
                    {radio.text}
                  </Radio>
                  {index < radioInfo.length - 1 && <Typography>,</Typography>}
                </React.Fragment>
              );
            })}
          &nbsp; )을 구합니다.
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={cardData.p04.isSubmitted && isShow} bottomSheetTargetId={containerId}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutionDetails.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutionDetails.commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
