import { useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Input,
  IQuestionProps,
  EStyleButtonTypes,
  SvgIcon,
  Image,
  InputStatus,
  Tag,
  ETagLine,
  BottomSheet,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C02_0011_35 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const pageNumber = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02_0011_35);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        그림에서 찾을 수 있는 크고 작은 정사각형은 모두 몇 개인가요?
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: value } }));
    changeData(pageNumber, 1, 1, value);
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
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='start'
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Image
          src='/C02/0011/35/DEC312M06.png'
          alt='똑같은 크기의 작은 정사각형을 아래에서부터 3개, 2개, 1개씩 계단 모양으로 쌓아 올린 그림'
          width='200px'
          height='200px'
        />
        <Box marginTop='40px' marginLeft={'20px'}>
          <Input
            type='number'
            width='100px'
            maxLength={2}
            status={
              cardData[pageNumber].answer
                ? cardData[pageNumber].isSubmitted
                  ? cardData[pageNumber].isCorrect
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            readOnly={cardData[pageNumber].isSubmitted}
            value={cardData[pageNumber].answer}
            ariaLabel='답란'
            onChange={e => handleChange(e.target.value)}
          />{' '}
          개
        </Box>
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
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>7</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <BoxWrap display='flex' alignItems='center' marginBottom={30} marginLeft={20}>
                <Image
                  src='/C02/0011/35/DEC312M06(sol).png'
                  alt='주어진 그림의 작은 정사각형에 위에서부터 순서대로 1, 2, 3, 4, 5, 6이 써져 있는 그림'
                  width='150px'
                  height='150px'
                />
                <Box marginLeft={50}>
                  <Typography>정사각형 1개짜리: 1, 2, 3, 4, 5, 6 ➡ 6개</Typography>
                  <Typography>
                    정사각형 4개짜리:&nbsp;
                    <MathExpression equation={'$2+3+5+6$'} />
                    &nbsp; ➡ 1개
                  </Typography>
                </Box>
              </BoxWrap>
              <Typography>
                따라서 그림에서 찾을 수 있는 크고 작은 정사각형은 모두&nbsp;
                <MathExpression equation={'$6+1=7$ '} />
                (개)입니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
