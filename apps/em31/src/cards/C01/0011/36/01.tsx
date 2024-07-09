import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Box, Typography, Input, IQuestionProps, BottomSheet, ETagLine, Tag, EStyleButtonTypes, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import backgroundImg from '@/assets/example/EM-010/MC31108.png';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import C01_0011_36 from './store';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';

const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0011_36);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>
          세 자리 수가 쓰인 수 카드 2장을 뽑아 뺄셈을 하려고 했는데 한 장이 찢어져서 수가 보이지 않습니다. 카드에 쓰인 두 수의 차가 493일 때 찢어진
          카드에 쓰인 수를 구해 보세요.
        </Typography>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isAnswerCorrect = (answer: string, solution: string) => {
    const incorrectPattern = /\d\s+\d/;
    return answer.replace(/\s+/g, '') === solution && !incorrectPattern.test(answer);
  };
  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = isAnswerCorrect(cardData.p01.answer, cardData.p01.solution);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData('P01', 1, 1, value);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer}
      submitBtnColor={cardData.p01.answer ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <QuestionBox>
          <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 750'>
            750
          </Typography>
          <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 57'>
            57
          </Typography>
        </QuestionBox>
        <Box marginTop='20px'>
          <Input
            width='263px'
            value={cardData.p01.answer}
            onChange={e => handleChange(e.target.value)}
            ariaLabel='답을 입력하세요'
            readOnly={cardData.p01.isSubmitted}
            status={!cardData.p01.answer ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect ? 'error' : 'enable'}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography>257</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>찢어진 수 카드에 쓰인 수를 □라고 하면 750-□=493 입니다.</Typography>
            <Typography>□=750-493=257이므로 찢어진 수 카드에 쓰인 수는 257입니다.</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='힌트' />
          </Box>
          <Box marginTop='12px'>
            <Typography>먼저 두 수 중에서 어느 수가 더 큰 수인지 알아봐요. </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const QuestionBox = styled.div`
  width: 292px;
  height: 70px;
  padding: 0 7.52px 0 17.52px;

  display: flex;
  align-items: center;

  background: url(${backgroundImg}) no-repeat;
  background-size: 292px 74px;

  > span + span {
    margin-left: 130px;
  }
`;

export default P01;
