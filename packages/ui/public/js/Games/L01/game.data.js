let data02_c_c05_14 = {
  1: {
    1: {
      title: '바르게 계산한 것을 고르세요.',
      type: 'select',
      ex: '32＋25＝48,32＋25＝57',
      direction: 'row',
      answer: 1,
      desc: `<p>일의 자리끼리, 십의 자리끼리 더합니다.</p>
                <table class="math-table">
                        <tbody>                            
                            <tr>                               
                                <td></td>
                                <td>3</td>
                                <td>2</td>
                            </tr>
                            <tr>                               
                                <td>＋</td>
                                <td>2</td>
                                <td>5</td>
                            </tr>
                            <tr class="line">
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>5</td>
                                <td>7</td>                               
                            </tr>
                        </tbody>
                    </table>`,
    },
    2: {
      title: "<span class='text-center'>68＋11</span>",
      type: 'select',
      ex: '77,78,79',
      direction: 'row',
      answer: 2,
      desc: `
                <table class="math-table">
                        <tbody>                            
                            <tr>                               
                                <td></td>                               
                                <td>6</td>
                                <td>8</td>
                            </tr>
                            <tr>                               
                                <td>＋</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr class="line">
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>7</td>
                                <td>9</td>                               
                            </tr>
                        </tbody>
                    </table>`,
    },
  },
};

let data03_c_c07_16 = {
  1: {},
  2: {
    1: {
      title: "<span class='text-center'>123＋234</span>",
      type: 'select',
      ex: '337,357,359',
      direction: 'row',
      answer: 1,
      desc: `<p>일의 자리끼리, 십의 자리끼리, 백의 자리끼리 <span class="text-nowrap">더합니다.</span></p>
                <table class="math-table">
                        <tbody>                            
                            <tr>                               
                                <td></td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr>                               
                                <td>＋</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                            </tr>
                            <tr class="line">
                                <td colspan="4"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>3</td>
                                <td>5</td>   
                                <td>7</td>                             
                            </tr>
                        </tbody>
                    </table>`,
    },
    2: {
      title: '미소는 색종이 121장을 가지고 있습니다. 친구에게 색종이 143장을 받으면 미소가 가지고 있는 색종이는 모두 몇 장인지 고르세요.',
      type: 'select',
      ex: '264장,352장',
      direction: 'row',
      answer: 0,
      desc: `<p>(처음 색종이 수)＋(친구에게 받은 색종이 수)</p><p>＝121＋143＝264(장)</p>`,
    },
  },
};
let data04_c_c06_16 = {
  1: {
    1: {
      title: '바르게 계산한 것을 고르세요.',
      type: 'select',
      direction: 'row',
      ex: `
            <table class='math-table tb-fixed middle'>
                        <tbody> 
                            <tr>
                                <td></td>
                                <td>5</td>
                                <td>9</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>＋</td>
                                <td>2</td>
                                <td>3</td>
                                <td>1</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='4'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>8</td>
                                <td>2</td>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </table>
            ,
                    <table class='math-table tb-fixed middle'>
                        <tbody> 
                            <tr>
                                <td></td>
                                <td>5</td>
                                <td>9</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>＋</td>
                                <td>2</td>
                                <td>3</td>
                                <td>1</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='4'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>7</td>
                                <td>2</td>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </table> 
            `,
      answer: 0,
      desc: `
                <table class="math-table">
                    <tbody>
                        <tr class="sup">
                            <td></td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                        </tr>                           
                        <tr>                               
                            <td></td>
                            <td>5</td>
                            <td>9</td>
                            <td>3</td>
                        </tr>
                        <tr>                               
                            <td>＋</td>
                            <td>2</td>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                        <tr class="line">
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>8</td>
                            <td>2</td>   
                            <td>4</td>                             
                        </tr>
                        </tbody>
                    </table>
                    <p>십의 자리 계산에서 9＋3＝12이므로 백의 자리 계산에 <span class="text-nowrap">1을</span> 더해야 합니다.</p>
                    
            `,
    },
    2: {
      title: "<span class='text-center'>428＋116</span>",
      type: 'select',
      ex: '534,544,567',
      direction: 'row',
      answer: 1,
      desc: `
               <p>일의 자리끼리, 십의 자리끼리, 백의 자리끼리 <span class="text-nowrap">더하고</span> 각 자리의 합이 두 자리 수이면 윗자리 <span class="text-nowrap">계산에</span> 1을 더합니다.</p>
                <table class="math-table">
                        <tbody>
                        <tr class="sup">
                                <td></td>
                                <td></td>
                                <td>1</td>
                                <td></td>
                            </tr>                            
                            <tr>                               
                                <td></td>                               
                                <td>4</td>
                                <td>2</td>
                                <td>8</td>
                            </tr>
                            <tr>                               
                                <td>＋</td>
                                <td>1</td>
                                <td>1</td>
                                <td>6</td>
                            </tr>
                            <tr class="line">
                                <td colspan="4"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>5</td>
                                <td>4</td>
                                <td>4</td>                               
                            </tr>
                        </tbody>
                    </table>`,
    },
  },
};

