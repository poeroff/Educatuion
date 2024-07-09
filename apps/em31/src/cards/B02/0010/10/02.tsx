import { useState, useEffect } from 'react';
import {
  Box,
  IQuestionProps,
  EStyleButtonTypes,
  Radio,
  BottomSheet,
  Typography,
  Label,
  BoxWrap,
  Image,
  Tag,
  ETagLine,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B02_0010_10 } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B02_0010_10);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        다음과 같이 모양과 크기가 같은 정사각형 조각 9개로 만든 조각보에서 찾을 수 있는 크고 작은 정사각형은 모두 몇 개인지 구해 보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: {
            value: '',
            isCorrect: false,
          },
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: data[0].value.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const radioData = [
    {
      text: '직사각형',
    },
    {
      text: '정사각형',
    },
  ];

  const radioChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      [pageNumber]: {
        ...prev[pageNumber],
        answer: value,
      },
    }));
    changeData(pageNumber, 1, 1, value);
  };

  const isBtnDisabled = () => {
    return isNotEmptyString(cardData[pageNumber].answer) || cardData[pageNumber].isSubmitted;
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      const isCorrect = cardData[pageNumber].answer === cardData[pageNumber].solution;
      setCardData(prev => ({
        ...prev,
        [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      useRound
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
        <Image src={'/B02/0010/10/B-EM31-02-0010-1002.png'} alt={'정사각형 9개'} height='150px' width='150px' />
      </BoxWrap>

      <Box vAlign='flex-start' marginTop='24px'>
        <Question
          subject='math'
          type='icon'
          size='small'
          mark={cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none'}
        >
          <Box>
            <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
            &nbsp;구하려는 것은 무엇인가요?
            <Typography usePre>
              {`\u00A0\u00A0\u00A0\u00A0`}조각보에서 찾을 수 있는 크고 작은 (&nbsp;
              {radioData.map((item, index) => {
                return (
                  <span key={index}>
                    <Radio
                      gap={10}
                      type={'box'}
                      name={'radio-group'}
                      ariaLabel={item.text}
                      value={cardData[pageNumber].answer === (index + 1).toString()}
                      readOnly={cardData[pageNumber].isSubmitted}
                      isError={cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect}
                      onClick={() => radioChange((index + 1).toString())}
                    >
                      {item.text}
                    </Radio>
                    {index === 0 ? <Typography useGap={false}>,</Typography> : null}
                  </span>
                );
              })}
              &nbsp; ) {'\n'}
              {`\u00A0\u00A0\u00A0\u00A0`}수입니다.
            </Typography>
          </Box>
        </Question>
      </Box>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>정사각형</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>조각보에서 찾을 수 있는 크고 작은 정사각형 수를 구하려고 합니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
