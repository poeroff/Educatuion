import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Image, Radio, TMainHeaderInfoTypes, Tag, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C05A03 } from './store';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A03);
  const { userId } = useRecoilValue(studentAtom);

  const isSubmittable = cardData.p01.userInputs1 !== -1 && cardData.p01.userInputs2 !== '';

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meWords',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '중학생이 된 첫날 학교에 가져가고 싶은 물건을 고르고, 그 이유를 써 봅시다.',
  };

  const imageData = [
    {
      image: {
        src: `/L01/C05/A03/ME1-L01-C05-A03-P01-1.jpg`,
        alt: `반창고`,
      },
      name: 'Band-Aid',
    },
    {
      image: {
        src: `/L01/C05/A03/ME1-L01-C05-A03-P01-2.jpg`,
        alt: `사탕 세 개`,
      },
      name: 'candies',
    },
    {
      image: {
        src: `/L01/C05/A03/ME1-L01-C05-A03-P01-3.jpg`,
        alt: `주황색 공`,
      },
      name: 'stress ball',
    },
    {
      image: {
        src: `/L01/C05/A03/ME1-L01-C05-A03-P01-4.jpg`,
        alt: `손거울`,
      },
      name: 'mirror',
    },
    {
      image: {
        src: `/L01/C05/A03/ME1-L01-C05-A03-P01-5.jpg`,
        alt: `접착식 메모지`,
      },
      name: 'sticky notes',
    },
    {
      image: {
        src: `/L01/C05/A03/ME1-L01-C05-A03-P01-6.jpg`,
        alt: `지우개`,
      },
      name: 'eraser',
    },
  ];

  /* default 제출 값 */
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
      isCorrect: false,
    },
  ];

  const handleRadioOnChange = (value: number) => {
    setCardData(prev => {
      return { ...prev, p01: { ...prev.p01, userInputs1: value } };
    });
    changeData('P01', 1, 1, value);
  };

  const handleInputOnChange = (value: string) => {
    setCardData(prev => {
      return { ...prev, p01: { ...prev.p01, userInputs2: value } };
    });
    changeData('P01', 1, 2, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.userInputs1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.userInputs2,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId || 1;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            userInputs1: userSubmissionList[0].inputData[0].value || cardData.p01.userInputs1,
            userInputs2: userSubmissionList[0].inputData[1].value || cardData.p01.userInputs2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      submitDisabled={!isSubmittable || cardData.p01.isSubmitted}
      submitBtnColor={!isSubmittable || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap>
        <Box display='flex' flexWrap='wrap' gap='8px 10px' width='616px' justifyContent='center'>
          {imageData.map((value, index) => (
            <ContentWrap key={index} isActive={index === cardData.p01.userInputs1}>
              <Box textAlign='center' marginBottom={8}>
                <Image src={value.image.src} alt={value.image.alt} height='70px' />
              </Box>
              <Box hAlign='center'>
                <Radio
                  value={index === cardData.p01.userInputs1}
                  defaultValue={index === cardData.p01.userInputs1}
                  type='circle'
                  name='radio-group'
                  label={value.name}
                  ariaLabel={index + '번 보기'}
                  readOnly={cardData.p01.isSubmitted}
                  onClick={() => handleRadioOnChange(index)}
                />
              </Box>
            </ContentWrap>
          ))}
        </Box>
        <Box width='280px'>
          <Box marginBottom={8}>
            <Tag type={ETagLine.GREEN} label='이유' />
          </Box>
          <Textarea
            height='calc(100% - 48px)'
            placeholder='내용을 넣어 주세요.'
            alt='답안 입력란'
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.userInputs2}
            onChange={e => handleInputOnChange(e.target.value)}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

const ContentWrap = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 12px;
  border-radius: 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      padding: 10px;
      box-shadow: 0px 4px 4px 0px #00000040;
      border: 2px solid var(--color-blue-300);
      background-color: var(--color-blue-50);
    `}
`;

export default P01;
