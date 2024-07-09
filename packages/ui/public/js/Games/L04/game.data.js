let data02_c_c06_16 = {
    1 : {
        "1": {
            title: `□ 안에 알맞은 수를 고르세요.<p>4＋4＋4＝4 × □</p>`,
            type: "select",
            ex: "2,3,4",
            answer: 1,
            desc: `<p>4를 3번 더한 식을 곱셈으로 나타내어 봅니다.</p>`,
        },
        "2": {
            title: `□ 안에 알맞은 수를 고르세요.<p>5 × 6＝□</p>`,
            type: "select",
            ex: "20,25,30",
            answer: 2,
            desc: `5단 곱셈구구를 생각해 봅니다.`,
        },
    },
}

let data03_c_c05_15 = {
    1 : {
        "1": {
            title: `계산 결과를 고르세요.`,
            title2: `30 × 2`,
            type: "select",
            ex: "90,60,50",
            answer: 1,
            desc: `<p>3 × 2＝6을 이용하여 30 × 2를 생각해 봅니다.</p>`,
        },
        "2": {
            title: `□ 안에 알맞은 수를 고르세요.`,
            title2: `20 × □＝80`,
            type: "select",
            ex: "2,6,4",
            answer: 2,
            desc: `2와 어떤 수를 곱하면 8이 되는지 생각해 봅니다.`,
        },
    },
}

let data04_c_c08_14 = {
    1 : {
        "1": {
            title: `계산 결과를 고르세요.<p class="blue-point-box3"><span>43 × 2</span></p>`,
            type: "select",
            ex: "84,86,46",
            direction: "row",
            answer: 1,
            desc: `<p>일의 자리, 십의 자리에 맞춰 계산해 봅니다.</p>`,
        },
        "2": {
            title: `바르게 계산한 식을 고르세요.`,
            type: "select",
            ex: `
                <table class='math-table'>
                        <tbody>                            
                            <tr>                               
                                <td></td>                               
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>                               
                                <td>×</td>
                                <td></td>
                                <td>7</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='3'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>7</td>
                                <td>7</td>                           
                            </tr>
                        </tbody>
                    </table>,
                <table class='math-table'>
                        <tbody>                            
                            <tr>                               
                                <td></td>                               
                                <td>3</td>
                                <td>2</td>
                            </tr>
                            <tr>                               
                                <td>×</td>
                                <td></td>
                                <td>3</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='3'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>9</td>
                                <td>3</td>                           
                            </tr>
                        </tbody>
                    </table>
            `,
            direction: "row",
            answer: 0,
            desc: `일의 자리, 십의 자리에 맞춰 계산해 봅니다.`,
        },
    },
}

let data05_c_c07_15 = {
    1 : {},
    2 : {
        "1": {
            title: `□ 안에 알맞은 수를 고르세요.<p class="blue-point-box3"><span>32 × 4＝□</span></p>`,
            type: "select",
            ex: "244,128,120",
            direction: "row",
            answer: 1,
            desc: `<p>십의 자리 계산에서 올림한 수에 주의하여 계산합니다.</p>`,
        },
        "2": {
            title: `계산 결과가 더 큰 곱셈을 고르세요.`,
            type: "select",
            ex: "61 × 3,42 × 4",
            direction: "row",
            answer: 0,
            desc: `십의 자리 계산에서 올림한 수에 주의하여 계산한 다음, 계산 결과를 비교합니다.`,
        },
    },
}

let data06_c_c06_16 = {
    1 : {
        "1": {
            title: `바르게 계산한 것을 고르세요.`,
            type: "select",
            ex: `
            <table class='math-table'>
                        <tbody>                            
                            <tr>                               
                                <td></td>                               
                                <td>2</td>
                                <td>4</td>
                            </tr>
                            <tr>                               
                                <td>×</td>
                                <td></td>
                                <td>4</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='3'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>8</td>
                                <td>6</td>                           
                            </tr>
                        </tbody>
                    </table>,
                <table class='math-table'>
                        <tbody>                            
                            <tr>                               
                                <td></td>                               
                                <td>2</td>
                                <td>4</td>
                            </tr>
                            <tr>                               
                                <td>×</td>
                                <td></td>
                                <td>4</td>
                            </tr>
                            <tr class='line'>
                                <td colspan='3'></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>9</td>
                                <td>6</td>                           
                            </tr>
                        </tbody>
                </table>
            `,
            answer: 1,
            desc: `<p>일의 자리 계산에서 올림한 수에 주의하여 계산합니다.</p>`,
        },
        "2": {
            title: `계산 결과를 고르세요.<p class="blue-point-box2"><span>17 × 6</span></p>`,
            type: "select",
            ex: "142,112,102",
            answer: 2,
            desc: `일의 자리 계산에서 올림한 수에 주의하여 계산합니다.`,
        },
    },
}