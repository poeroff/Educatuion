import headerIcon from '@/assets/icon/m_default_01.svg';
import {
  TMainHeaderInfoTypes,
  Box,
  Image,
  BottomSheet,
  IQuestionProps,
  Tag,
  ETagLine,
  SvgIcon,
  EStyleButtonTypes,
  Typography,
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04000105_store } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import arrow from '@maidt-cntn/assets/icons/arrow-icon.svg';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P07 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000105_store);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

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
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'BOOLEAN',
          value: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        나뭇잎은 모두 몇 장인지 곱셈식으로 나타내 보세요.
      </>
    ),
    mark: getMarking(cardData.P07.isSubmitted, cardData.P07.isCorrect),
  };

  const handleInputChange = (index: number, val: string) => {
    setCardData(prev => ({ ...prev, P07: { ...prev.P07, [`answer${index}`]: val } }));
    changeData('P07', 1, index, val);
  };

  const setSubmitBtnColor = () => {
    if (
      isNotEmptyString(cardData.P07.answer1) &&
      isNotEmptyString(cardData.P07.answer2) &&
      isNotEmptyString(cardData.P07.answer3) &&
      isNotEmptyString(cardData.P07.answer4)
    ) {
      if (isShow && cardData.P07.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (
      isNotEmptyString(cardData.P07.answer1) &&
      isNotEmptyString(cardData.P07.answer2) &&
      isNotEmptyString(cardData.P07.answer3) &&
      isNotEmptyString(cardData.P07.answer4)
    )
      return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.P07.answer1 === cardData.P07.solution1;
    const isCorrect2 =
      cardData.P07.answer2 === cardData.P07.answer3
        ? false
        : cardData.P07.answer2 === cardData.P07.solution2 || cardData.P07.answer2 === cardData.P07.solution3;
    const isCorrect3 =
      cardData.P07.answer2 === cardData.P07.answer3
        ? false
        : cardData.P07.answer3 === cardData.P07.solution2 || cardData.P07.answer3 === cardData.P07.solution3;
    const isCorrect4 = cardData.P07.answer4 === cardData.P07.solution4;
    const partCorrect = isCorrect2 && isCorrect3 && isCorrect4;
    const isCorrect = isCorrect1 && partCorrect;

    setCardData(prev => ({ ...prev, P07: { ...prev.P07, partCorrect: partCorrect } }));
    changeData('P07', 1, 5, partCorrect);

    setCardData(prev => ({ ...prev, P07: { ...prev.P07, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.P07.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.P07.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.P07.answer3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.P07.answer4,
          },
          {
            subKey: 5,
            type: 'BOOLEAN',
            value: partCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P07', userSubmission, isCorrect);
    console.log(userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P07')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P07: {
            ...prev.P07,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P07.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P07.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.P07.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.P07.answer4,
            partCorrect: userSubmissionList[0].inputData[4]?.value || cardData.P07.partCorrect,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P07', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
    <DialogContainer
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.P07.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.P07.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/C04/0001/11/DEC314001.png' alt='나뭇잎이 7장씩 있는 줄기 4개가 그려진 그림입니다.' width='620px' height='150px' />
        </Box>
        <Box marginTop='24px' hAlign='center'>
          <Typography>
            7장 씩{' '}
            <Input
              type='number'
              value={cardData.P07.answer1}
              status={
                !isNotEmptyString(cardData.P07.answer1)
                  ? InputStatus.DEFAULT
                  : cardData.P07.isSubmitted && !isAnswer(cardData.P07.answer1, cardData.P07.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleInputChange(1, e.target.value)}
              ariaLabel='7장 씩 몇 묶음인지에 대한 답란'
              maxLength={2}
              width='60px'
              readOnly={cardData.P07.isSubmitted}
            />{' '}
            묶음
          </Typography>
          <SvgIcon size='38px' src={arrow} />{' '}
          <Typography>
            <Input
              type='number'
              value={cardData.P07.answer2}
              status={
                !isNotEmptyString(cardData.P07.answer2)
                  ? InputStatus.DEFAULT
                  : cardData.P07.isSubmitted && !cardData.P07.partCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleInputChange(2, e.target.value)}
              ariaLabel='첫 번째 답란'
              maxLength={2}
              width='60px'
              readOnly={cardData.P07.isSubmitted}
            />{' '}
            ×{' '}
            <Input
              type='number'
              value={cardData.P07.answer3}
              status={
                !isNotEmptyString(cardData.P07.answer3)
                  ? InputStatus.DEFAULT
                  : cardData.P07.isSubmitted && !cardData.P07.partCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleInputChange(3, e.target.value)}
              ariaLabel='두 번째 답란'
              maxLength={2}
              width='60px'
              readOnly={cardData.P07.isSubmitted}
            />{' '}
            ={' '}
            <Input
              type='number'
              value={cardData.P07.answer4}
              status={
                !isNotEmptyString(cardData.P07.answer4)
                  ? InputStatus.DEFAULT
                  : cardData.P07.isSubmitted && !cardData.P07.partCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              onChange={e => handleInputChange(4, e.target.value)}
              ariaLabel='첫 번째와 두 번째 답란을 곱한 값'
              maxLength={3}
              width='100px'
              readOnly={cardData.P07.isSubmitted}
            />
          </Typography>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='40%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px'>
              <Typography>4, 7, 4, 28</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>7장씩 4묶음을 7×4로 나타낼 수 있습니다.</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>나뭇잎이 7장씩 몇 묶음 있는지 살펴봐요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P07;
