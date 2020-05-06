require('../css/goodsInfo.less');
require('./goodsCover.js');

function getId() { //获取id值
    //location.search  ?page=2&id=1...
    var optionList = location.search.slice(1).split('&'), 
        idNum;
    optionList.forEach(function (ele, index) {
        if(ele.indexOf('id=') !== -1) {
            idNum = ele.slice(3);
        }
    })
    return idNum;
}
//使用id值进行Ajax数据获取，这里只是模拟，获取的是全部数据
function getGoodsList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/goodsList.json',
        success: function (data) {
            createGoodsInfo(data);
        } 
    })
}
getGoodsList(); //获取商品详情信息
function createGoodsInfo(data) {
    var idNum = getId(),
        dataList = data.list,
        len = dataList.length,
        str = '',
        liStr = '';
        console.log(dataList);
    for(var i = 0; i < len; i++) {
        if(dataList[i].id == idNum) { //该id对应的那条数据
            $('.infor_one_img').html('<img src="'+ dataList[i].imgurl[0] +'">');
            $('.one_name').html(dataList[i].name);
            
            dataList[i].spectList.sort(findPrice('price')); //价格进行排序
            $('.one_price').html('￥' + dataList[i].spectList[0].price + '-' + dataList[i].spectList[dataList[i].spectList.length -1].price);
            
            //图片
            dataList[i].imgurl.forEach(function (ele, index) {
                str += '<img src="'+ ele +'"/>';
            });
            $('.infor_th').append($(str));

            //规格
            dataList[i].spectList.forEach(function (ele, index) {
                //data-price属性绑定价格
                liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'">'+ ele.spect +'</li>';
            });
            $('.buy_spect_wrap ul').html(liStr);

        }
    }
}
function findPrice(str) { //参数为属性名
    return function (a, b) {
        return a[str] - b[str]; //a - b升序  b - a降序
     }
}
function bindEvent() {
    $('.infor_two').on('click', function () {
        $('.buy_wrap').css('display','block');
        $('html').css({height:'100%',overflow: 'hidden'}); //技巧解决：弹层出现，后面的就没有了滚动条
    })
    $('.buy_gray').on('click', function () { //遮罩层点击之后隐藏弹出层
        $('.buy_wrap').css('display','none');
        $('html').css({height:'100%',overflow: 'visible'});
    })
}
bindEvent();

