import { useEffect } from 'react';
import { Box, TMainHeaderInfoTypes, Typography, Input, SvgIcon, EStyleButtonTypes, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C08A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A04);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  const questionInfo = {
    text: 'Discovering the Patterns',
  };
  const questionText = 'Think about how the red words connect the blue words.';

  const defaultSbumission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
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
            ...prev,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSbumission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      submitDisabled={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p02.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull hAlign='center' padding='50px 0px' height='100%' flexDirection='column' gap='20px'>
        <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound>
          <Box display='flex' alignItems='center' width={'100%'}>
            <Typography>
              <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
              <Typography>They could find their cat </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
                neither &nbsp;
              </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
                in the living room &nbsp;
              </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
                nor &nbsp;
              </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
                in the kitchen.
              </Typography>{' '}
            </Typography>
          </Box>

          <Box display='flex' width={'100%'}>
            <Typography>
              <SvgIcon src={simpleRightArrow} size='38px' style={{ verticalAlign: 'top' }} />
              <Typography>What truly matters in life is </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
                not &nbsp;
              </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
                others’ opinion &nbsp;
              </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-red-800)' useGap={false}>
                but &nbsp;
              </Typography>
              <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-800)' useGap={false}>
                your own perspective.
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box width={'100%'}>
          <Typography>{questionText}</Typography>
        </Box>

        <Box marginTop={'8px'} paddingLeft={'12px'} width={'100%'}>
          <Input
            width='100%'
            value={cardData.p02.answer}
            onChange={handleInputChange}
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='서술 답안 입력란'
            readOnly={cardData.p02.isSubmitted}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
