import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import empty_square from '@/assets/icon/math_empty_square.svg';
import arrow from '@/assets/icon/arrow_fat_right.svg';
import { A03_0003_05 } from './store';
const P02 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0003_05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' type='paint' background='#969590' color='var(--color-white)' />{' '}
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = cardData.p02.answer1.trim() === cardData.p02.solution1 && cardData.p02.answer2.trim() === cardData.p02.solution2;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
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

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        cardData.p02.answer1 && cardData.p02.answer2 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <Box justifyContent='center' marginTop='24px'>
        <Typography size={EStyleFontSizes.MEDIUM}>바둑돌 15개를 5개씩 묶으면</Typography>
        <Input
          type='number'
          value={cardData.p02.answer1}
          onChange={e => handleChange(1, e.target.value)}
          width='100px'
          ariaLabel='주머니 한 개에 넣을 수 있는 바둑돌 개수'
          readOnly={cardData.p02.isSubmitted}
          status={
            !cardData.p02.answer1
              ? InputStatus.DEFAULT
              : cardData.p02.isSubmitted && cardData.p02.answer1.trim() !== cardData.p02.solution1
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        &nbsp;묶음입니다.
      </Box>

      <Box justifyContent='center' marginTop='24px'>
        <SvgIcon src={arrow} size='32px' style={{ margin: '0 10px' }} />
        <Typography size={EStyleFontSizes.MEDIUM}>15를 5로 나누면</Typography>
        <Input
          type='number'
          value={cardData.p02.answer2}
          onChange={e => handleChange(2, e.target.value)}
          width='100px'
          ariaLabel='15를 5로 나눈 값'
          readOnly={cardData.p02.isSubmitted}
          status={
            !cardData.p02.answer2
              ? InputStatus.DEFAULT
              : cardData.p02.isSubmitted && cardData.p02.answer2.trim() !== cardData.p02.solution2
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        &nbsp;입니다.
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography>3, 3</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>바둑돌 15개를 5개씩 묶으면 3묶음입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
