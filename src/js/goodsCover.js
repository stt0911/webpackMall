require('jquery');
require('../css/goodsCover.less');
var state = {
    num: 1,
    choice: false
}
function init() {
    bindEventSpect();
}
init();

function bindEventSpect() {
    $('.buy_spect_wrap ul').on('click', '.buy_spect_li',function () { //事件委托 - 父级监听事件
        state.choice = true; //规则选择标志
        $('.buy_spect_li').removeClass('active')
        $(this).addClass('active');
        $('.price_value').html($(this).attr('data-price')); //获取标签上的价格属性获得价格
        state.num = 1; //需要重置数量
        $('.buy_number_value').html(state.num);
    })
    $('.buy_number_decrease').click(function () {
        if(state.num > 1) {
            $('.buy_number_value').html(--state.num);
        }    
    })
    $('.buy_number_add').click(function () {
        $('.buy_number_value').html(++state.num);
    })
    $('.buy_ok').click(function () {
        if(state.choice == true) {
            alert('提交成功');
            window.open('http://localhost:8080/index.html');
        }else {
            alert('请选择规则');
        }
    })
}


