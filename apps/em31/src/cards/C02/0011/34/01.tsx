import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Typography, Input, IQuestionProps, EStyleButtonTypes, SvgIcon, Image, InputStatus, Tag, ETagLine, BottomSheet } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C02_0011_34 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const questionListData = [
  {
    name: '선미',
    question: '네 각이 모두 직각입니다.',
  },
  {
    name: '시후',
    question: '가는 네 각이 모두 직각이고, 나는 네 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 각이 모두 직각이 아닙니다.',
  },
  {
    name: '정민',
    question: '가는 직사각형, 나는 정사각형입니다.',
  },
];

const P01 = () => {
  const pageNumber = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02_0011_34);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <span style={{ whiteSpace: 'nowrap' }}>두 사각형을 보고 잘못 말한 사람을 찾아 이름을 써 보세요.</span>
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
          src='/C02/0011/34/DEC312M05.png'
          alt='가: 네 각이 모두 직각이지만 네 변의 길이는 같지 않은 사각형, 나: 네 각이 모두 직각이고 네 변의 길이가 모두 같은 기울어진 사각형'
          width='400px'
          height='150px'
        />
        <Box type='dashed' padding='8px 24px' useRound width='607px'>
          {questionListData.map(value => (
            <Box vAlign='center' key={value.name}>
              <Typography weight='var(--font-weight-bold)' lineHeight='48px'>
                {value.name}: {value?.question}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box marginTop='24px'>
          <Input
            width='120px'
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
          />
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
              <Typography>시후</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>시후: 나는 네 각이 모두 직각입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
