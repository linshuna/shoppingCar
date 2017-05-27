var tops = -150,titleTop = -185;
var $list = $(".order-list li");//获取所有的li标签
//logo点击上拉，下拉
$logo = $(".logo");
var bol = false;
//默认状态
$(".order-list").css("top","0");
$(".first-to-app").css("top","-35px");
//点击logo
$logo.live("click",function(){
	if (!bol) {
		$(".first-to-app").animate({top:"-35px"})
		$(".order-list").animate({top:"0px"})
	}else{
		//如果没有商品不给显示
		$list = $(".order-list li");
		if ($list.length == 0) {
			return true;
		}
		$(".first-to-app").animate({top:"-235px"})
		$(".order-list").animate({top:"-200px"})

	}
	bol = !bol;
})
//商品的增减
var $minus = $(".modify a.minus");
var $plus = $(".modify a.plus");
$minus.live("click",function(){
	var num = $(this).next().val() - 0;
	num--;
	
	if (num < 1) {
		$(this).parents("li").remove();
		tops += 50;
		titleTop += 50;
		$(".order-list").animate({"top":tops+"px"});
		$(".first-to-app").animate({"top":titleTop+"px"});
		var len = $(".order-list li").length;
		if (len == 0) {//-1是否是删除了商品
			$(".first-to-app").animate({"top":"-35px"});
			$(".order-list").animate({"top":"0"});
		}
		

	}
	$(this).next().val(num); 
	sum($list);
})
$plus.live("click",function(){
	var num = $(this).prev().val() - 0;
	num++;
	$(this).prev().val(num); 
	sum($list);
})

sum($list)
//.order-list li
function sum(obj){
	//获取价格
	var price = 0,number = 0,sum = 0,totalNumber = 0,fanPrice = 0;
	$(obj).each(function(){
		price = $(this).find(".pri span").text() - 0;
		number = $(this).find("input.txt-count").val() - 0;
		totalNumber += number;
		sum += price * number;
	})
	//饭盒费加0.5元
	fanPrice = totalNumber * 0.5;
	$(".boxtotalprice").text("￥"+fanPrice);
	//饭合费和运送费
	sum += fanPrice + ($(".shippingfee").text().slice(1)-0);//slice是去掉前面的字符
	$(".totalnumber").text(totalNumber)
	$(".bill").text(sum)
}
$add = $(".add");
var bol = false;

$add.live("click",function(){
	var id = $(this).parents(".pic-food").attr("id");
	var objJson = $.parseJSON($("#foodcontext-"+id).html());//找到对应的对象
	var name = objJson.name;//菜名
	var price = objJson.price;//单价
	for (var i = 0,b = $list.length;i < b;i++) {
		idStr = $list.eq(i).attr("data-fid")
		if (id === idStr) {
			var num = $list.eq(i).find("input.txt-count").val() - 0;
			num++;
			$list.eq(i).find("input.txt-count").val(num);
			$list = $(".order-list li");//重新获取li标签
			sum($list);
			return false;//结束循环
		}
	}

	$(".order-list ul").append(
		'<li class="clearfix" data-fid="'+id+'" data-fkey="278333246_303609892">'+
              '<div class="fl na clearfix" title="大骨粉丝汤＋生煎双拼＋青瓜">'+    
                  '<div class="">'+name+'</div>'+      
              '</div>'+    
              '<div class="fl modify clearfix">'+    
                  '<a href="javascript:;" class="fl minus">-</a>'+    
                  '<input type="text" class="fl txt-count" value="1 " maxlength="2">'+    
                  '<a href="javascript:;" class="fl plus">+</a>'+  
              '</div>'+  
              '<div class="fl pri">¥<span>'+price+'</span></div>'+  
          '</li>'
	)
	tops -= 50;
	titleTop -= 50;
	$(".order-list").animate({"top":tops+"px"});
	$(".first-to-app").animate({"top":titleTop+"px"});
	$list = $(".order-list li");//重新获取li标签
	sum($list);

})

//清空商品
var $clearBtn = $(".clear-cart")
$clearBtn.live("click",function(){
	$list = $(".order-list li");
	$list.remove();
	$(".first-to-app").animate({top:"-35px"})
	$(".order-list").animate({top:"0px"})
})
	