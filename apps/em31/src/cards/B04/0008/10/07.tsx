import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Drawing,
  IQuestionProps,
  Label,
  ICanvasFunction,
  Box,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { B04_0008_10 } from './store';

const P07 = () => {
  const { initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0008_10);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        <Box vAlign='center'>
          <Typography lineHeight='48px'>
            드론 비행에 사용할 드론이 500 대 있습니다. 드론 72 대로 로봇 모양 한 개를 만든다면 드론 500 대로는 로봇 모양을 몇 개까지 만들 수 있는지
            구해 보세요.
          </Typography>
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
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = async () => {
    if (cardData.p07.isSubmitted) {
      setShow(!isShow);
    } else {
      const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
        subjectCode: subjectCode,
        cardPath: '/B04/0008/10',
        canvasIndex: 1,
        page: '07',
        userId: userId,
      });
      const canvasPath = await uploadCanvasImagePromise;
      if (canvasPath) {
        setCardData(prev => ({ ...prev, p07: { ...prev.p07, canvasPath1: canvasPath, isSubmitted: true } }));
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'TEXT',
                value: canvasPath,
              },
            ],
          },
        ];
        submitData('P07', userSubmission);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P07')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData.p07.canvasPath1,
            isSubmitted,
          },
        }));
        if (userSubmissionList[0].inputData[0]?.value || cardData.p07.canvasPath1) {
          canvasRef.current?.settingCanvasImage({
            subjectCode: subjectCode,
            uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.p07.canvasPath1,
          });
        }
      }
      initData('P07', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P07');
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={cardData.p07.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
      vAlign='flex-start'
    >
      <Box vAlign='flex-start' marginBottom={20}>
        <Box display='flex' alignItems='center'>
          <Label value='ㅂ' lineColor='none' background='var(--color-grey-600)' color='var(--color-white)' marginRight={20} />
          <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
            어떻게 문제를 해결했는지 설명해 보세요.
          </Typography>
        </Box>
      </Box>

      <Drawing ref={canvasRef} />

      <BottomSheet height={'50%'} show={cardData.p07.isSubmitted && isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
            <Box display={'flex'} marginTop='12px' gap={'20px'}>
              <Typography>72 를 70 으로 생각하여 계산 결과를 어림한 다음 72 에 7, 6, 5, ... 를 곱해 보며 답을 구했습니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P07;
