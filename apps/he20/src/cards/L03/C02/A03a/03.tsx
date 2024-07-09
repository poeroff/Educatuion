import { useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  IAudioPlayerProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Question,
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L03C02A03a } from './store';
import styled from '@emotion/styled';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(L03C02A03a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What did the man do in Gyeongbok Palace? Fill in the blanks according to the dialogue.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.mp3',
    captionSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.srt',
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
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 =
        cardData.p03.answer1.trim().toLowerCase() === cardData.p03.solution1 ||
        cardData.p03.answer1.trim().toLowerCase() === cardData.p03.solution1_2;
      const isCorrect2 =
        cardData.p03.answer2.trim().toLowerCase() === cardData.p03.solution2 ||
        cardData.p03.answer2.trim().toLowerCase() === cardData.p03.solution2_2;
      const isCorrect3 =
        cardData.p03.answer3.trim().toLowerCase() === cardData.p03.solution3 ||
        cardData.p03.answer3.trim().toLowerCase() === cardData.p03.solution3_2;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      onSubmit={onGrade}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' padding='20px' background='white' useRound>
            <Typography>
              (1) He appreciated<Typography fontStyle={'italic'}>dancheong</Typography>, the traditional Korean coloring on
              <Typography>
                b
                <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)' />
              </Typography>
            </Typography>
            <br />
            <Typography>
              (2) He enjoyed the changing of the
              <Typography>
                g
                <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)' />
              </Typography>
              <Typography>
                c
                <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)' />
              </Typography>
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
                  value={cardData.p03.answer1}
                  onChange={e => handleChange(1, e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='1번 답 입력란'
                  width='225px'
                  maxLength={100}
                  readOnly={cardData.p03.isSubmitted}
                  status={
                    !cardData.p03.isSubmitted
                      ? InputStatus.ENABLE
                      : cardData.p03.answer1.trim().toLowerCase() !== cardData.p03.solution1 &&
                        cardData.p03.answer1.trim().toLowerCase() !== cardData.p03.solution1_2
                      ? InputStatus.ERROR
                      : ''
                  }
                />
              </ItemWrap>
              <Question type='text' size='small'>
                (2)
              </Question>
              <ItemWrap>
                <Input
                  inputSize='x-small'
                  value={cardData.p03.answer2}
                  onChange={e => handleChange(2, e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='2번 답 첫번째 입력란'
                  width='225px'
                  maxLength={100}
                  readOnly={cardData.p03.isSubmitted}
                  status={
                    !cardData.p03.isSubmitted
                      ? InputStatus.ENABLE
                      : cardData.p03.answer2.trim().toLowerCase() !== cardData.p03.solution2 &&
                        cardData.p03.answer2.trim().toLowerCase() !== cardData.p03.solution2_2
                      ? InputStatus.ERROR
                      : ''
                  }
                />
                <Input
                  inputSize='x-small'
                  value={cardData.p03.answer3}
                  onChange={e => handleChange(3, e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='2번 답 두번째 입력란'
                  width='225px'
                  maxLength={100}
                  readOnly={cardData.p03.isSubmitted}
                  status={
                    !cardData.p03.isSubmitted
                      ? InputStatus.ENABLE
                      : cardData.p03.answer3.trim().toLowerCase() !== cardData.p03.solution3 &&
                        cardData.p03.answer3.trim().toLowerCase() !== cardData.p03.solution3_2
                      ? InputStatus.ERROR
                      : ''
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
          <Box marginTop='12px'>
            <Typography>(1) buildings (2) guard ceremony</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
