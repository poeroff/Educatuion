import { useEffect } from 'react';
import { Box, IQuestionProps, Label, Image, TMainHeaderInfoTypes, Typography, Textarea, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C05A03 } from './store';

const P02 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C05A03);
  const { userId } = useRecoilValue(studentAtom);

  const pageNum = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meWords',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 표현의 의미를 추측해서 써 봅시다.',
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
        return { ...prev, p02: { ...prev.p02, input1: value } };
      });
    } else if (index === 2) {
      setCardData(prev => {
        return { ...prev, p02: { ...prev.p02, input2: value } };
      });
    }

    changeData(pageNum, 1, index, value);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
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
              value: cardData.p02.input1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.input2,
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
          p02: {
            ...prev.p02,
            input1: userSubmissionList[0].inputData[0].value || cardData.p02.input1,
            input2: userSubmissionList[0].inputData[1].value || cardData.p02.input2,
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
      submitDisabled={cardData.p02.isSubmitted}
      submitBtnColor={cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitLabel='완료하기'
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box vAlign='flex-start'>
          <Box width='448px' flexDirection='row' paddingRight='24px'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  3
                </Typography>
              </Label>
              <Box margin='0 6px 8px 6px'>
                <Image src='/L02/C05/A03/ME1-L02-C05-A03-P02-1.jpg' alt='가방을 멘 남학생이 버스에 오른다.' width='268px' height='256px' />
                <Box display='flex' justifyContent='center'>
                  <Typography lineHeight='42px'>get on the bus</Typography>
                </Box>
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Textarea
                height='94px'
                value={cardData.p02.input1}
                readOnly={cardData.p02.isSubmitted}
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
                  4
                </Typography>
              </Label>

              <Box margin='0 6px 8px 6px'>
                <Image src='/L02/C05/A03/ME1-L02-C05-A03-P02-2.jpg' alt='남학생이 버스 좌석에 앉아 창 밖을 본다.' width='268px' height='256px' />
                <Box display='flex' justifyContent='center'>
                  <Typography lineHeight='42px'>look out the window</Typography>
                </Box>
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Textarea
                height='94px'
                value={cardData.p02.input2}
                readOnly={cardData.p02.isSubmitted}
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

export default P02;
