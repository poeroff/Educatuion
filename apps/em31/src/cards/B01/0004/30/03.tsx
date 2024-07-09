import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Input,
  Label,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
  SvgIcon,
  InputStatus,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow_right from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B01000430_store } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000430_store);

  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

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
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer.trim() === cardData.p03.solution;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    }
    changeData('P03', 1, subKey, value);
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='3' type='icon' />
        <Box>
          <Box display='inline-flex'>
            수 카드
            <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginLeft={'5px'} marginRight={'5px'}>
              4
            </Box>
            ,
            <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginRight={'5px'}>
              2
            </Box>
            ,
            <Box background='yellow' hAlign='center' width={'8px'} height={'48px'} marginRight={'5px'}>
              8
            </Box>
          </Box>
          을 한 번씩만 이용하여 세 자리 수를 만들려고 합니다. 만들 수 있는 가장 큰 수와 가장 작은 수의 합을 구해 보세요 .
        </Box>
      </>
    ),
    markSize: 'middle',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData.p03.answer}
      submitBtnColor={!cardData.p03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Scroll tabIndex={0}>
        <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
          <Box display='flex'>
            <Box background='yellow' hAlign='center' width={'50px'} height={'70px'} marginRight={'24px'}>
              <Typography fontSize='32px'>4</Typography>
            </Box>
            <Box background='yellow' hAlign='center' width={'50px'} height={'70px'} marginRight={'24px'}>
              <Typography fontSize='32px'>2</Typography>
            </Box>
            <Box background='yellow' hAlign='center' width={'50px'} height={'70px'}>
              <Typography fontSize='32px'>8</Typography>
            </Box>
          </Box>

          <Box marginTop='24px'>
            <Input
              width='198px'
              value={cardData.p03.answer}
              readOnly={cardData.p03.isSubmitted}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='1번 답란'
              status={
                !cardData.p03.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p03.solution === cardData.p03.answer.trim()
                  ? InputStatus.DEFAULT
                  : InputStatus.ERROR
              }
            />
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>1090</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>만들 수 있는 가장 큰 세 자리 수는 842이고 가장 작은 세 자리 수는 248입니다.</Typography>
            <Typography>
              <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' /> 842+248=1090
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
