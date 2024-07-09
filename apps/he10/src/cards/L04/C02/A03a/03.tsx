import {
  Box,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Typography,
  Input,
  BottomSheet,
  ETagLine,
  Tag,
  IAudioPlayerProps,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04C02A03a } from './store';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(L04C02A03a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Listen to the dialogue and correct the underlined part in each sentence.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE1-L04-C02-A03-02.mp3',
    captionSrc: '/L04/C02/A03/HE1-L04-C02-A03-02.srt',
  };

  const solution = ['increasing/rising', 'a hundred', 'their homes'];

  const { userId } = useRecoilValue(studentAtom);

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
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P03', userSubmission);
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
            answer1: userSubmissionList[0].inputData[0]?.value ?? cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value ?? cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value ?? cardData.p03.answer3,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <Box useRound background='white'>
        <Typography>
          (1) The sea level is{' '}
          <Typography textDecoration='underline' useGap={false}>
            decreasing
          </Typography>{' '}
          on the whole.
        </Typography>
        <Typography>
          (2) Tuvalu’s land may disappear into the ocean within{' '}
          <Typography textDecoration='underline' useGap={false}>
            fifty
          </Typography>{' '}
          years.
        </Typography>
        <Typography style={{ textIndent: -45, paddingLeft: 55 }}>
          (3) The sea level problem can affect Tuvaluans’ culture and traditions as well as{' '}
          <Typography textDecoration='underline' useGap={false} style={{ textIndent: 0 }}>
            their animal’s health.
          </Typography>
        </Typography>
      </Box>
      <Box marginTop={40}>
        <Typography useGap={false} style={{ marginRight: 30 }}>
          (1){' '}
          <Input
            value={cardData.p03.answer1}
            inputSize='x-small'
            onChange={event => handleChange(1, event.target.value)}
            width='241px'
            maxLength={100}
            readOnly={cardData.p03.isSubmitted}
            placeholder='내용을 입력해 주세요.'
            ariaLabel='1번 답 입력란'
          />
        </Typography>
        <Typography useGap={false} style={{ marginRight: 30 }}>
          (2){' '}
          <Input
            value={cardData.p03.answer2}
            inputSize='x-small'
            onChange={event => handleChange(2, event.target.value)}
            width='241px'
            maxLength={100}
            readOnly={cardData.p03.isSubmitted}
            placeholder='내용을 입력해 주세요.'
            ariaLabel='2번 답 입력란'
          />
        </Typography>
        <Typography useGap={false}>
          (3){' '}
          <Input
            value={cardData.p03.answer3}
            inputSize='x-small'
            onChange={event => handleChange(3, event.target.value)}
            width='241px'
            maxLength={100}
            readOnly={cardData.p03.isSubmitted}
            placeholder='내용을 입력해 주세요.'
            ariaLabel='3번 답 입력란'
          />
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {`(1) ${solution[0]}\n(2) ${solution[1]}\n(3) ${solution[2]}`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
