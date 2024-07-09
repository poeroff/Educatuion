//C-EM31-03-0005-2002
import {
  BottomSheet,
  Box,
  Button,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Label,
  List,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { A03_0005_08 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';

const P06 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A03_0005_08);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [radio, setRadio] = useState<number>(parseInt(cardData.p06.answer));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        21÷3의 몫을 구하는 데 이용할 수 있는 곱셈식을 찾아 선택해 보세요.
      </>
    ),
    mark: getMarking(cardData.p06.isSubmitted, cardData.p06.isCorrect),
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
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    if (isNotEmptyString(cardData.p06.answer)) {
      return false;
    } else {
      return true;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p06.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p06.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };
  const handleSubmit = () => {
    if (cardData.p06.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p06.answer[0] === cardData.p06.solution[0];

    const isAllCorrect = isCorrect1;

    setCardData(prev => ({
      ...prev,
      p06: {
        ...prev.p06,
        isCorrect: isAllCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p06.answer[0],
            isCorrect: isCorrect1,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P06', userSubmission, isAllCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value.toString(),
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
        setRadio(parseInt(userSubmissionList[0].inputData[0]?.value));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleClick = (index: number) => {
    if (cardData.p06.isSubmitted) return;
    setRadio(index);
    setCardData(prev => ({
      ...prev,
      p06: {
        ...prev.p06,
        answer: index.toString(),
        isCorrect: index.toString() === cardData.p06.solution,
      },
    }));
    changeData('P06', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P06');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      bodyId='targetContainer6'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      vAlign='flex-start'
    >
      <Box useFull position='relative'>
        {cardData.p06.isSubmitted && radio === 0 && (
          <Box background='red' position='absolute' useRound height={160} width={180} marginLeft={100} opacity={0.4}></Box>
        )}
        {cardData.p06.isSubmitted && radio === 1 && (
          <Box background='red' position='absolute' useRound height={160} width={180} marginLeft={290} opacity={0.4}></Box>
        )}
        {cardData.p06.isSubmitted && radio === 2 && (
          <Box background='red' position='absolute' useRound height={160} width={180} marginLeft={470} opacity={0.4}></Box>
        )}
        <Box position='absolute' top='50px' left='120px'>
          <List
            gap={40}
            data={['3×2=6', '9×3=27', '3×7=21']}
            align='horizontal'
            row={({ value, index = 1 }) => (
              <Box vAlign='center' justifyContent='center' key={index}>
                <Button color={EStyleButtonTypes.NORMAL} onClick={() => handleClick(index - 1)}>
                  {index - 1 === radio ? (
                    <Image src={'/C03/0005/20/EC31313_2.png'} width='120px' height='100px' alt='색칠된 잠수함 이미지' />
                  ) : (
                    <Image src={'/C03/0005/20/EC31313_1.png'} width='120px' height='100px' alt='잠수함 이미지' />
                  )}
                  <Box position='absolute' top='25px' marginLeft={10}>
                    <Typography>{value}</Typography>
                  </Box>
                </Button>
              </Box>
            )}
          />
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer6'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>3×7=21에 색칠</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>21÷3의 몫은 3×7=21을 이용하여 구할 수 있습니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P06;
