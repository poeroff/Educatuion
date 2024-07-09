import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000103State from './store';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000103State);

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

  const isInputComplete = useMemo(
    () => cardData.p02.checkList.some(Boolean) && cardData.p02.checkList.every((value, index) => !value || cardData.p02.ratingList[index] > 0),
    [cardData.p02.checkList, cardData.p02.ratingList],
  );

  const handleCheckClick = (index: number) => {
    const newCheckList = [...cardData.p02.checkList];
    newCheckList[index] = Number(!newCheckList[index]);

    const newRatingList = [...cardData.p02.ratingList];
    newRatingList[index] = 0;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        checkList: newCheckList,
        ratingList: newRatingList,
        input: index === 3 ? '' : prev.p02.input,
      },
    }));
    changeData('P02', 1, 1, newCheckList);
    changeData('P02', 1, 2, newRatingList);
    if (index === 3) {
      changeData('P02', 1, 3, '');
    }
  };

  const handleRatingChange = (index: number, idx: number) => {
    const newRatingList = [...cardData.p02.ratingList];
    newRatingList[index - 1] = idx;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        ratingList: newRatingList,
      },
    }));
    changeData('P02', 1, 2, newRatingList);
  };

  const handleInputChange = (value: string) => {
    const newRatingList = [...cardData.p02.ratingList];
    newRatingList[3] = 0;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        input: value,
        ratingList: value.trim() ? prev.p02.ratingList : newRatingList,
      },
    }));
    changeData('P02', 1, 3, value);
    if (!value.trim()) {
      changeData('P02', 1, 2, newRatingList);
    }
  };

  const data = [
    {
      text: '수학 공부를 열심히 할 거예요.',
    },
    {
      text: '수업시간에 발표를 많이 할 거예요.',
    },
    {
      text: '친구들의 이야기를 잘 들어 줄 거예요.',
    },
    {
      text: '',
      content: (
        <Input
          maxLength={99}
          placeholder='내용을 넣어 주세요.'
          width='625px'
          value={cardData.p02.input}
          onChange={e => handleInputChange(e.target.value)}
          ariaLabel='이 단원에서 공부할 내용을 입력해주세요.'
          disabled={cardData.p02.checkList[3] === 0}
          readOnly={cardData.p02.isSubmitted}
        />
      ),
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [0, 0, 0, 0],
        },
        {
          subKey: 2,
          type: 'NUMBER_LIST',
          value: [0, 0, 0, 0],
        },
        {
          subKey: 3,
          type: 'TEXT',
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
            checkList: userSubmissionList[0].inputData[0]?.value || cardData.p02.checkList,
            ratingList: userSubmissionList[0].inputData[1]?.value || cardData.p02.ratingList,
            input: userSubmissionList[0].inputData[2]?.value || cardData.p02.input,
            isSubmitted,
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

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, input: prev.p02.input.trim(), isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p02.checkList,
          },
          {
            subKey: 2,
            type: 'NUMBER_LIST',
            value: cardData.p02.ratingList,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.input.trim(),
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={!cardData.p02.isSubmitted && isInputComplete ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p02.isSubmitted || !isInputComplete}
      useRound
    >
      <Box useFull>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Box display='flex' justifyContent='space-between' key={index}>
              <Box display='flex' vAlign='flex-start'>
                <Box marginRight={10} marginTop={6}>
                  <ChipButton
                    type='button'
                    isActive={cardData.p02.checkList[index - 1] === 1}
                    status={EChipButtonType.CHECK}
                    size='32px'
                    onClick={() => handleCheckClick(index - 1)}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </Box>
                <Typography>{value?.text}</Typography>
                {value?.content}
              </Box>
              <Box vAlign='center'>
                <Rating
                  score={cardData.p02.ratingList[(index ?? 0) - 1]}
                  onChange={idx => {
                    handleRatingChange(index, idx);
                  }}
                  readOnly={cardData.p02.isSubmitted}
                  disabled={cardData.p02.checkList[index - 1] === 0 || (index === 4 && !cardData.p02.input.trim())}
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
