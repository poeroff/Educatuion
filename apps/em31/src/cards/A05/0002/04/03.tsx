import roundedMicrophone from '@/assets/icon/rounded_microphone.svg';
import roundedPen from '@/assets/icon/rounded_pen.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0002_04 } from './store';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A05_0002_04);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '1 cm보다 작은 단위 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />1 mm를 쓰고 읽어 보세요.
      </>
    ),
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p03.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
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

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p03.answer[0] === cardData.p03.solution[0];
    const isCorrect2 = cardData.p03.answer[1] === cardData.p03.solution[0];
    const isCorrect3 = cardData.p03.answer[2] === cardData.p03.solution[1];

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3,
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
            value: cardData.p03.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.answer[2],
            isCorrect: isCorrect3,
          },
        ],
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3,
      },
    ];

    submitDataWithResult('P03', userSubmission, isCorrect1 && isCorrect2 && isCorrect3);
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
            answer:
              [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value, userSubmissionList[0].inputData[2]?.value] ||
              cardData.p03.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p03.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: answerList } }));
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '예시 닫기' : '예시 답안') : '완료하기'}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap alignItems='center' position='relative'>
        <Box>
          <SvgIcon type={ESvgType.IMG} src={roundedPen} width='52px' height='22px' alt='쓰기' />
        </Box>

        <Box position='absolute' left='77px' zIndex='1' top='16px'>
          <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='400px' />
        </Box>
        <Box position='absolute' left='77px' zIndex='1' top='25px'>
          <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='400px' />
        </Box>
        <Box position='absolute' left='77px' zIndex='1' top='44px'>
          <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='400px' />
        </Box>

        <Box marginTop='1px'>
          <Typography useGap={false} fontSize='var(--font-size-36)' lineHeight='40px' weight={'var(--font-weight-bold)'}>
            1 mm
          </Typography>
        </Box>
        <Input
          ariaLabel='1미리미터를 따라 쓰는 칸'
          placeholder='1 mm'
          width='138px'
          inputSize='large'
          marginLeft={24}
          readOnly={cardData.p03.isSubmitted}
          value={cardData.p03.answer[0]}
          onChange={e => handleChange(1, e.target.value)}
        />
        <Input
          ariaLabel='1미리미터를 따라 쓰는 칸'
          width='138px'
          inputSize='large'
          marginLeft={24}
          readOnly={cardData.p03.isSubmitted}
          value={cardData.p03.answer[1]}
          onChange={e => handleChange(2, e.target.value)}
        />
      </BoxWrap>

      <Box vAlign='center' marginTop='24px'>
        <SvgIcon type={ESvgType.IMG} src={roundedMicrophone} width='52px' height='22px' alt='읽기' />
        <Input
          ariaLabel='1미리미터를 읽는 발음대로 쓰는 칸'
          width='303px'
          inputSize='large'
          marginLeft={24}
          readOnly={cardData.p03.isSubmitted}
          value={cardData.p03.answer[2]}
          onChange={e => handleChange(3, e.target.value)}
        />
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
          <Box position='relative' marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='30px' gap={'20px'}>
              <BoxWrap alignItems='center' position='relative'>
                <Box>
                  <SvgIcon type={ESvgType.IMG} src={roundedPen} width='52px' height='22px' alt='쓰기' />
                </Box>

                <Box position='absolute' left='77px' zIndex='1' top='0px'>
                  <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='340px' />
                </Box>
                <Box position='absolute' left='77px' zIndex='1' top='10px'>
                  <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='340px' />
                </Box>
                <Box position='absolute' left='77px' zIndex='1' top='30px'>
                  <Box borderBottom='0.5px dashed var(--color-blue-500)' height='0.5px' width='340px' />
                </Box>

                <Box marginTop='1px'>
                  <Typography useGap={false} fontSize='var(--font-size-36)' lineHeight='40px' weight={'var(--font-weight-bold)'}>
                    1 mm
                  </Typography>
                </Box>
                <Box marginTop='1px'>
                  <Typography useGap={false} fontSize='var(--font-size-36)' color='skyblue' lineHeight='40px' weight={'var(--font-weight-bold)'}>
                    1 mm
                  </Typography>
                </Box>
                <Box marginTop='1px'>
                  <Typography useGap={false} fontSize='var(--font-size-36)' color='skyblue' lineHeight='40px' weight={'var(--font-weight-bold)'}>
                    1 mm
                  </Typography>
                </Box>
              </BoxWrap>
              <BoxWrap alignItems='center' position='relative'>
                <SvgIcon style={{ verticalAlign: 'text-top' }} type={ESvgType.IMG} src={roundedMicrophone} width='52px' height='22px' alt='읽기' />
                <Box marginLeft={25}>
                  <Typography useGap={false} fontSize='var(--font-size-36)' lineHeight='40px' weight={'var(--font-weight-bold)'}>
                    1 밀리미터
                  </Typography>
                </Box>
              </BoxWrap>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
