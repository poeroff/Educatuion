import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Table,
  Tag,
  TBody,
  TR,
  Typography,
  Image,
  TD,
  BoxWrap,
  TH,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { B01_0001_00 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/math';

const P09 = () => {
  const pageNumber = 'P09';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='9' type='icon' />
        길이의 단위 m로 나타내기에 알맞은 것을 찾아보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData[pageNumber].answer === cardData[pageNumber].solution;
      const isCorrect = isCorrect1;
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleInputChangeEvent = (subKey: number, value: string) => {
    const trimmedValue = value.trim();
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: trimmedValue } }));
    }
    changeData(pageNumber, 1, 1, trimmedValue);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const data = [
    {
      number: 'ㄱ',
      example: '막대 사탕의 길이',
      img: '/B00/DJC410002-1.png',
      alt: '막대 사탕 그림입니다.',
      width: '79px',
    },
    {
      number: 'ㄴ',
      example: '휴대 전화의 길이',
      img: '/B00/DJC410002-2.png',
      alt: '휴대 전화 그림입니다.',
      width: '117px',
    },
    {
      number: 'ㄷ',
      example: '궁궐의 높이',
      img: '/B00/DJC410002-3.png',
      alt: '궁궐 그림입니다.',
      width: '227px',
    },
  ];

  return (
    <Container
      bodyId={'targetContainer'}
      questionInfo={questionInfo}
      headerInfo={null}
      background={'var(--color-white)'}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageNumber].answer}
      submitBtnColor={!cardData[pageNumber].answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={onGrade}
      useRound
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box>
          <BoxWrap>
            {data.map((value, index) => (
              <Box key={`list-item-${index}`} type='dashed' padding='20px 20px' useRound width='300px' hAlign='center' flexDirection='column'>
                <Image src={value.img} alt={value.alt} width={value.width} height='110px' />
                <Box vAlign='center' key={value.number} marginTop='15px'>
                  <Label value={value.number} />
                  <Typography fontSize='24px'>{value.example}</Typography>
                </Box>
              </Box>
            ))}
          </BoxWrap>
        </Box>
      </Box>
      <Box hAlign='end' marginTop='24px'>
        <Box display={'flex'} marginRight={'180px'}>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['130px', '130px']}>
            <TBody>
              <TR key={1}>
                <TH key={1} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                  선택보기
                </TH>
                <TD key={2} scope='col' hAlign='center' color={EStyleTableTypes.TERTIARY}>
                  ㄱ,ㄴ,ㄷ
                </TD>
              </TR>
            </TBody>
          </Table>
        </Box>
        <Box>
          <Input
            width='150px'
            textAlign='start'
            ariaLabel='기호를 입력하세요'
            value={cardData[pageNumber].answer}
            onChange={e => handleInputChangeEvent(1, e.target.value)}
            maxLength={3}
            readOnly={cardData[pageNumber].isSubmitted}
            status={
              cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
                ? InputStatus.ERROR
                : cardData[pageNumber].isSubmitted
                ? InputStatus.ENABLE
                : isNotEmptyString(cardData[pageNumber].answer)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
          />
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[pageNumber].solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[pageNumber].commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
