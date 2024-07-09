import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import { useEffect, useMemo, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B03_0005_50 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, Input, IQuestionProps, Label, Tag, Typography } from '@maidt-cntn/ui';
import { isNumber, isValidString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';

const P06 = () => {
  const PAGE_NUMBER = 'P06';
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B03_0005_50);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const onGrade = () => {
    if (cardData.p06.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p06.answer.trim() === cardData.p06.solution;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: value } }));
    changeData(PAGE_NUMBER, 1, 1, value);
  };

  const isValid: boolean = useMemo(() => {
    return isValidString(cardData.p06.answer) && isNumber(cardData.p06.answer);
  }, [cardData.p06.answer]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={{}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isValid ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isValid}
      onSubmit={onGrade}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              64
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>÷8</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                width='130px'
                onChange={e => handleInputChange(e.target.value)}
                title='답 입력란'
                value={cardData.p06.answer}
                maxLength={3}
                readOnly={cardData.p06.isSubmitted}
                status={!isValid ? 'default' : cardData.p06.isSubmitted && !cardData.p06.isCorrect ? 'error' : 'enable'}
              />
            </Box>
          </BoxWrap>
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
            <Tag type={ETagLine.GREEN} label='답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData.p06.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column'>
                <Typography>8×8＝64이므로 64÷8＝8입니다.</Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P06;
