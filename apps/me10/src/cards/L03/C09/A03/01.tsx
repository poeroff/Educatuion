import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C09A03 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mePractice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '사진을 보고, 주어진 말을 활용하여 글을 완성해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const imageInfo = {
    src: `/L03/C09/A03/ME1-L03-C09-A03-P01.jpg`,
    alt: '유니폼을 입은 학생들이 축구 를 하고 있다.',
  };

  const data: React.ReactNode[] = [
    <>
      <Indent />
      Last Friday was Sports Day. At the end, our classmates <Bold>(1)</Bold>{' '}
    </>,
    <>
      {' '}
      soccer against Class 5. We <Bold>(2)</Bold>{' '}
    </>,
    <>
      {' '}
      a goal. Class 5 <Bold>(3)</Bold>{' '}
    </>,
    <>
      {' '}
      first place. So we <Bold>(4)</Bold>{' '}
    </>,
    <>, “Congratulations!”</>,
  ];

  const suggestion: string[] = ['play', 'not score', 'win', 'say'];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: updatedAnswers } }));
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p01.answer.every((a, idx = 0) => {
      if (idx === 1) return isAnswer(a, cardData.p01.solution2[0]) || isAnswer(a, cardData.p01.solution2[1]);
      else return isAnswer(a, cardData.p01.solution[idx]);
    });

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      useExtend
    >
      <Box hAlign='center' gap={24}>
        <BoxWrap width='370px'>
          <Box vAlign='center' useFull>
            <Image src={imageInfo.src} width='370px' alt='alt' />
          </Box>
        </BoxWrap>
        <BoxWrap marginTop={24} flexDirection='column' flex={1}>
          <Box>
            <Typography>
              {Array.from({ length: 4 }, (_, index) => (
                <span key={'text_' + index}>
                  {data[index]}
                  <Input
                    tabIndex={100 + index}
                    width='250px'
                    placeholder='내용을 넣어 주세요.'
                    maxLength={100}
                    value={cardData.p01.answer[index]}
                    onChange={e => handleChangeValue(e, index)}
                    ariaLabel={index + '번 답안'}
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      cardData.p01.answer[index] === ''
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted &&
                          (index === 1
                            ? !isAnswer(cardData.p01.answer[1], cardData.p01.solution2[0]) &&
                              !isAnswer(cardData.p01.answer[1], cardData.p01.solution2[1])
                            : !isAnswer(cardData.p01.answer[index], cardData.p01.solution[index]))
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </span>
              ))}
              {data[4]}
            </Typography>
          </Box>
          <Box marginRight={24} marginTop={0} height={70}>
            <TextView title='제시어'>
              <Box width='400px' display='flex' justifyContent='space-around'>
                {suggestion.map((sugg, idx) => (
                  <Typography key={'suggestion_' + idx} useGap={false}>
                    {sugg}
                  </Typography>
                ))}
              </Box>
            </TextView>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='10px'>
            {Array.from({ length: 4 }, (_, i) => (
              <Typography key={'solution_' + i} style={{ display: 'block' }}>
                ({i + 1}) {cardData.p01.solution[i]}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const Bold = styled.span`
  font-weight: var(--font-weight-bold);
`;

const Indent = styled.span`
  margin-left: 16px;
`;
