
$(document).ready(function(){

  var pizza_number = 1;

  $("#new-pizza").on("click", function(){

    var html = '<div class="get-input pizza" number="-1"><p>Pizza -1</p><div class="size"><input class="Input-text" placeholder="What size is this pizza?" id="size-dropdown"></div><div class="toppings"><input class="Input-text" placeholder="How many toppings?" type="number" id="topping-number"></div></div>';

    $(".pizza[number='"+pizza_number+"']").after(html);
    pizza_number++;

    $(".pizza[number='-1'] p").html("Pizza "+pizza_number);
    $(".pizza[number='-1']").attr("number", pizza_number);

  });

  $("#save-that-dough").on("click", function(){
    // if there's input
    $("#welcome").hide();
    $("#details").show();
  });

  var pizzaSizes = [];

  $("#submit-pizzas").on("click", function(){
    //if there's Input
    var i = 0;
    $(".get-input.pizza").each(function(){
      pizzaSizes[i] = ($(this).find("#size-dropdown").val()).toLowerCase();
      i++;
    });
    console.log(pizzaSizes);

    $("#details").hide();
    $("#searching").show();

    //call search functions based on
    $("#address").val();
    $("#radius").val();

    var prices = [];
    for (i = 0; i < pizzaSizes.length; i++) {
      prices = [12.99,4.99,10.99];
      //prices[i] = getPrice(pizzaSizes[i]);
    }

    getPizza($("#address").val(), $("#radius").val());

    printPrices("Dominoes",prices);

    $(".prices").append("<div class='location' location='all'><h2>Here are all the nearby pizza locations!</h2></div>");

    setInterval(function(){
      if (places.length != 0 && $("[location='all']").children().length < 2) {
        for (i = 0; i < places.length; i++) {
          $("[location='all']").append("<p class='name'>"+places[i]+"</p>");
        }
      }
    },1000);

    $("#searching").hide();
    $("#results").show();
  });

  function printPrices(location, price) {
    var html = '<div class="location" location="'+location+'"><p class="name">'+location+'</p><div class="specific-prices"><ul></ul></div><p class="total">Total: <span></span></p></div>';
    $(".prices").append(html);
    var total = 0;
    for (var i = 0; i < price.length; i++){
      $("[location='"+location+"'] .specific-prices ul").append("<li>Pizza "+(i+1)+": $"+price[i]+"</li>");
      total += price[i];
    }
    $("[location='"+location+"'] .total span").html("$"+total);
  }

});
