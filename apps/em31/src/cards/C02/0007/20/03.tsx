import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, IQuestionProps, TMainHeaderInfoTypes, Typography, Image, BottomSheet, Tag, ETagLine, Label, EStyleButtonTypes } from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C02_0007_20 } from './store';
import usePageData from '@/hooks/usePageData';

const P03 = () => {
  const pageNumber = 'P03';
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C02_0007_20);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isShow, setIsShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box hAlign='center'>
        <Label type='icon' size='middle' value='2' />
        <Typography>직사각형을 모두 찾아 기호를 써 보세요.</Typography>
      </Box>
    ),
  };

  const udl = [
    '모눈종이 위에 두 개의 선분이 직각으로 그려져 있으며 이을 수 있도록 선택할 수 있는 점이 5개가 있습니다.',
    '점 ①, ③, ⑤로 이었을 때는 직각이 1개인 사각형이고,',
    '점 ②로 이었을 때는 직각인 2개인 사각형이고,',
    '④로 이었을 때는 네 각이 모두 직각인 사각형이 되는 그림입니다.',
  ];

  const solution = '④';

  const commentUdl = [
    '모눈종이 위에 두 개의 선분이 직각으로 그려져 있으며 이을 수 있도록 선택할 수 있는 점이 5개가 있습니다.',
    '그중 직사각형을 그릴 수 있는 점 4로 이은 정답 표시가 그려진 그림입니다.',
  ];

  const commentary = '다음과 같이 직사각형을 그릴 수 있습니다.';

  const commentImageInfo = {
    src: '/C02/0007/20/DIC312009(sol).png',
    udl: commentUdl,
    width: '260px',
    height: '181px',
  };

  return (
    <DialogContainer
      bodyId='targetContainer-2'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData[pageNumber].isSubmitted ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        setIsShow(true);
      }}
    >
      <Box>
        <Typography>템플릿 생성 후 개발 예정</Typography>
        <Box marginTop={'8px'}>
          <Image src={'/C02/0007/20/DIC312009.png'} alt='' width='370px' height='250px' ariaDescribedby='img_desc' />
          {udl && (
            <Box type='hidden' id='img_desc'>
              {udl.map((item, index) => (
                <p key={`img_desc_${index}`}>{item}</p>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer-2' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{solution}</Typography>
          </Box>
          {commentary && (
            <Box marginTop={'10px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>{commentary}</Typography>
              </Box>
            </Box>
          )}
          <Box vAlign='flex-start' flexDirection='column'>
            <Image src={commentImageInfo.src} width={commentImageInfo.width} height={commentImageInfo.height} alt={''} ariaDescribedby={'img_desc'} />
            {commentImageInfo.udl && (
              <Box type='hidden' id='img_desc'>
                {commentImageInfo.udl.map((item, index) => (
                  <p key={`img_desc_${index}`}>{item}</p>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P03;
