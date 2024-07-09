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
import { A05_0001_03 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05_0001_03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />이 단원을 공부하는 나의 마음가짐을 표현해 보세요.
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
          value: {
            userAnswer: cardData.p02.data[0].userAnswer,
            inputStatus: cardData.p02.data[0].inputStatus,
            contents: cardData.p02.data[0].contents,
          },
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: {
            userAnswer: cardData.p02.data[1].userAnswer,
            inputStatus: cardData.p02.data[1].inputStatus,
            contents: cardData.p02.data[1].contents,
          },
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: {
            userAnswer: cardData.p02.data[2].userAnswer,
            inputStatus: cardData.p02.data[2].inputStatus,
            contents: cardData.p02.data[2].contents,
          },
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: {
            userAnswer: cardData.p02.data[3].userAnswer,
            inputStatus: cardData.p02.data[3].inputStatus,
            contents: cardData.p02.data[3].contents,
          },
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
              type: 'TEXT',
              value: {
                userAnswer: cardData.p02.data[0].userAnswer,
                inputStatus: cardData.p02.data[0].inputStatus,
                contents: cardData.p02.data[0].contents,
              },
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: {
                userAnswer: cardData.p02.data[1].userAnswer,
                inputStatus: cardData.p02.data[1].inputStatus,
                contents: cardData.p02.data[1].contents,
              },
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: {
                userAnswer: cardData.p02.data[2].userAnswer,
                inputStatus: cardData.p02.data[2].inputStatus,
                contents: cardData.p02.data[2].contents,
              },
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: {
                userAnswer: cardData.p02.data[3].userAnswer,
                inputStatus: cardData.p02.data[3].inputStatus,
                contents: cardData.p02.data[3].contents,
              },
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    if (!cardData.p02.isSubmitted) {
      const updatedAnswers = cardData.p02.data.map((item, idx) => (idx === 3 ? { ...item, [name]: value } : { ...item }));
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          data: updatedAnswers,
        },
      }));
      changeData('P02', 1, 4, updatedAnswers[3]);
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
      updatedAnswers.map((item, index) => changeData('P02', 1, index + 1, item));
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
                inputStatus:
                  userSubmissionList[0].inputData[index]?.value.inputStatus !== false
                    ? userSubmissionList[0].inputData[index]?.value.inputStatus
                    : cardData.p02.data[index].inputStatus,
                userAnswer:
                  userSubmissionList[0].inputData[index]?.value.userAnswer !== 0
                    ? userSubmissionList[0].inputData[index]?.value.userAnswer
                    : cardData.p02.data[index].userAnswer,
                contents: index === 3 ? userSubmissionList[0].inputData[3]?.value.contents : item.contents,
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

  const checkIsInputFilled = (contents: string) => {
    if (contents === '') {
      return true;
    }
    return false;
  };

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
                <Typography>{index !== 4 && value?.contents}</Typography>
                {index === 4 && (
                  <Box marginLeft={8}>
                    <Input
                      placeholder='내용을 넣어 주세요.'
                      width='625px'
                      onChange={e => handleInputChange('contents', e.target.value)}
                      value={value?.contents}
                      ariaLabel='이 단원에서 공부할 내용을 입력해주세요.'
                      maxLength={33}
                      readOnly={cardData.p02.isSubmitted || !cardData.p02.data[3].inputStatus}
                    />
                  </Box>
                )}
              </Box>
              <Box vAlign='center'>
                <Rating
                  onChange={score => handleChange(index as number, 'userAnswer', score)}
                  disabled={!value?.inputStatus || checkIsInputFilled(value?.contents)}
                  score={value?.userAnswer}
                  readOnly={cardData.p02.isSubmitted}
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
