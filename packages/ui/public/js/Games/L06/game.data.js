let data02_c_c08_14 = {
  1: {
    1: {
      title: `도형의 이름을 고르세요.`,
      title2: `<p><img src='../../../../src/assets/Games/L06/img/316_1_01.png' alt='icon' height='300'></p>`,
      type: 'select',
      ex: '직사각형,삼각형,원',
      answer: 2,
      desc: `곡선으로 이루어져 있고, 어느 곳에서 보아도 <span class="text-nowrap">완전히</span> 둥근 모양입니다.`,
    },
    2: {
      title: `<span class='small'>주어진 도형과 모양과 크기가 똑같은 도형을 고르세요.</span><p><img src='../../../../src/assets/Games/L06/img/316_1_02.png' alt='icon' height='130'></p>`,
      type: 'select',
      ex: `
                <p style='width:90%;text-align:center'><img src='../../../../src/assets/Games/L06/img/316_1_03.png' alt='icon' height='130'></p>,
                <p style='width:90%;text-align:center'><img src='../../../../src/assets/Games/L06/img/316_1_02.png' alt='icon' height='130'></p>
            `,
      direction: 'row',
      answer: 1,
      desc: `모양과 크기를 잘 살펴봅니다.`,
    },
  },
};

let data03_c_c07_18 = {
  1: {},
  2: {
    1: {
      title: `<span class='small'>똑같이 둘로 나누어진 피자를 고르세요.</span>`,
      type: 'select',
      ex: `
                 <p style='width:90%;text-align:center'><img src='../../../../src/assets/Games/L06/img/316_2_01.png' alt='icon' height='200'></p>,
                 <p style='width:90%;text-align:center'><img src='../../../../src/assets/Games/L06/img/316_2_02.png' alt='icon' height='200'></p>
            `,
      direction: 'row',
      answer: 1,
      desc: `나누어진 두 조각의 모양과 크기가 같은 피자를 찾습니다.`,
    },
    2: {
      title: `<span class='small'>똑같이 셋으로 나누어진 피자를 고르세요.</span>`,
      type: 'select',
      ex: `
                 <p style='width:90%;text-align:center'><img src='../../../../src/assets/Games/L06/img/316_2_03.png' alt='icon' height='200'></p>,
                 <p style='width:90%;text-align:center'><img src='../../../../src/assets/Games/L06/img/316_2_04.png' alt='icon' height='200'></p>
            `,
      direction: 'row',
      answer: 0,
      desc: `나누어진 세 조각의 모양과 크기가 같은 피자를 찾습니다.`,
    },
  },
};

let data04_c_c05_13 = {
  1: {
    1: {
      title: `<span class='small'>색칠한 부분은 전체의 얼마인지 분수로 나타낸 것을 고르세요.</span>`,
      title2: `<p><img src='../../../../src/assets/Games/L06/img/316_3_01.png' alt='icon' height='200'></p>`,
      type: 'select',
      ex: `
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>1</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>4</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>8</td>
                        </tr>
                    </tbody>
                </table>
            `,
      answer: 1,
      desc: `전체를 똑같이 8로 나눈 것 중의 4입니다.`,
    },
    2: {
      title: `<span class='small'>색칠한 부분은 전체의 얼마인지 분수로 나타낸 것을 고르세요.</span>`,
      title2: `<p><img src='../../../../src/assets/Games/L06/img/316_3_02.png' alt='icon' height='200'></p>`,
      type: 'select',
      ex: `
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>5</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>1</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            `,
      answer: 0,
      desc: `전체를 똑같이 10으로 나눈 것 중의 5입니다.`,
    },
  },
};

let data05_c_c07_13 = {
  1: {},
  2: {
    1: {
      title: `<span class='small'>색칠한 부분을 분수로 나타낸 것을 고르세요.</span>`,
      title2: `<p><img src='../../../../src/assets/Games/L06/img/316_4_01.png' alt='icon' height='200'></p>`,
      type: 'select',
      ex: `
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>1</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>3</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
            `,
      answer: 0,
      desc: `색칠한 부분은 전체를 똑같이 4로 나눈 것 중의 1입니다.`,
    },
    2: {
      title: `<span class='small'>색칠하지 않은 부분을 분수로 나타낸 것을 <span class="text-nowrap">고르세요.</span></span>`,
      title2: `<p><img src='../../../../src/assets/Games/L06/img/316_4_02.png' alt='icon' height='200'></p>`,
      type: 'select',
      ex: `
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>2</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>1</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
            `,
      answer: 1,
      desc: `색칠하지 않은 부분은 전체를 똑같이 3으로 나눈 것 중의 1입니다.`,
    },
  },
};

