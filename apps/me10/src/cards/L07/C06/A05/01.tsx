import HE01603, { IHE01603Info } from '@maidt-cntn/pages/HE-016-03';
import { Box, BoxWrap, IAudioPlayerProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

interface IListenAndAnswer {
  originText: string;
  label?: string;
  labelColor?: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Amazing Facts About the World (2)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: contentInfo.P01.audio.src,
    captionSrc: contentInfo.P01.audio.caption,
  };
  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      udl: contentInfo.P01.image.alt[0],
      text: [''],
      nodeText: (
        <>
          <Box useFull marginTop={'24px'}>
            <List<IListenAndAnswer>
              data={contentInfo.P01.body}
              row={({ value, index = 1 }) => (
                <BoxWrap boxGap={10}>
                  {value?.labelColor && value?.label ? (
                    <Box width='145px' textAlign='center' background={value?.labelColor} height='fit-content' padding='4px 0' borderRadius='8px'>
                      <Typography useGap={false} weight='var(--font-weight-bold)'>
                        {value?.label}
                      </Typography>
                    </Box>
                  ) : (
                    <Box width='145px' textAlign='center' height='fit-content' padding='4px 0' borderRadius='8px'></Box>
                  )}
                  <Box width={'700px'}>
                    <Typography useGap={true}>{value?.originText}</Typography>
                  </Box>
                </BoxWrap>
              )}
            />
          </Box>
        </>
      ),
      imageSrc: [contentInfo.P01.image.src[0]],
      imagePosition: 'before',
      imageWidth: '500px',
    },
  ];
  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title='' info={HE01603Info} />;
};

export default P01;
