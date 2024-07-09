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
  List,
  PinchZoom,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C09A03a } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const imgContent = {
  imgSrc: `/L01/C09/A03/ME1-L01-C09-A03-P01.jpg`,
  imgAlt: `여우와 함께 있는 어린 왕자`,
};

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03a);
  const [isShow, setIsShow] = useState<boolean>(false);

  const currentPage = 'P01';

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

  const { imgSrc, imgAlt } = imgContent;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'practice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '어린 왕자의 말에서 밑줄 친 부분을 바르게 고쳐 써 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const paragraph: React.ReactNode = (
    <Typography>
      Hi, I{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        <Typography useGap={false} fontWeight='var(--font-weight-bold)' textDecoration={'underline'}>
          (1)
        </Typography>{' '}
        is
      </Typography>{' '}
      the Little Prince. This{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        <Typography useGap={false} fontWeight='var(--font-weight-bold)' textDecoration={'underline'}>
          (2)
        </Typography>{' '}
        are
      </Typography>{' '}
      my friend Fox. His ears{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        <Typography useGap={false} fontWeight='var(--font-weight-bold)' textDecoration={'underline'}>
          (3)
        </Typography>{' '}
        not are
      </Typography>{' '}
      big, but he{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        <Typography useGap={false} fontWeight='var(--font-weight-bold)' textDecoration={'underline'}>
          (4)
        </Typography>{' '}
        are
      </Typography>{' '}
      a good listener. We{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        <Typography useGap={false} fontWeight='var(--font-weight-bold)' textDecoration={'underline'}>
          (5)
        </Typography>{' '}
        am
      </Typography>{' '}
      good friends.
    </Typography>
  );

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
    const isCorrect = cardData.p01.answer.every((a, idx = 0) => a === cardData.p01.solution[idx]);

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
      <Box useFull>
        <BoxWrap marginTop={24}>
          <Box width={346} vAlign='center' useFull>
            <PinchZoom>
              <Image src={imgSrc} width='346px' />
              <Box type='hidden'>{imgAlt}</Box>
            </PinchZoom>
            <Box type='hidden' id={'img_desc'}></Box>
          </Box>
          <Box marginLeft='10px' useFull>
            <Box useFull background='white' useRound>
              {paragraph}
            </Box>
          </Box>
        </BoxWrap>
        <BoxWrap marginTop={24}>
          <List data={cardData.p01.answer} gap={24} align='horizontal'>
            {({ index = 1 }) => (
              <Box display='flex' flexDirection='column'>
                <Typography>({index})</Typography>
                <Input
                  tabIndex={100 + index}
                  width='180px'
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
                />
              </Box>
            )}
          </List>
        </BoxWrap>
      </Box>
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
