import { Box, Checkbox, EStyleButtonTypes, Image, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L02C05A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IData {
  text: string;
  state: boolean;
}

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Check if you have experienced the following online situations',
  };

  const [list, setList] = useState<IData[]>([
    {
      text: 'I rushed to buy things after seeing a “last chance” message.',
      state: false,
    },
    {
      text: 'I couldn’t find the button to cancel my membership or subscription.',
      state: false,
    },
    {
      text: 'The actual price was different from what I saw on price-comparison sites.',
      state: false,
    },
    {
      text: 'Some item were being sold at the same price even after the promotional period had ended.',
      state: false,
    },
  ]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
        },
      ],
    },
  ];

  const onSubmit = () => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData[pageKey].answer1,
          },
        ],
      },
    ];
    submitData(pageNumber, userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer1,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isSelected = useMemo(() => {
    return cardData[pageKey].answer1!.length > 0;
  }, [cardData[pageKey].answer1]);

  const handleRowClick = (index: number) => {
    if (cardData[pageKey].isSubmitted) return;

    setList(data => data?.map((val, idx) => (idx === index ? { ...val, state: !val.state } : val)));

    let newNumberList = [...cardData[pageKey].answer1!];
    if (newNumberList.includes(index)) {
      newNumberList = newNumberList.filter(num => num !== index);
    } else {
      newNumberList = [...newNumberList, index].sort();
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer1: newNumberList } }));
    changeData(pageNumber, 1, 1, newNumberList);
  };

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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitBtnColor={cardData[pageKey].isSubmitted ? EStyleButtonTypes.GRAY : isSelected ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isSelected || cardData[pageKey].isSubmitted}
      submitLabel='완료하기'
      onSubmit={onSubmit}
    >
      <Box background='gray' border='none' padding='4px 12px' hAlign='center'>
        <Typography weight='var(--font-weight-bold)'>My Experience with Online Shopping</Typography>
      </Box>
      <Box marginTop='20px'>
        <Box vAlign='flex-end' position='relative'>
          <Box width='100%'>
            <List data={list}>
              {({ value, index = 1 }) => (
                <ListItem
                  width={index > 2 ? 'calc(100% - 276px)' : '100%'}
                  isEven={index % 2 === 0}
                  isActive={cardData[pageKey].answer1!.includes(index)}
                  isSelected={isSelected}
                >
                  <Checkbox
                    type={'check'}
                    label={value?.text}
                    value={cardData[pageKey].answer1!.includes(index)}
                    onClick={val => handleRowClick(index)}
                    readOnly={cardData[pageKey].isSubmitted}
                  />
                </ListItem>
              )}
            </List>
          </Box>
          <BackgroundImage>
            <Image width='236px' height='186px' src={'/L02/C05/A02/HE2-L02-C05-A02.jpg'} alt='핸드폰으로 온라인 쇼핑을 하는 여자' />
          </BackgroundImage>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: 0;
`;

export const ListItem = styled.div<{ isEven?: boolean; isActive?: boolean; isSelected?: boolean; width?: string }>`
  padding: 6px 12px;
  border-radius: 8px;

  ${({ isEven }) =>
    !isEven &&
    `
    background: #F4F8FF;
  `};
  width: ${({ width }) => width};
  ${({ isActive }) =>
    isActive
      ? `
    background: #1E6EFA;
    color: #fff;
  `
      : `

  `}
`;
