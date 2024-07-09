import { Container, TPuzzle } from '@maidt-cntn/ui/math';
import { Puzzle } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  Canvas,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  Label,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { ReactNode, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { A01_0009_03 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { initData, submitData, saveData } = usePageData();
  const [initPuzzle, setInitPuzzle] = useState<TPuzzle>();
  const [puzzleInfo, setPuzzleInfo] = useState<TPuzzle>();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0009_03);
  const { userId } = useRecoilValue(studentAtom);
  const headerInfo = null;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        덧셈과 뺄셈을 하여 그림 조각을 맞춰 보세요.
      </>
    ),
  };

  const [isShow, setIsShow] = useState<boolean>(false);

  const prefix = import.meta.env.VITE_CDN_PATH;

  const backgroundImgUrl = prefix + '/A01/0009/03/MK31031-1.png';
  const answer: ReactNode = (
    <>
      <Image width='200px' src={'/A01/0009/03/ZA31101.png'} alt='사람과 기린, 새 그리고 토끼가 있습니다.' />
      <br />
      <Typography fontSize={EStyleFontSizes.MEDIUM}>출처: 수학 교과서 3-1 23p</Typography>
    </>
  );

  const imgUrls = [
    prefix + '/A01/0009/03/MK3103 2.png',
    prefix + '/A01/0009/03/MK3103 1-1.png',
    prefix + '/A01/0009/03/MK3103 3.png',
    prefix + '/A01/0009/03/MK3103 12.png',
    prefix + '/A01/0009/03/MK3103 10.png',
    prefix + '/A01/0009/03/MK3103 4.png',
    prefix + '/A01/0009/03/MK3103 11.png',
    prefix + '/A01/0009/03/MK3103 9.png',
    prefix + '/A01/0009/03/MK3103 8.png',
    prefix + '/A01/0009/03/MK3103 7.png',
    prefix + '/A01/0009/03/MK3103 5.png',
    prefix + '/A01/0009/03/MK3103 6.png',
  ];
  const imgAlts = [
    '154가 적힌 그림 조각이 있습니다.',
    '338이 적힌 그림 조각이 있습니다.',
    '391이 적힌 그림 조각이 있습니다.',
    '394가 적힌 그림 조각이 있습니다.',
    '439가 적힌 그림 조각이 있습니다.',
    '527이 적힌 그림 조각이 있습니다.',
    '548이 적힌 그림 조각이 있습니다.',
    '870이 적힌 그림 조각이 있습니다.',
    '912가 적힌 그림 조각이 있습니다.',
    '939가 적힌 그림 조각이 있습니다.',
    '1008이 적힌 그림 조각이 있습니다.',
    '1043이 적힌 그림 조각이 있습니다.',
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: puzzleInfo,
        },
        {
          subKey: 2,
          type: 'CANVAS',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isPuzzleFinished: false,
            isSubmitted: isSubmitted,
          },
        }));
        setInitPuzzle(userSubmissionList[0].inputData[0].value);
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: puzzleInfo,
            },
            {
              subKey: 2,
              type: 'CANVAS',
              value: '',
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const handlePuzzleComplete = (completedInfo: TPuzzle) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isPuzzleFinished: true } }));
    setPuzzleInfo(completedInfo);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={cardData.p02.isPuzzleFinished ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!cardData.p02.isPuzzleFinished}
      onSubmit={handleSubmit}
    >
      <Box useFull vAlign='start' justifyContent='center'>
        {cardData.p02.isPuzzleFinished && !cardData.p02.isSubmitted && <Canvas />}
        <Puzzle
          ariaLabel='임시 텍스트'
          initPuzzle={initPuzzle}
          rowNum={4}
          colNum={3}
          backgroudImgUrl={backgroundImgUrl}
          imgUrls={imgUrls}
          imgAlts={imgAlts}
          eqNums={[
            ['324', '+115'],
            ['483', '+456'],
            ['229', '+683'],
            ['435', '+435'],
            ['742', '+266'],
            ['379', '+664'],
            ['475', '-321'],
            ['553', '-162'],
            ['741', '-214'],
            ['631', '-237'],
            ['901', '-353'],
            ['552', '-214'],
          ]}
          tgtNums={[6, 11, 7, 9, 0, 8, 10, 3, 2, 1, 4, 5]}
          onFinish={handlePuzzleComplete}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='12px'>{answer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