let data05_c_c08_14 = {
  1: {
    1: {
      title: "<span class='text-center'>96－35＝61</span>",
      type: 'ox',
      answer: 0,
      desc: `<p>일의 자리끼리, 십의 자리끼리 뺍니다.</p>
                <table class="math-table">
                        <tbody>                            
                            <tr>                               
                                <td></td>
                                <td>9</td>
                                <td>6</td>
                            </tr>
                            <tr>                               
                                <td>－</td>
                                <td>3</td>
                                <td>5</td>
                            </tr>
                            <tr class="line">
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>6</td>
                                <td>1</td>                               
                            </tr>
                        </tbody>
                    </table>`,
    },
    2: {
      title: "지호는 사탕 28개 중에서 12개를 동생에게 주었습니다. 지호에게 <span class='text-nowrap'>남은</span> 사탕은 몇 개인지 고르세요.",
      type: 'select',
      ex: '15개,16개,19개',
      direction: 'row',
      answer: 1,
      desc: `
                <p>(가지고 있는 사탕 수)－(동생에게 준 사탕 수)</p>
                <p>＝28－12＝16(개)  </p>
                `,
    },
  },
};

let data06_c_c05_16 = {
  1: {
    1: {
      title: "<span class='text-center'>785－551</span>",
      type: 'select',
      ex: '234,324',
      direction: 'row',
      answer: 0,
      desc: `<p>일의 자리끼리, 십의 자리끼리, 백의 자리끼리 <span class="text-nowrap">뺍니다.</span></p>
                <table class="math-table">
                        <tbody>                            
                            <tr>                               
                                <td></td>
                                <td>7</td>
                                <td>8</td>
                                <td>5</td>
                            </tr>
                            <tr>                               
                                <td>－</td>
                                <td>5</td>
                                <td>5</td>
                                <td>1</td>
                            </tr>
                            <tr class="line">
                                <td colspan="4"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>2</td>
                                <td>3</td>    
                                <td>4</td>                           
                            </tr>
                        </tbody>
                    </table>`,
    },
    2: {
      title: "<span class='text-center'>458－204＝234</span>",
      type: 'ox',
      answer: 1,
      desc: `
                <table class="math-table">
                        <tbody>                            
                            <tr>                               
                                <td></td>                               
                                <td>4</td>
                                <td>5</td>
                                <td>8</td>
                            </tr>
                            <tr>                               
                                <td>－</td>
                                <td>2</td>
                                <td>0</td>
                                <td>4</td>
                            </tr>
                            <tr class="line">
                                <td colspan="4"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>2</td>
                                <td>5</td>
                                <td>4</td>                               
                            </tr>
                        </tbody>
                    </table>`,
    },
  },
};

let data07_c_c07_16 = {
  1: {},
  2: {
    1: {
      title: '바르게 계산한 것을 고르세요.',
      type: 'select',
      ex: `
            <table class='math-table tb-fixed middle'>
                        <tbody> 
                            <tr>
                                <td></td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>－</td>
                                <td>1</td>
                                <td>6</td>
                                <td>3</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='4'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>2</td>
                                <td>9</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
            ,
                    <table class='math-table tb-fixed middle'>
                        <tbody> 
                            <tr>
                                <td></td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>－</td>
                                <td>1</td>
                                <td>6</td>
                                <td>3</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='4'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>3</td>
                                <td>9</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table> 
            `,
      direction: 'row',
      answer: 0,
      desc: `
                <table class="math-table">
                    <tbody>
                        <tr class="sup">
                            <td></td>
                            <td>3</td>
                            <td>10</td>
                            <td></td>
                        </tr>                           
                        <tr>                               
                            <td></td>
                            <td class="slash">4</td>
                            <td>5</td>
                            <td>6</td>
                        </tr>
                        <tr>                               
                            <td>－</td>
                            <td>1</td>
                            <td>6</td>
                            <td>3</td>
                        </tr>
                        <tr class="line">
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>2</td>
                            <td>9</td>   
                            <td>3</td>                             
                        </tr>
                        </tbody>
                    </table>
                    <p>십의 자리끼리 뺄 수 없을 때에는 백의 자리에서 받아내림하고, 백의 자리에서 1을 빼야 합니다.</p>      
            `,
    },
    2: {
      title:
        "서울에서 부산으로 가는 기차에 남자가 <span class='text-nowrap'>215명,</span> 여자가 108명 탔습니다. 남자는 <span class='text-nowrap'>여자보다</span> 몇 명 더 많은지 고르세요.",
      type: 'select',
      ex: '107명,113명',
      direction: 'row',
      answer: 0,
      desc: `
               <p>(기차에 탄 남자 수)－(기차에 탄 여자 수)</p>
               <p>＝215－108＝107(명)</p>
               `,
    },
  },
};

let data08_c_c06_16 = {
  1: {
    1: {
      title: "<span class='small'>89를 몇십쯤으로 어림할 수 있는지 고르세요.</span>",
      type: 'select',
      ex: '80쯤,90쯤',
      answer: 1,
      desc: `<p>89는 80과 90 중에서 90에 더 가까우므로 90쯤으로 <span class="text-nowrap">어림할</span> 수 있습니다.</p>`,
    },
    2: {
      title: "<span class='small'>103을 몇백쯤으로 어림할 수 있는지 고르<span class='text-nowrap'>세요.</span></span>",
      type: 'select',
      ex: '100쯤,200쯤',
      answer: 0,
      desc: `<p>103은 100과 200 중에서 100에 더 가까우므로 <span class="text-nowrap">100쯤으로</span> 어림할 수 있습니다.</p>`,
    },
  },
};
