import { useEffect, useState } from 'react';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Image, Input, InputStatus, Label, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B03000810Atom } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B03000810Atom);
  const [isShow, setIsShow] = useState(false);
  const containerId = `A01000104P03`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} size='small' />
        해열제 종류별로 하루 동안 먹을 수 있는 횟수를 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const imageInfo = [
    {
      altText:
        '3가지 해열제가 있습니다. 해열제의 이름과 용법은 다음과 같습니다. 다나 : 4시간마다 먹어요, 시원 : 6시간마다 먹어요, 튼튼 : 8시간마다 먹어요',
      imageSrc: '/B03/0008/10/B-EM31-03-0008-1002.png',
      imageWidth: `${Math.floor(447 * 0.9)}px`,
      imageHeight: `${Math.floor(224 * 0.9)}px`,
    },
    {
      altText: '총 24칸의 막대기가 있으며, 각 칸이 1시간을 나타냅니다.',
      imageSrc: '/B03/0008/10/B-EM31-03-0008-1003.png',
    },
    {
      altText: '총 24칸의 막대기가 있으며, 각 칸이 1시간을 나타냅니다.',
      imageSrc: '/B03/0008/10/MC31311_2.png',
    },
  ];

  const solutionDetails = {
    solution: cardData.p03.solution,
    altText: imageInfo[1].altText,
    imageSrc: imageInfo[1].imageSrc,
    commentary: '다나 해열제는 4시간마다 먹으므로 하루 동안 먹을 수 있는 횟수는 24÷4=6(회)입니다.',
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
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p03.answer, cardData.p03.solution);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    changeData('P03', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.answer}
      submitBtnColor={!cardData.p03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={submitAnswer}
      vAlign='start'
      useRound
    >
      <Box useRound tabIndex={101}>
        <Box vAlign='center' flexDirection='column'>
          <Image
            src={imageInfo[0].imageSrc}
            width={imageInfo[0]?.imageWidth || '100%'}
            height={imageInfo[0]?.imageHeight || '100%'}
            alt={imageInfo[0].altText}
          />
        </Box>
      </Box>
      <Box>
        <Box marginTop='10px' vAlign='flex-start'>
          <Box height={'60px'} display='flex' alignItems='center'>
            <Label value='ㄴ' lineColor='none' background='#969590' color='var(--color-white)' />
          </Box>
          <Box marginLeft='8px'>
            <Typography fontSize='var(--font-size-36)' lineHeight='56px'>
              그림을 이용하여 다나 해열제를 하루 동안 먹을 수 있는 횟수를 구해 보세요.
            </Typography>
          </Box>
        </Box>
        <Box width='100%' type='dashed' useRound marginTop='24px' padding='24px'>
          <Box tabIndex={102}>
            <Image
              src={imageInfo[1].imageSrc}
              width={imageInfo[1]?.imageWidth || '100%'}
              height={imageInfo[1]?.imageHeight || '100%'}
              alt={imageInfo[1].altText}
            />
          </Box>
          <Box hAlign='center'>
            <Typography>24÷4=</Typography>
            <Input
              width='52px'
              type='number'
              value={cardData.p03.answer}
              onChange={event => handleChange(event.target.value)}
              ariaLabel={'24 에 4 를 나눈 값'}
              readOnly={cardData.p03.isSubmitted}
              status={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer, cardData.p03.solution) && InputStatus.ERROR}
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={cardData.p03.isSubmitted && isShow} bottomSheetTargetId={containerId}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{solutionDetails.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box vAlign='center' flexDirection='column' marginTop='24px'>
              <Image
                src={imageInfo[2].imageSrc}
                width={imageInfo[2]?.imageWidth || '100%'}
                height={imageInfo[2]?.imageHeight || '100%'}
                alt={imageInfo[2].altText}
              />
            </Box>
            <Box display={'flex'} flexDirection={'column'} marginTop='-24px' gap={'20px'}>
              <Typography>{solutionDetails.commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
