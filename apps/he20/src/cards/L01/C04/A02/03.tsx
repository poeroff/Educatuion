import {
  TMainHeaderInfoTypes,
  Image,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  IQuestionProps,
  EStyleButtonTypes,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import styled from '@emotion/styled';

import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C04A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';

const P03 = () => {
  const PAGE_KEY = 'p03';
  const PAGE_NUM = 'P03';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A02);
  const { userId } = useRecoilValue(studentAtom);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isShow, setShow] = useState<boolean>(false);
  const CORRECT_ANSWERS = ['day', 'fresh', 'hearing'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Fill in the blanks using information from the talk.',
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const tempAnswers = [...cardData[PAGE_KEY].answers];
    tempAnswers[Number(name.split('_')[1])] = value;

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answers: [...tempAnswers] } }));
    changeData(PAGE_NUM, 1, 1, tempAnswers);
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[PAGE_KEY].answers,
            isAnswer: true,
          },
        ],
      },
    ];
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true } }));
    submitData(PAGE_NUM, userSubmission);
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/HE2-L01-C04-A02.mp3',
    captionSrc: '/L01/C04/A02/HE2-L01-C04-A02.srt',
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answers: userSubmissionList[0]?.inputData[0]?.value || cardData[PAGE_KEY].answers,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      audioInfo={audioInfo}
      submitDisabled={!Array.isArray(cardData[PAGE_KEY].answers) || cardData[PAGE_KEY].answers?.some(answer => answer === '')}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !Array.isArray(cardData[PAGE_KEY].answers) || cardData[PAGE_KEY].answers.some(answer => answer === '')
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BackgroundWrap>
        <Box display='block'>
          <Image src='/L01/C04/A02/HE2-L01-C04-A02-1.png' width='154px' alt='햄스터 한 마리' style={{ position: 'absolute', left: 0, bottom: 0 }} />
        </Box>
        <Box display='block'>
          <Image src='/L01/C04/A02/HE2-L01-C04-A02-2.png' width='204px' alt='햄스터 집' style={{ position: 'absolute', right: 0 }} />
        </Box>

        <Box hAlign='center' padding='10px' backgroundColor='var(--color-red-100)'>
          <Typography useGap={false} color='var(--color-black-100)' weight={'var(--font-weight-extraBold )'}>
            Handling
            <Typography color='var(--color-red-500)' weight={'var(--font-weight-extraBold)'}>
              Hamsters
            </Typography>
            with Care
          </Typography>
        </Box>

        <Content>
          <Box vAlign='start'>
            <Box>
              <Typography>•</Typography>
            </Box>
            <Box>
              <Typography>Create a quiet sleep environment during the </Typography>
              <Typography>
                (1){' '}
                <Input
                  name='input_0'
                  value={cardData[PAGE_KEY].answers[0]}
                  minWidth='260px'
                  maxLength={30}
                  inputRef={inputRef}
                  onChange={handleInputChange}
                  placeholder='내용을 넣어 주세요.'
                  readOnly={cardData[PAGE_KEY].isSubmitted}
                  aria-label='1번 답란'
                />{' '}
                .
              </Typography>
            </Box>
          </Box>
          <Box vAlign='start'>
            <Box>
              <Typography>•</Typography>
            </Box>
            <Box>
              <Typography>
                Clean their space and offer (2){' '}
                <Input
                  name='input_1'
                  value={cardData[PAGE_KEY].answers[1]}
                  minWidth='260px'
                  maxLength={30}
                  inputRef={inputRef}
                  onChange={handleInputChange}
                  placeholder='내용을 넣어 주세요.'
                  readOnly={cardData[PAGE_KEY].isSubmitted}
                  aria-label='2번 답란'
                />
              </Typography>
              <Typography>food and water daily.</Typography>
            </Box>
          </Box>
          <Box vAlign='start'>
            <Box>
              <Typography>•</Typography>
            </Box>
            <Box>
              <Typography>Talk to them because they have a good sense of</Typography>
              <Typography>
                (3){' '}
                <Input
                  name='input_2'
                  value={cardData[PAGE_KEY].answers[2]}
                  minWidth='260px'
                  maxLength={30}
                  inputRef={inputRef}
                  onChange={handleInputChange}
                  placeholder='내용을 넣어 주세요.'
                  readOnly={cardData[PAGE_KEY].isSubmitted}
                  aria-label='3번 답란'
                />{' '}
                .
              </Typography>
            </Box>
          </Box>
        </Content>
      </BackgroundWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData[PAGE_KEY].isSubmitted && isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre useGap={false}>
              {CORRECT_ANSWERS.map((answer, index) => `(${index + 1}) ${answer}`).join('\n')}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 400px;
  width: 100%;
  background-color: var(--color-yellow-100);
  border-radius: 20px;
`;

const Content = styled.div`
  padding: 0px 70px 0 90px;
`;

export default P03;
