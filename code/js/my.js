$(document).ready(function () {
    function resize() {
        // 获取屏幕的宽度
        var windowWidth = $(window).width();
        var isSmallWidth = windowWidth<768;
        $('#main_slider .carousel-inner .item').each(function(i, item) {
            // 将dom对象转成jquery对象
            var $item = $(item);
            var imgsrc = isSmallWidth ? $item.data('image-xs') : $item.data('image-lg');
            $item.css('backgroundImage', 'url("' + imgsrc + '")')
            if (isSmallWidth){
                $item.html('<img src="'+imgsrc+'">');
            }else {
                $item.empty();
            }
        });

        // 控制标签页的标签宽度
        var $urlcontainer = $('.nav-tabs');

        //获取所有标签子元素的宽度
        var width = 0;

        //遍历子元素
        $urlcontainer.children().each(function (index,ele) {
            width+=$(ele).width();
        });
        //判断当前ul宽是否超出了屏幕 超出就显示滚动条 不超出不显示
        if(width > $(window).width()){
            // 将宽度结果赋值给标题
            $urlcontainer.css('width',width).parent().css('overflow-x','scroll');
        }
    }
    // $(window).on('resize',resize()).trigger('resize');
    $(window).on('resize', resize).trigger('resize');


    // 初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

    var $newsTitle = $('.newstitle');

    //点击注册事件
    $('#news .nav-pills a').on('click',function () {
        //获取当前元素
        var $this = $(this);
        //获取对应的title值
        var title = $this.data('title');
        //将title设置到相应的位置
        $newsTitle.text(title);
    });

    //固定导航栏
    var scrollTop = 0;
    var navTop = $('#top-nav').offset().top;;
    $(window).scroll(function () {
         scrollTop = $(window).scrollTop();
        //两侧跟随的广告
//         $('.left-ad,.right-ad').stop().animate({
//             'top':scrollTop+250
//         },300);
// //                点击关闭广告
//         $('.ad div').click(function () {
//             $('.ad').css({'display':'none'});
//         });
        if(scrollTop>0){
            $('.subNav').fadeIn();
        }else{
            $('.subNav').fadeOut();
        }

        //如果滚动的距离大于头部的高度 则变成固定定位 否则变成正常定位
        if (scrollTop>navTop){
            $('#top-nav').css({
                'position':'fixed',
                'top':0
            });
        }else {
            $('#top-nav').css({
                'position':'static'
            });
        }

    });

    // 手动滑动轮播图
    var $carousel = $('.carousel');


    var startX,endX,offsetX=50;
    //获取页面滑动开始位置
    $carousel.on('touchstart',function (e) {
        startX=e.originalEvent.touches[0].clientX;
    });

    //获取手指触摸位置
    $carousel.on('touchmove',function (e) {
        endX = e.originalEvent.touches[0].clientX;
    });
    //手指离开的时候计算滑动的方向和位置
    $carousel.on('touchend',function () {
        //手指滑动的距离
        var distance = Math.abs(endX-startX);
        //和控制精度进行比较
        if (distance>offsetX){
            //控制图片轮播 $(this)实现控制当前图片进行轮播
            $(this).carousel(startX>endX?'next':'prev');
        }
    });

    //li的点击事件
    // $('.subNav li').click(function () {
    //     $('html,body').stop().animate({
    //         "scrollTop" : $(".jd").eq($(this).index()).offset().top
    //     },1000);
    // });
    $('.subNav .back').click(function () {
        $('html,body').stop().animate({'scrollTop':0},200);
    });

});