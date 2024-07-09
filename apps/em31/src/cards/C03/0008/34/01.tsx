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
  Label,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C03_0008_34 } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C03_0008_34);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Typography>지우개 20개를 한 명에게 5개씩 나누어 주려고 합니다. 몇 명에게 나누어 줄 수 있나요?</Typography>
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
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
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
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px 44px' type='line' useRound>
          <Image src={'/C03/0008/34/DEC313M03.png'} alt={'지우개 20개가 그려진 그림입니다.'} width={'590px'} height={'215px'} />
        </Box>
        <Box marginTop='24px'>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='80px'
              marginLeft={20}
              value={cardData.p01.answer1[0]}
              onChange={e => {
                handleChange(e, 0);
              }}
              ariaLabel={'식 첫번째 입력란'}
              readOnly={cardData.p01.isSubmitted}
              status={handleStatus(0)}
              type='number'
            />
            <Typography>÷</Typography>
            <Input
              width='60px'
              value={cardData.p01.answer1[1]}
              onChange={e => {
                handleChange(e, 1);
              }}
              ariaLabel={'식 두번째 입력란'}
              readOnly={cardData.p01.isSubmitted}
              status={handleStatus(1)}
              type='number'
            />
            <Typography>=</Typography>
            <Input
              width='60px'
              value={cardData.p01.answer1[2]}
              onChange={e => {
                handleChange(e, 2);
              }}
              ariaLabel={'식 세번째 입력란'}
              readOnly={cardData.p01.isSubmitted}
              status={handleStatus(2)}
              type='number'
            />
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='148px'
              marginLeft={20}
              value={cardData.p01.answer1[3]}
              onChange={e => {
                handleChange(e, 3);
              }}
              ariaLabel={'답란'}
              readOnly={cardData.p01.isSubmitted}
              status={handleStatus(3)}
              type='number'
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>20, 5, 4, 4</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>지우개 20개를 한 명에게 5개씩 나누어 주면 20÷5=4(명)에게 나누어 줄 수 있습니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
