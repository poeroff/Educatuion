import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  SvgIcon,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04000904_Atom } from './store';

import oIcon from '@/assets/example/EM-019-01/o_icon.png';
import xIcon from '@/assets/example/EM-019-01/x_icon.png';
//맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 import 경로 수정

//import CEM310400091001 from '../../C04/0009/10/01';
//import CEM310400091002 from '../../C04/0009/10/02';
//import CEM310400091003 from '../../C04/0009/10/03';

//import CEM310400092001 from '../../C04/0009/20/01';
//import CEM310400092002 from '../../C04/0009/20/02';
//import CEM310400092003 from '../../C04/0009/20/03';
//import CEM310400092004 from '../../C04/0009/20/04';
//import CEM310400092005 from '../../C04/0009/20/05';

const P07 = () => {
  const [cardData, setCardData] = useRecoilState(A04000904_Atom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

  const dataList = [
    { key: 1, value: cardData.p01.isCorrect, isSubmitted: cardData.p01.isSubmitted },
    { key: 2, value: cardData.p02.isCorrect, isSubmitted: cardData.p02.isSubmitted },
    { key: 3, value: cardData.p03.isCorrect, isSubmitted: cardData.p03.isSubmitted },
    { key: 4, value: cardData.p04.isCorrect, isSubmitted: cardData.p04.isSubmitted },
    { key: 5, value: cardData.p05.isCorrect, isSubmitted: cardData.p05.isSubmitted },
    { key: 6, value: cardData.p06.isCorrect, isSubmitted: cardData.p06.isSubmitted },
  ];

  return (
    <Container
      headerInfo={null}
      background={'var(--color-white)'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      useLinkLabel
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['154px', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto']}>
          <TableMathCaption math={[]} caption='최종 결과' hidden />
          <THead hidden>
            <TR>
              <TH scope='row'>문제</TH>
              <TH scope='row'>결과</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                문제
              </TH>
              {dataList.map(item => (
                <TD key={item.key} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {item.key}
                </TD>
              ))}
            </TR>
            <TR>
              <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                결과
              </TH>
              {dataList.map(item => (
                <TD key={item.key} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {item.isSubmitted ? (
                    item.value ? (
                      <SvgIcon height='27px' src={oIcon} width='27px' />
                    ) : (
                      <SvgIcon height='27px' src={xIcon} width='27px' />
                    )
                  ) : (
                    ''
                  )}
                </TD>
              ))}
            </TR>
          </TBody>
        </Table>
        <Box marginTop='24px' hAlign='center'>
          <Typography>나는 {dataList.length}문제 중에서</Typography>
          <Typography size={EStyleFontSizes.LARGE} color='#275ce7'>
            {dataList.filter(item => item.value).length}
          </Typography>
          <Typography>문제를 맞혔어요.</Typography>
        </Box>
      </Box>
      {dataList.filter(item => item.value).length !== 6 && (
        <Dialog
          isShow={isShow}
          useHeader
          width={981}
          height={572}
          onClose={() => {
            setShow(false);
          }}
          onConfirm={() => {
            setShow(false);
          }}
        >
          {/* 맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 주석 해제  */}
          {dataList.filter(item => item.value).length > 4 ? (
            <>
              {/* <CEM310400091001 /> */}
              {/* <CEM310400091002 /> */}
              {/* <CEM310400091003 /> */}
            </>
          ) : (
            <>
              {/* <CEM310400092001 /> */}
              {/* <CEM310400092002 /> */}
              {/* <CEM310400092003 /> */}
              {/* <CEM310400092004 /> */}
              {/* <CEM310400092005 /> */}
            </>
          )}
        </Dialog>
      )}
    </Container>
  );
};

export default P07;
