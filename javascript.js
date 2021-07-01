		
		
var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }


  var obj = {};
	
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
	  
	if (currentBalance-price < 0) {
		return;
	}  
	  
	currentBalance = currentBalance - price;
  	balance.innerHTML = formatter.format(currentBalance);
	  
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
		  
		var currentItem = document.getElementById("qty-"+name);
		currentItem.innerHTML = cart[item].count;
		  
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
	  
	var currentItem = document.getElementById("qty-"+name);
	currentItem.innerHTML = 1;
	  	
  }
  
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  
  // Remove item from cart
  obj.removeItemFromCart = function(name, price) {
	  
	  if (currentBalance+price > initialBalance) {
		  return;
	  }
	  
      for(var item in cart) {
        if(cart[item].name === name) {			
          cart[item].count --;
			
		  currentBalance = currentBalance + price;
  	  	  balance.innerHTML = formatter.format(currentBalance);
			
		  var currentItem = document.getElementById("qty-"+name);
	  	  currentItem.innerHTML = cart[item].count;
			
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
  }
  
  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }
  
  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  
  return obj;
})();

var formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

var balance = document.getElementById("balance");
var initialBalance = 10000000000;
var currentBalance = initialBalance;

$(document).ready(function(){
	balance.innerHTML = formatter.format(currentBalance);
});

$('.plus-btn').click(function(event) {
  event.preventDefault();

  var name = $(this).data('name');
  var price = Number($(this).data('price'));

  shoppingCart.addItemToCart(name, price, 1);
});
		
$('.minus-btn').click(function(event) {
  event.preventDefault();
	
  var name = $(this).data('name');
  var price = Number($(this).data('price'));

  shoppingCart.removeItemFromCart(name, price);
})
		
		
$('#icon-cart').click(function(){
  var cartArray = shoppingCart.listCart();
  var cartContent = document.getElementById("cartList");
		
  if (cartArray.length === 0) {
	  cartContent.innerHTML = "Der Einkaufswagen ist aktuell noch leer.";
  } else {
	  cartContent.innerHTML = "";
  }
  
  var table = document.createElement('TABLE');
  table.border = '0';
  
  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);
  
  for (var i in cartArray) {
  	var tr = document.createElement('TR');
  	tableBody.appendChild(tr);
  
	var td = document.createElement('TD');
	td.appendChild(document.createTextNode(cartArray[i].count + "x " + cartArray[i].name));
	tr.appendChild(td);
  }
	
  cartContent.appendChild(table);
		
});

// Smooth scrolling
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href="#cart"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
	