let data06_c_c06_15 = {
  1: {
    1: {
      title: `<span class='small'>□ 안에 알맞은 수를 고르세요.</span>
                    <div style="text-align: center">
                        <div class="fraction fraction-auto">
                            <span>4</span>
                            <br>
                            <span>7</span>
                        </div>는 
                        <div class="fraction fraction-auto">
                            <span>1</span>
                            <br>
                            <span>7</span>
                        </div>이 <span class="blank2"></span>개입니다.
                    </div>`,
      type: 'select',
      ex: '1,4,7',
      answer: 1,
      desc: `
                    <div class="fraction fraction-auto">
                        <span>4</span>
                        <br>
                        <span>7</span>
                    </div>는 전체를 똑같이 7로 나눈 것 중의 4입니다. <br/>이때
                    <div class="fraction fraction-auto">
                        <span>1</span>
                        <br>
                        <span>7</span>
                    </div>이 몇 개인지 생각해 봅니다.
                `,
    },
    2: {
      title: `<span class='small'>□ 안에 알맞은 수를 고르세요.</span>
                   <div style="text-align: center">
                        <div class="fraction fraction-auto">
                            <span>1</span>
                            <br>
                            <span>8</span>
                        </div>이 5개이면 <span class="blank"></span>입니다.
                   </div>
                    `,
      type: 'select',
      ex: `
                <table class='math-table'>
                    <tbody>                            
                        <tr>                               
                            <td>1</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table'>
                    <tbody>                            
                        <tr>                               
                            <td>1</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>8</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table'>
                    <tbody>                            
                        <tr>                               
                            <td>5</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>8</td>
                        </tr>
                    </tbody>
                </table>
            `,
      answer: 2,
      desc: `
                <div class="fraction fraction-auto">
                    <span>1</span>
                    <br>
                    <span>8</span>
                </div>이 5개인 분수는 얼마일지 생각해 봅니다.
            `,
    },
  },
};

let data07_c_c08_19 = {
  1: {
    1: {
      title: `□ 안에 알맞은 수를 고르세요.<p class="blue-point-box3"><span>1 cm = □ mm</span></p>`,
      type: 'select',
      ex: '1000,100,10',
      direction: 'row',
      answer: 2,
      desc: `1 cm는 몇 mm인지 생각해 봅니다.`,
    },
    2: {
      title: `<span class='small'>색칠한 부분을 분수로 나타낸 것을 고르세요.</span>`,
      title2: `<p><img src='../../../../src/assets/Games/L06/img/316_6_01.png' alt='icon' height='200'></p>`,
      type: 'select',
      ex: `
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>8</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>,
                <table class='math-table small'>
                    <tbody>                            
                        <tr>                               
                            <td>2</td>                               
                        </tr>
                        <tr class='line'>
                            <td colspan='1'></td>
                        </tr>
                        <tr>                               
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            `,
      answer: 0,
      desc: `색칠한 부분은 전체를 10으로 나눈 것 중의 <br/>몇인지 생각해 봅니다.`,
    },
  },
};

let data08_c_c06_18 = {
  1: {
    1: {
      title: `0.1이 6개이면 6입니다.`,
      type: 'ox',
      answer: 1,
      desc: `0.1이 6개이면 얼마인지 생각해 봅니다.`,
    },
    2: {
      title: `3 mm는 0.3 cm입니다.`,
      type: 'ox',
      answer: 0,
      desc: `1 mm를 cm로 나타내면 0.1 cm입니다.`,
    },
  },
};

let data09_c_c05_14 = {
  1: {
    1: {
      title: `□ 안에 알맞은 수를 고르세요.<p class="blue-point-box3"><span class='small'>2와 0.8만큼은 □입니다.</span></p>`,
      type: 'select',
      ex: '2.8,28,8.2',
      direction: 'row',
      answer: 0,
      desc: `2와 0.8만큼인 수를 소수로 나타내면 얼마인지 <br/>생각해 봅니다.`,
    },
    2: {
      title: `□ 안에 알맞은 수를 고르세요.<p class="blue-point-box3"><span class='small'>3.2는 0.1이 □개입니다.</span></p>`,
      type: 'select',
      ex: '23,32,30',
      direction: 'row',
      answer: 1,
      desc: `3.2는 0.1이 몇 개인지 생각해 봅니다.`,
    },
  },
};
