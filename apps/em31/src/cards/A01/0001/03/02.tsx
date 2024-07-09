import {
  Box,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  IQuestionProps,
  Input,
  List,
  Rating,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A01_0001_03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0001_03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />이 단원에서 공부할 내용을 살펴보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.data[0].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: cardData.p02.data[1].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'NUMBER',
              value: cardData.p02.data[2].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 4,
              type: 'NUMBER',
              value: cardData.p02.data[3].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p02.data[3].contents,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    if (!cardData.p02.isSubmitted) {
      const updatedAnswers = cardData.p02.data.map((item, idx) => (idx === 3 ? { ...item, [name]: truncateToMaxBytes(value) } : { ...item }));
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          data: updatedAnswers,
        },
      }));
      changeData('P02', 1, 5, updatedAnswers[3]);
    }
  };

  const handleChange = (index: number, name: string, value: number | boolean) => {
    if (!cardData.p02.isSubmitted) {
      let isResetAnswer = false;
      if (cardData.p02.data[index - 1].inputStatus && !value && name === 'inputStatus') isResetAnswer = true;
      const updatedAnswers = cardData.p02.data.map((item, idx) =>
        idx === index - 1
          ? isResetAnswer
            ? index === 4
              ? { ...item, [name]: value, userAnswer: 0, contents: '' }
              : { ...item, [name]: value, userAnswer: 0 }
            : { ...item, [name]: value }
          : { ...item },
      );
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          data: updatedAnswers,
        },
      }));
      updatedAnswers.map((item, index) => changeData('P02', 1, index, item));
    }
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
            data: prev.p02.data.map((item, index) => {
              return {
                ...item,
                contents: index === 3 ? userSubmissionList[0].inputData[4]?.value : item.contents,
                inputStatus: userSubmissionList[0].inputData[index]?.value ? true : false,
                userAnswer: userSubmissionList[0].inputData[index]?.value || cardData.p02.data[index].userAnswer,
              };
            }),
            isSubmitted: isSubmitted,
          },
        }));
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

  const submitDisabled = () => {
    const updatedDisabledList = cardData.p02.data.map(val =>
      val.inputStatus ? (val.userAnswer === 0 || !isNotEmptyString(val.contents) ? undefined : false) : true,
    );
    return updatedDisabledList.includes(undefined) || updatedDisabledList.every(val => val);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitDisabled={submitDisabled() || cardData.p02.isSubmitted}
      submitBtnColor={submitDisabled() || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
      submitLabel='완료하기'
      onSubmit={onSubmit}
      useRound
    >
      <Box useFull>
        <List gap={24} data={cardData.p02.data}>
          {({ value, index }) => (
            <Box display='flex' justifyContent='space-between' key={index}>
              <Box display='flex' vAlign='center'>
                <Box marginRight={10} vAlign='center'>
                  <ChipButton
                    type='button'
                    status={EChipButtonType.CHECK}
                    isActive={value?.inputStatus}
                    size='32px'
                    onClick={() => handleChange(index as number, 'inputStatus', !value?.inputStatus as boolean)}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </Box>
                {index !== 4 && <Typography>{value?.contents}</Typography>}
                {index === 4 && (
                  <Input
                    placeholder='내용을 넣어 주세요.'
                    width='625px'
                    onChange={e => handleInputChange('contents', e.target.value)}
                    value={value?.contents}
                    ariaLabel='이 단원에서 공부할 내용을 입력해주세요.'
                    maxLength={2000}
                    readOnly={cardData.p02.isSubmitted || !cardData.p02.data[3].inputStatus}
                    textAlign='left'
                  />
                )}
              </Box>
              <Box vAlign='center'>
                <Rating
                  onChange={score => handleChange(index as number, 'userAnswer', score)}
                  disabled={!value?.inputStatus || (!isNotEmptyString(value?.contents as string) ? true : false)}
                  readOnly={cardData.p02.isSubmitted}
                  score={value?.userAnswer}
                />
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P02;
