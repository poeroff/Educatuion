import {
  BoxWrap,
  Box,
  IQuestionProps,
  Image,
  TMainHeaderInfoTypes,
  Typography,
  Scroll,
  Input,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  InputStatus,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import { L01C09A06a } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L01C09A06a);

  const currentPage = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B',
    headerPattern: 'icon',
    iconType: 'practice',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '괄호 안의 말을 활용하여 우리말을 영어로 옮겨 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const data = [
    { ko: '나는 우유를 마신다. (drink)', en: 'I' },
    { ko: '아빠는 오렌지 주스를 마신다. (drink)', en: 'Dad' },
    { ko: '엄마와 나는 빵과 토마토를 먹는다. (eat)', en: 'Mom and I' },
    { ko: '아빠는 토마토를 먹지 않는다. (eat)', en: 'Dad' },
    { ko: '우리 모두 달걀을 먹는다. (have)', en: 'We all' },
  ];

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

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
    const isCorrect = cardData.p01.answer.every((ans, idx = 0) => isAnswer(ans, cardData.p01.solution[idx]));

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
      <BoxWrap useFull justifyContent='center'>
        <Box padding='30px 0'>
          <Image
            src={'/L01/C09/A06/ME1-L01-C09-A06.jpg'}
            width='370px'
            // height='352px'
            alt='식탁에서 엄마는 빵, 달걀, 커피를, 나는 빵, 토마토, 달걀, 유유를, 아빠는 고구마, 달걀, 베이컨, 바나나, 오렌지 주스를 먹으려고 한다.'
          />
        </Box>
        <Box>
          <Scroll tabIndex={0}>
            <List data={data} align='vertical'>
              {({ value, index = 1 }) => (
                <Box display='flex' flexDirection='column'>
                  <Box>
                    <Typography>
                      ({index}) {value?.ko}
                    </Typography>
                  </Box>{' '}
                  <Box marginLeft={'48px'}>
                    <Typography>
                      {value?.en}{' '}
                      <Input
                        tabIndex={100 + index}
                        width='330px'
                        maxLength={100}
                        value={cardData.p01.answer[index - 1]}
                        onChange={e => handleChangeValue(e, index - 1)}
                        ariaLabel={index + '번 답안'}
                        readOnly={cardData.p01.isSubmitted}
                        status={
                          cardData.p01.answer[index - 1] === ''
                            ? InputStatus.DEFAULT
                            : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[index - 1], cardData.p01.solution[index - 1])
                            ? InputStatus.ERROR
                            : InputStatus.ENABLE
                        }
                        placeholder='내용을 넣어 주세요.'
                      />
                      .
                    </Typography>{' '}
                  </Box>
                </Box>
              )}
            </List>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography usePre>{cardData.p01.solution.map((sol, idx) => `(${idx + 1}) ${sol} \n`).join('')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
