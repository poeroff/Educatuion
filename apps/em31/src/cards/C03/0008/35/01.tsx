import { useEffect, useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Input,
  IQuestionProps,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  SvgIcon,
  BoxWrap,
  Table,
  TR,
  TH,
  TD,
  TBody,
  EStyleTableTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0008_35 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0008_35);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>몫이 작은 것부터 차례로 1, 2, 3을 써넣으세요.</Typography>
      </Box>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
        },
      ],
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setCardData(prev => {
      const newAnswer1 = [...prev.p01.answer1];
      newAnswer1[index] = e.target.value;
      return { ...prev, p01: { ...prev.p01, answer1: newAnswer1 } };
    });
    changeData('P01', 1, 1, e.target);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer1.every((value, index) => value === cardData.p01.solution1[index]);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleStatus = (index: number) => {
    if (cardData.p01.isSubmitted) {
      if (cardData.p01.answer1[index] === cardData.p01.solution1[index]) {
        return InputStatus.ENABLE;
      } else {
        return InputStatus.ERROR;
      }
    } else {
      if (cardData.p01.answer1[index]) {
        return InputStatus.ENABLE;
      } else {
        return InputStatus.DEFAULT;
      }
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : cardData.p01.answer1.every(value => isNotEmptyString(value))
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!cardData.p01.answer1.every(value => isNotEmptyString(value))}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <BoxWrap display='flex' justifyContent='space-around' flexDirection='row'>
        <Box width={250} hAlign='center' flexDirection='column'>
          <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
            <Box marginTop='24px' marginBottom='24px'>
              <Typography>28 ÷ 4</Typography>
            </Box>
          </Box>
          <Box marginTop={24}>
            <Input
              width='50px'
              value={cardData.p01.answer1[0]}
              onChange={event => handleChange(event, 0)}
              ariaLabel='28÷4'
              status={handleStatus(0)}
              tabIndex={102}
              type='number'
            />
          </Box>
        </Box>
        <Box width={250} hAlign='center' flexDirection='column'>
          <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
            <Box marginTop='24px' marginBottom='24px'>
              <Typography>56 ÷ 7</Typography>
            </Box>
          </Box>
          <Box marginTop={24}>
            <Input
              width='50px'
              value={cardData.p01.answer1[1]}
              onChange={event => handleChange(event, 1)}
              ariaLabel='56÷7'
              status={handleStatus(1)}
              tabIndex={103}
              type='number'
            />
          </Box>
        </Box>
        <Box width={250} hAlign='center' flexDirection='column'>
          <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
            <Box marginTop='24px' marginBottom='24px'>
              <Typography>45 ÷ 9</Typography>
            </Box>
          </Box>
          <Box marginTop={24}>
            <Input
              width='50px'
              value={cardData.p01.answer1[2]}
              onChange={event => handleChange(event, 2)}
              ariaLabel='45÷9'
              status={handleStatus(2)}
              tabIndex={104}
              type='number'
            />
          </Box>
        </Box>
      </BoxWrap>
      <Box display='flex' alignItems='center' flexDirection='column' marginTop={24}>
        <Box display={'flex'}>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['130px', '130px']}>
            <TBody>
              <TR key={1}>
                <TH key={1} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                  선택보기
                </TH>
                <TD key={2} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                  1, 2, 3
                </TD>
              </TR>
            </TBody>
          </Table>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>2, 3, 1</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>28÷4=7, 56÷7=8, 45÷9=5</Typography>
              <Typography>
                ➡ 8 {'>'} 7 {'>'} 5이므로 차례로 2, 3, 1을 써넣습니다
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
