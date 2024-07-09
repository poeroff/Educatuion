import {
  Box,
  IQuestionProps,
  BottomSheet,
  InputStatus,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState, ChangeEvent, useEffect } from 'react';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0006_04_store } from './store';
import { studentAtom } from '@/stores/student';

const PAGE_NUMBER = 'P01';
const PAGE_KEY = 'p01';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A01_0006_04_store);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState(false);
  const submitLabel = cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitDisabled = cardData[PAGE_KEY].data.some(data => data.answer === '');
  const submitBtnColor = !submitDisabled
    ? cardData[PAGE_KEY].isSubmitted
      ? isShow
        ? EStyleButtonTypes.GRAY
        : EStyleButtonTypes.YELLOW
      : EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '오후에 심을 나무 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        오후에 심을 나무 수를 구하는 식을 써 보세요.
      </>
    ),
    mark: getMarking(cardData[PAGE_KEY].isSubmitted, cardData[PAGE_KEY].isCorrect),
    markSize: 'middle',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      const newData = cardData[PAGE_KEY].data.map((data, index) => {
        return { ...data, answer: userSubmissionList[0]?.inputData[index].value || cardData[PAGE_KEY].data[index].answer };
      });

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            data: [...newData],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const result = cardData[PAGE_KEY];

    const isCorrect1 = isAnswer(result.data[0].answer.trim(), result.data[0].solution);
    const allCorrect = isCorrect1;

    setCardData(prev => ({
      ...prev,
      [PAGE_KEY]: {
        ...prev[PAGE_KEY],
        isSubmitted: true,
        isCorrect: allCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: result.data[0].answer,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
        ],
        isCorrect: allCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, true);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, subKey: number) => {
    const { value } = e.target;

    const newData = [...cardData[PAGE_KEY].data];
    newData[subKey] = {
      ...newData[subKey],
      answer: value,
    };

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], data: newData } }));
    changeData(PAGE_NUMBER, 1, subKey + 1, value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitLabel}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      submitDisabled={submitDisabled}
      submitBtnColor={submitBtnColor}
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            name='answer1'
            value={cardData[PAGE_KEY].data[0].answer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChangeEvent(e, 0)}
            readOnly={cardData[PAGE_KEY].isSubmitted}
            width='300px'
            ariaLabel='사랑 마을에 배달한 개수'
            status={
              cardData[PAGE_KEY].isSubmitted && !cardData[PAGE_KEY].isCorrect
                ? InputStatus.ERROR
                : cardData[PAGE_KEY].data[0].answer
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[PAGE_KEY].data[0].solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[PAGE_KEY].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
