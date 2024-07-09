import { useEffect } from 'react';
import { Box, IQuestionProps, Label, Image, TMainHeaderInfoTypes, Typography, Textarea, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C05A03 } from './store';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C05A03);
  const { userId } = useRecoilValue(studentAtom);

  const pageNum = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meWords',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 밑줄 친 표현이 어떤 의미인지 추측해서 써 봅시다.',
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
      ],
    },
  ];

  const handleInputOnChange = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => {
        return { ...prev, p01: { ...prev.p01, input1: value } };
      });
    } else if (index === 2) {
      setCardData(prev => {
        return { ...prev, p01: { ...prev.p01, input2: value } };
      });
    }

    changeData(pageNum, 1, index, value);
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
              type: 'TEXT',
              value: cardData.p01.input1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.input2,
            },
          ],
        },
      ];
      submitData(pageNum, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            input1: userSubmissionList[0].inputData[0].value || cardData.p01.input1,
            input2: userSubmissionList[0].inputData[1].value || cardData.p01.input2,
            isSubmitted,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
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
      vAlign='center'
      onSubmit={handleSubmit}
      submitDisabled={cardData.p01.isSubmitted}
      submitBtnColor={cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitLabel='완료하기'
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box vAlign='flex-start'>
          <Box width='448px' flexDirection='row' paddingRight='24px'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  1
                </Typography>
              </Label>
              <Box margin='0 6px 8px 6px'>
                <Image src='/L05/C05/A03/ME1-L05-C05-A03-P01-1.jpg' alt='남학생이 쓰레기통 속의 쓰레기들을 살펴보고 있다.' height='238px' />

                <Box display='flex' justifyContent='center'>
                  <Typography lineHeight='42px'>
                    I
                    <Typography weight='var(--font-weight-bold)' textDecoration={'underline'}>
                      went through
                    </Typography>
                    my garbage.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Textarea
                height='94px'
                value={cardData.p01.input1}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleInputOnChange(1, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='그림을 참고하여 사용된 표현의 의미를 적어주세요.'
              />
            </Box>
          </Box>

          <Box width='448px' flexDirection='row'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  2
                </Typography>
              </Label>

              <Box margin='0 6px 8px 6px'>
                <Image src='/L05/C05/A03/ME1-L05-C05-A03-P01-2.jpg' alt='여학생이 쓰레기통에 구겨진 종이를 던져 넣고 있다. ' height='238px' />
                <Box display='flex' justifyContent='center'>
                  <Typography lineHeight='42px'>
                    I
                    <Typography weight='var(--font-weight-bold)' textDecoration={'underline'}>
                      throw away
                    </Typography>
                    paper.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Textarea
                height='94px'
                value={cardData.p01.input2}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleInputOnChange(2, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='그림을 참고하여 사용된 표현의 의미를 적어주세요.'
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
