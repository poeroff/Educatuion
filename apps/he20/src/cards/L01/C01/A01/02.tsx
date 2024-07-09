import HE00102 from '@maidt-cntn/pages/HE-001-02';

const P02 = () => {
  return (
    <>
      <HE00102
        value1={'Molly seems to be adapting well, and I expect her to get better soon.'}
        highlight1={['expect her to get']}
        value2={'Some dehydrated birds had fallen out of the sky and were brought to the center.'}
        highlight2={['had fallen']}
      />
    </>
  );
};

export default P02;
