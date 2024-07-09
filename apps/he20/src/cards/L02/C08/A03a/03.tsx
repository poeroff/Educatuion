import arrow_right from '@/assets/icon/arrow_right.svg';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C08A03a } from './store';

const page = 'P03';
const pageKey = 'p03';

const P03 = ({ imgSrc, imgAlt }: { imgSrc: string; imgAlt: string }) => {
  const [isShow, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A03a);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { answer, solution, isSubmitted } = cardData[pageKey];
  const isDisabled = !isNotEmptyString(answer);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the sentences using structures above. If necessary, change the forms of the given words.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || answer,
            isSubmitted,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isAnswer(answer, solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(page, userSubmission);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(page, 1, 1, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull flexDirection='column'>
        <Box>
          <TextView title='보기'>
            <Image src={imgSrc} width={'100%'} />
            <Box type='hidden'>{imgAlt}</Box>
          </TextView>
        </Box>
        <Box marginTop='24px'>
          <Box>
            <Typography>3. Alice는 운전할 수 있는 유일한 사람이야. 그녀가 여기로 그녀의 가족을 태워 온 것이 틀림없어.</Typography>
          </Box>
          <Box hAlign={'flex-start'}>
            <StyledTypography>
              <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px', margin: '0 0 0 20px' }} src={arrow_right} size='36px' />
              <TextPartRight>Alice was the only one who can drive. She</TextPartRight>
              <Input
                width={'220px'}
                textAlign='start'
                value={answer}
                onChange={e => handleInputChange(e.target.value)}
                maxLength={70}
                placeholder={'내용을 넣어 주세요.'}
                aria-label='답란'
                status={isNotEmptyString(answer) ? InputStatus.ENABLE : InputStatus.DEFAULT}
                inputSize={'x-small'}
                readOnly={isSubmitted}
              />
              <TextPartLeft>her family here.</TextPartLeft>
            </StyledTypography>
          </Box>
        </Box>
        <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
          <Typography useGap={false} color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
            제시어 : drive
          </Typography>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const StyledTypography = styled(Typography)`
  display: block;
  position: relative;
  max-width: 100%;
`;
const TextPartRight = styled.span`
  display: inline;
  padding-right: 12px;
`;
const TextPartLeft = styled.span`
  display: inline;
  padding-left: 56px;
`;
