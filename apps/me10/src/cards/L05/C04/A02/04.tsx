import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, Label, List, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C04A02 } from './store';

const P04 = () => {
  const pageNumber = 'P04';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C04A02);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            userInput1: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput1,
            userInput2: userSubmissionList[0].inputData[1]?.value || cardData[pageNumber].userInput2,
            userInput3: userSubmissionList[0].inputData[2]?.value || cardData[pageNumber].userInput3,
            userInput4: userSubmissionList[0].inputData[3]?.value || cardData[pageNumber].userInput4,
            userInput5: userSubmissionList[0].inputData[4]?.value || cardData[pageNumber].userInput5,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].userInput1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageNumber].userInput2,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const isSubmittable = isNotEmptyString(cardData[pageNumber].userInput1 || '') && isNotEmptyString(cardData[pageNumber].userInput2 || '');

  const handleChangeValue = (value: string, subKey: number) => {
    if (subKey === 0) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput1: value } }));
    } else if (subKey === 1) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput2: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput3: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput4: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput5: value } }));
    }
    changeData(pageNumber, 1, 1 + subKey, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Green Volunteers',
  };

  const questionInfo = {
    text: 'Self-Check',
  };

  const list = [
    {
      question: '자신의 계획을 말하고 친구들에게 함께하자고 제안할 수 있나요?',
    },
    {
      question: '친구들이 제안을 받아들일 수 있도록 설득력 있게 말할 수 있나요?',
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={'완료하기'}
      submitDisabled={!isSubmittable || cardData[pageNumber].isSubmitted}
      submitBtnColor={
        !cardData[pageNumber].isSubmitted ? (!isSubmittable ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
    >
      <Box useFull vAlign='center'>
        <List data={list} gap={20}>
          {({ value, index = 1 }) => (
            <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' boxGap={8} useFull>
              <Box width='40px'>
                <Label type='paint' background='var(--color-black)' size='xxx-small' />
              </Box>
              <Box width='100%'>
                <BoxWrap
                  alignItems='start'
                  justifyContent='space-between'
                  paddingBottom='20px'
                  boxGap={8}
                  borderBottom={(index === 4 && '0') || '1px dotted var(--color-grey-200)'}
                >
                  <Box width='75%'>{value?.question}</Box>
                  <Box width='20%'>
                    <BoxWrap>
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.GOOD}
                        isActive={(index === 1 ? cardData[pageNumber].userInput1 : cardData[pageNumber].userInput2) === EChipButtonType.GOOD}
                        size={'38px'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                          handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                        }
                        ariaLabel='good 버튼'
                        readOnly={cardData[pageNumber].isSubmitted}
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.NOT_GOOD}
                        isActive={(index === 1 ? cardData[pageNumber].userInput1 : cardData[pageNumber].userInput2) === EChipButtonType.NOT_GOOD}
                        size={'38px'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                          handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                        }
                        ariaLabel='not good 버튼'
                        readOnly={cardData[pageNumber].isSubmitted}
                      />
                      <ChipButton
                        type='radio'
                        name={`chip-radio-${index}`}
                        status={EChipButtonType.BAD}
                        isActive={(index === 1 ? cardData[pageNumber].userInput1 : cardData[pageNumber].userInput2) === EChipButtonType.BAD}
                        size={'38px'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) =>
                          handleChangeValue((e.target as HTMLInputElement).value, index - 1)
                        }
                        ariaLabel='bad 버튼'
                        readOnly={cardData[pageNumber].isSubmitted}
                      />
                    </BoxWrap>
                  </Box>
                </BoxWrap>
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P04;
