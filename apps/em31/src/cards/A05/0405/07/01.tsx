import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  Scroll,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A05040507_store } from './store';

const P01 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05040507_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const pageKey = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        길이의 단위에는 mm, cm, m, km등이 있습니다. <br />
        <Box display='inline-flex' alignItems='center'>
          <SvgIcon alt='부등호' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 길이의 단위를 써넣으세요.
        </Box>
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P01: {
            ...prev.P01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P01.answer,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const currentAnswer = Array.isArray(cardData.P01.answer) ? cardData.P01.answer : [];
    const newData = [...currentAnswer];
    newData[index] = value;
    setCardData(prev => ({ ...prev, P01: { ...prev.P01, answer: newData } }));
    changeData(pageKey, 1, 1, newData);
  };

  const handleSubmit = () => {
    if (!cardData.P01.isSubmitted) {
      setCardData(prev => ({ ...prev, P01: { ...prev.P01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P01.answer,
            },
          ],
        },
      ];
      submitData(pageKey, userSubmission);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.P01.isSubmitted) {
      return !cardData.P01.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P01.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');
  const isSubmitDisabled = () => !cardData.P01.answer?.every(val => val) && !cardData.P01.isSubmitted;

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      useRound
      vAlign='flex-start'
      background={'var(--color-white)'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
    >
      <Scroll tabIndex={0}>
        <Box minHeight='685px' position='relative'>
          <Box width='400px' height='308px' position='absolute' top='46px' left='7px'>
            <Image src='/A05/0405/07/A-EM31-050405-0701_3.png' alt='신발 길이 : 약 215단위' size='100%' />
            <Box vAlign='center' transform='rotate(-0.9deg)' position='absolute' bottom='42px' left='58px'>
              <TextWrapper backroundcolor='var(--color-green-100)' borderColor='var(--color-green-700)'>
                신발
              </TextWrapper>
              <Box display='flex' marginLeft='8px'>
                <Typography>약 215</Typography>
                <Input
                  ariaLabel='신발 길이 단위 입력란'
                  width='98px'
                  value={cardData.P01.answer[0]}
                  onChange={e => {
                    handleInputChange(0, e.target.value);
                  }}
                  readOnly={cardData.P01.isSubmitted}
                  title='신발 길이 단위 적기'
                />
              </Box>
            </Box>
          </Box>
          <Box width='489px' height='436px' position='absolute' right='20px'>
            <Image src='/A05/0405/07/A-EM31-050405-0701_1.png' alt='공원 둘레길 길이 : 약 3 단위' size='100%' />
            <Box vAlign='center' transform='rotate(3deg)' position='absolute' bottom='60px' left='62px'>
              <TextWrapper backroundcolor='var(--color-pink-100)' borderColor='var(--color-pink-700)'>
                공원 둘레길
              </TextWrapper>
              <Box display='flex' marginLeft='8px'>
                <Typography>약 3</Typography>
                <Input
                  ariaLabel='공원둘레길 길이 단위 적기'
                  width='98px'
                  value={cardData.P01.answer[1]}
                  onChange={e => {
                    handleInputChange(1, e.target.value);
                  }}
                  readOnly={cardData.P01.isSubmitted}
                  title='공원둘레길 길이 단위 적기'
                />
              </Box>
            </Box>
          </Box>
          <Box width='476px' height='345px' position='absolute' bottom='0' left='10px'>
            <Image src='/A05/0405/07/A-EM31-050405-0701_4.png' alt='현관문 길이 : 약 2 단위' size='100%' />
            <Box
              width='169px'
              vAlign='center'
              flexDirection='column'
              transform='rotate(-0.8deg) translateY(-50%)'
              position='absolute'
              top='50%'
              left='24px'
            >
              <TextWrapper backroundcolor='var(--color-purple-100)' borderColor='var(--color-purple-700)'>
                현관문
              </TextWrapper>
              <Box marginTop='8px'>
                <Typography>약 2</Typography>
                <Input
                  ariaLabel='현관문 길이 단위 적기'
                  width='98px'
                  value={cardData.P01.answer[2]}
                  onChange={e => {
                    handleInputChange(2, e.target.value);
                  }}
                  readOnly={cardData.P01.isSubmitted}
                  title='현관문 길이 단위 적기'
                />
              </Box>
            </Box>
          </Box>
          <Box width='323px' height='191px' position='absolute' bottom='38px' right='88px'>
            <Image src='/A05/0405/07/A-EM31-050405-0701_2.png' alt='칫솔 길이 : 약 18 단위' size='100%' />
            <Box vAlign='center' transform='rotate(-0.8deg)' position='absolute' bottom='30px' left='16px'>
              <TextWrapper backroundcolor='var(--color-yellow-100)' borderColor='var(--color-yellow-700)'>
                칫솔
              </TextWrapper>
              <Typography>약 18</Typography>
              <Input
                ariaLabel='칫솔 길이 단위 적기'
                width='98px'
                value={cardData.P01.answer[3]}
                onChange={e => {
                  handleInputChange(3, e.target.value);
                }}
                readOnly={cardData.P01.isSubmitted}
                title='칫솔 길이 단위 적기'
              />
            </Box>
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isAnswerOpen} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='60px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>mm, km, m, cm</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>신발은 약 215 mm, 공원 둘레길은 약 3 km, 현관문은 약 2 m, 칫솔 약 18 cm입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const TextWrapper = styled.div<{ backroundcolor: string; borderColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
  padding: 0 19px;

  border-radius: 22px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ backroundcolor }) => backroundcolor};

  white-space: nowrap;
  font-size: 22px;
  line-height: 33px;
  color: var(--color-yellow-800);
`;

export default P01;
