import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  Question,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C02A03a } from './store';
import { useEffect, useState } from 'react';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import styled from '@emotion/styled';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(L04C02A03a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about? Fill in the blanks.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE2-L04-C02-A03-02.mp3',
    captionSrc: '/L04/C02/A03/HE2-L04-C02-A03-02.srt',
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
            answer1: userSubmissionList[0].inputData[0].value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1].value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect = isCorrect1 && isCorrect2;

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      onSubmit={handleSubmit}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' padding='20px' background='white' useRound>
            <Typography>
              {`They are talking about how to use a photo 1)`}
              <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)' />
            </Typography>
            <Typography usePre>
              {`\napplication for the man who is planning a trip to 2)`}
              <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)' />.
            </Typography>
          </Box>
          <Box vAlign='center' marginTop='9px'>
            <Box vAlign='center'>
              <Question type='text' size='small'>
                (1)
              </Question>
              <ItemWrap>
                <Input
                  inputSize='x-small'
                  value={cardData.p01.answer1}
                  onChange={e => handleChange(1, e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='1번 답 입력란'
                  width='225px'
                  maxLength={100}
                  readOnly={cardData.p01.isSubmitted}
                  status={
                    cardData.p01.isSubmitted
                      ? !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                      : !isNotEmptyString(cardData.p01.answer1)
                      ? InputStatus.DEFAULT
                      : InputStatus.ENABLE
                  }
                />
              </ItemWrap>
              <Question type='text' size='small'>
                (2)
              </Question>
              <ItemWrap>
                <Input
                  inputSize='x-small'
                  value={cardData.p01.answer2}
                  onChange={e => handleChange(2, e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='2번 답 첫번째 입력란'
                  width='225px'
                  maxLength={100}
                  readOnly={cardData.p01.isSubmitted}
                  status={
                    cardData.p01.isSubmitted
                      ? !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                      : !isNotEmptyString(cardData.p01.answer2)
                      ? InputStatus.DEFAULT
                      : InputStatus.ENABLE
                  }
                />
              </ItemWrap>
            </Box>
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>
              (1) {cardData.p01.solution1} {'\n'} (2) {cardData.p01.solution2}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
