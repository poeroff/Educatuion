import headerIcon from '@/assets/icon/m_default_01.svg';
import {
  TMainHeaderInfoTypes,
  Box,
  Input,
  InputStatus,
  Label,
  Typography,
  BottomSheet,
  IQuestionProps,
  Tag,
  ETagLine,
  SvgIcon,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04000105_store } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P09 = () => {
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
        고구마가 한 봉지에 9개씩 들어 있습니다. 5봉지에 들어 있는 고구마 는 모두 몇 개인가요?
      </>
    ),
    mark: getMarking(cardData.P09.isSubmitted, cardData.P09.isCorrect),
  };

  const handleInputChange = (index: string, val: string) => {
    setCardData(prev => ({ ...prev, P09: { ...prev.P09, [`answer${index}`]: val } }));
    changeData('P09', 1, Number(index), val);
  };

  const setSubmitBtnColor = () => {
    if (cardData.P09.answer1 !== '' && cardData.P09.answer2 !== '') {
      if (isShow && cardData.P09.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (isNotEmptyString(cardData.P09.answer1) && isNotEmptyString(cardData.P09.answer2)) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.P09.solution1.includes(cardData.P09.answer1.replace(/(\s*)/g, ''));
    const isCorrect2 = cardData.P09.answer2 === cardData.P09.solution2;
    const isCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({ ...prev, P09: { ...prev.P09, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.P09.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.P09.answer2,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P09', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P09')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P09: {
            ...prev.P09,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P09.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P09.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P09', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P09');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.P09.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.P09.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='text'
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.P09.answer1}
              onChange={e => handleInputChange('1', e.target.value)}
              ariaLabel='식을 적어주세요.'
              status={
                !isNotEmptyString(cardData.P09.answer1)
                  ? InputStatus.DEFAULT
                  : cardData.P09.isSubmitted && !isAnswer(cardData.P09.answer1.replace(/(\s*)/g, ''), cardData.P09.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.P09.isSubmitted}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.P09.answer2}
              onChange={e => handleInputChange('2', e.target.value)}
              ariaLabel='답을 적어주세요.'
              status={
                !isNotEmptyString(cardData.P09.answer2)
                  ? InputStatus.DEFAULT
                  : cardData.P09.isSubmitted && !isAnswer(cardData.P09.answer2, cardData.P09.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.P09.isSubmitted}
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='40%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px'>
              <Typography>9×5=45 또는 5×9=45, 45</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>9개씩 5봉지에 들어 있는 고구마는 모두 9×5=45(개)입니다.</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='10px'>
              <Typography>(한 봉지에 들어 있는 고구마 수)×(봉지 수)를 계산해요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P09;
