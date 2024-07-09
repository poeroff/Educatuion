import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Drawing,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ICanvasFunction,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0002_07 } from './store';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const { initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A05_0002_07);

  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주변에 있는 여러 가지 물건의 길이를 재어 보세요.',
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

  const setSubmitBtnColor = () => {
    if (isShow) {
      return EStyleButtonTypes.GRAY;
    } else {
      return EStyleButtonTypes.YELLOW;
    }
  };

  const handleSubmit = async () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
      subjectCode: subjectCode,
      cardPath: '/A05/0002/07',
      canvasIndex: 1,
      page: '01',
      userId: userId,
    });
    const canvasPath = await uploadCanvasImagePromise;
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasPath: canvasPath || '', isSubmitted: true } }));
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
    submitData('P01', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            canvasPath: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath,
            isSubmitted,
          },
        }));
        if (userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath) {
          canvasRef.current?.settingCanvasImage({
            subjectCode: subjectCode,
            uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath,
          });
        }
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
      background={'var(--color-white)'}
      submitBtnColor={setSubmitBtnColor()}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box width='796px' height='390px' borderRadius='8px'>
          <Drawing ref={canvasRef} disabled={cardData.p01.isSubmitted} />
        </Box>

        {/* TODO */}
        <Box width='100px' height='100px' backgroundColor='var(--color-grey-100)'>
          <Typography useGap={false} size={EStyleFontSizes['SMALL']} style={{ lineHeight: '20px' }}>
            자 교구 버튼
          </Typography>
          <Typography useGap={false} size={EStyleFontSizes['X-SMALL']} style={{ fontSize: '10px', lineHeight: '20px' }}>
            (고객 검토 후 반영 예정)
          </Typography>
        </Box>
      </BoxWrap>
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
              <Typography>자를 사용하여 수학책의 짧은 쪽의 길이, 연필의 길이 등의 주변에 있는 여러 가지 물건의 길이를 재어 봅니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
