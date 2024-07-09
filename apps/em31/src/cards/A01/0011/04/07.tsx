import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { A01_0011_04 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import backgroundImg from '../../../../assets/example/EM-010/MC31108.png';
import styled from '@emotion/styled';
import empty_square from '@/assets/icon/math_empty_square.svg';

const P07 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0011_04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={7} />세 자리 수가 쓰인 수 카드 2장을 뽑아 뺄셈을 하려고 했는데 한 장이 찢어져서 수가 보이지 않습니다.
        카드에 쓰인 두 수의 차가 672일 때 찢어진 수를 카드에 쓰인 수를 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p07.isSubmitted, cardData.p07.isCorrect),
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

  const onGrade = () => {
    if (cardData.p07.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p07.answer.trim() === cardData.p07.solution;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p07: { ...prev.p07, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p07.answer,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P07', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P07')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p07.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P07', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer: value } }));
    changeData('P07', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P07');
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p07.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p07.answer}
      submitBtnColor={!cardData.p07.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onGrade}
      useRound
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <QuestionBox>
          <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 840'>
            840
          </Typography>
          <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 68'>
            68
          </Typography>
        </QuestionBox>
        <Box marginTop='20px'>
          <Input
            width='263px'
            value={cardData.p07.answer}
            onChange={e => handleChange(e.target.value)}
            ariaLabel='답란'
            readOnly={cardData.p07.isSubmitted}
            status={
              !cardData.p07.isSubmitted
                ? InputStatus.DEFAULT
                : cardData.p07.answer.trim() !== cardData.p07.solution
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData.p07.isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p07.solution}</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px' display='flex' flexDirection='column'>
            <Typography usePre>
              <Box display='flex' alignItems='center'>
                {`찢어진 수 카드에 쓰인 수를 `}&nbsp;
                <SvgIcon alt='빈칸' title='빈칸' src={empty_square} size='43px' />
                &nbsp;{`라고 하면 840-`}&nbsp;
                <SvgIcon alt='빈칸' title='빈칸' src={empty_square} size='43px' />
                &nbsp;{`=672입니다.\n `}
              </Box>

              <Box display='flex' alignItems='center'>
                <SvgIcon alt='빈칸' title='빈칸' src={empty_square} size='43px' />
                &nbsp;{`=840-672=168이므로 찢어진 수 카드에 쓰인 수는 168입니다.`}
              </Box>
            </Typography>
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

export default P07;
