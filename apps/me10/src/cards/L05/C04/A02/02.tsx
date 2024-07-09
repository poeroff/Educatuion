import tipBox from '@/assets/icon/gift-box.svg';
import { usePageData } from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  SvgIcon,
  TBody,
  TD,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableCaption,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C04A02 } from './store';

const P02 = () => {
  const pageNumber = 'P02';
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
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXTAREA',
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
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput1,
            },
            {
              subKey: 2,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput2,
            },
            {
              subKey: 3,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput3,
            },
            {
              subKey: 4,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput4,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const isSubmittable =
    isNotEmptyString(cardData[pageNumber].userInput1 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput2 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput3 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput4 || '');
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const toggleShowAnswer = () => {
    setIsShowAnswer(prev => !prev);
  };

  const handleInputChange = (value: string, subKey: number) => {
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
    changeData(pageNumber, 1, subKey + 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Green Volunteers: Step 2',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Box marginRight='10px'>
          <Typography>참여하고 싶은 환경 보호 봉사 활동을 조사하고 계획을 세워 봅시다.</Typography>
        </Box>
      </>
    ),
  };

  const data = [
    { thText: '기관 · 장소', eg: 'e.g. ' + cardData[pageNumber].solutions?.[0] },
    { thText: '일시', eg: 'e.g. ' + cardData[pageNumber].solutions?.[1] },
    { thText: '활동 내용', eg: 'e.g. ' + cardData[pageNumber].solutions?.[2] },
    { thText: '환경에 좋은 점', eg: 'e.g. ' + cardData[pageNumber].solutions?.[3] },
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (!isShowAnswer ? '답안보기' : '답안닫기') : '완료하기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={
        !cardData[pageNumber].isSubmitted
          ? isSubmittable
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : !isShowAnswer
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.GRAY
      }
      onSubmit={!cardData[pageNumber].isSubmitted ? handleSubmit : toggleShowAnswer}
      useExtend
    >
      <Box useFull>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['200px', '200px', '200px', '400px']}>
          <TableCaption caption='환경 보호 봉사 계획' hidden />
          <THead>
            {data.map(value => (
              <TH vAlign='middle' color={EStyleTableTypes.TERTIARY} scope={'col'}>
                {value.thText}
              </TH>
            ))}
          </THead>
          <TBody>
            <TR>
              {data.map((value, index) => (
                <TD color={EStyleTableTypes.DEFAULT} key={index}>
                  <Textarea
                    height='220px'
                    placeholder={value.eg}
                    ariaLabel={`답 입력란${index + 1}`}
                    value={
                      index === 0
                        ? cardData[pageNumber].userInput1
                        : index === 1
                        ? cardData[pageNumber].userInput2
                        : index === 2
                        ? cardData[pageNumber].userInput3
                        : index === 3
                        ? cardData[pageNumber].userInput4
                        : index === 4
                        ? cardData[pageNumber].userInput5
                        : ''
                    }
                    onChange={e => handleInputChange(e.target.value, index)}
                    readOnly={cardData[pageNumber].isSubmitted}
                  />
                </TD>
              ))}
            </TR>
          </TBody>
        </Table>
        <Box hAlign='flex-end' marginTop='4px'>
          <Box
            width='fit-content'
            padding='4px 10px'
            border='1px dashed var(--color-grey-500)'
            borderRadius='16px'
            marginTop={'5px'}
            marginBottom={'5px'}
          >
            <SvgIcon src={tipBox} size='20px' />
            <Typography size={EStyleFontSizes['X-MEDIUM']} weight={'var(--font-weight-bold)'} color='var(--color-blue-800)'>
              Tip
            </Typography>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>인터넷에서 ‘환경 보호 봉사 활동＇을 검색해 보세요. </Typography>
          </Box>
        </Box>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={'예시답안'} />
            </Box>
            <BoxWrap flexDirection='column' marginTop='12px'>
              <Typography>{`기관 · 장소: ${cardData[pageNumber].solutions?.[0]}`}</Typography>
              <Typography>{`일시: ${cardData[pageNumber].solutions?.[1]}`}</Typography>
              <Typography>{`활동 내용: ${cardData[pageNumber].solutions?.[2]}`}</Typography>
              <Typography>{`환경에 좋은 점: ${cardData[pageNumber].solutions?.[3]}`}</Typography>
            </BoxWrap>
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default P02;
