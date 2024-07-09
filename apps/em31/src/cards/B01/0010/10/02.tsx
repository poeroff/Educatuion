import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  EStyleTableTypes,
  EStyleButtonTypes,
  ESvgType,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  Table,
  TR,
  TH,
  TBody,
  TD,
  Typography,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01001010_store } from './store';
const P02 = () => {
  const PAGE_NUMBER = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01001010_store);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box>
          <Box vAlign='start' fontWeight='var(--font-weight-medium)'>
            <Box marginTop='7px'>
              <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
            </Box>
            &nbsp;안에 알맞은 수를 찾아 써넣어 문제를 만들어 덧셈 문제를 풀어 보세요.
          </Box>
        </Box>
      </>
    ),
    markSize: 'middle',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const th_arr = ['페트병', '알류미늄 캔', '유리병'];
  const td_arr = [
    [416, 287, 135],
    [324, 121, 109],
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p02.answer1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: cardData.p02.answer2,
          isAnswer: true,
        },
      ],
    },
  ];
  const onCalculate = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
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
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    console.log('value: ', value);
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2) && !cardData.p02.isSubmitted && !isShow}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      onSubmit={onCalculate}
      vAlign='start'
      useRound
    >
      <BoxWrap flexDirection='column' alignItems='center' boxGap={0} marginBottom={10}>
        <TableTitle>지난 달 쓰담 달리기에서 주운 재활용 쓰레기양</TableTitle>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['210px', '210px', '210px', '210px']}>
          <TBody>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                재활용 쓰레기
              </TH>
              {th_arr.map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TH>
                );
              })}
            </TR>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                주운 양(개)
              </TH>
              {td_arr[0].map((item, idx) => {
                return (
                  <TD key={idx} vAlign='middle' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                    {item}
                  </TD>
                );
              })}
            </TR>
          </TBody>
        </Table>
      </BoxWrap>
      <Box marginTop='10px' vAlign='flex-start'>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' />
        </Box>
        <Box marginLeft='8px'>
          <Typography size={EStyleFontSizes.MEDIUM}>
            지난달 쓰담 달리기에서 페트병을{' '}
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p02.answer1}
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer1.trim() !== cardData.p02.solution1
                  ? InputStatus.ERROR
                  : InputStatus.CORRECT
              }
              onChange={event => handleChange(1, event.target.value)}
              ariaLabel='빈칸에 알맞은 수를 입력하세요.'
            />
            &nbsp;개, 유리병을&nbsp;
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p02.answer2}
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer2.trim() !== cardData.p02.solution2
                  ? InputStatus.ERROR
                  : InputStatus.CORRECT
              }
              onChange={event => handleChange(2, event.target.value)}
              ariaLabel='빈칸에 알맞은 수를 입력하세요.'
            />
            개 주었습니다.
          </Typography>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>416, 135</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>표에서 지난달 쓰담 달리기에서 주운 페트병과 유리병의 양을 살펴보면 페트병은 416개, 유리병은 153개입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const TableTitle = styled.p`
  padding: 4px 53px;
  margin-bottom: 8px;

  color: var(--color-white);
  line-height: 48px;
  text-align: center;

  border-radius: 16px;

  background-color: #058943;
`;
export default P02;
