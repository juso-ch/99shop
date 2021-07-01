
var shoppingCart = (function() {

  var cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  var obj = {};
	
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
	if (currentBalance-price <= 0) {
		return;
	}
	  
	var newBalance;

    for(var item in cart) {
      if(cart[item].name === name) {
		  
		if (cart[item].count >= 99) {
			return;
		}
		  
        cart[item].count ++;
		  
		var currentItem = document.getElementById("qty-"+name);
		currentItem.innerHTML = cart[item].count;
		
		newBalance = currentBalance - price;		  
		animateValue(currentBalance, newBalance);  
		currentBalance = currentBalance - price;
		  
        return;
      }
    }
	  
	newBalance = currentBalance - price;		  
	animateValue(currentBalance, newBalance);  
	currentBalance = currentBalance - price;
	  
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
			
		  newBalance = currentBalance + price;		  
		  animateValue(currentBalance, newBalance);  
		  currentBalance = currentBalance + price;
			
		  var currentItem = document.getElementById("qty-"+name);
	  	  currentItem.innerHTML = cart[item].count;
			
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
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


// Add and remove triggers
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
		

// Display shopping cart
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
	
  var total = document.createElement("P");
  var totalCount = document.createElement("P");
  var br = document.createElement("BR");
  total.appendChild(document.createTextNode("Total:"));
  totalCount.appendChild(document.createTextNode(formatter.format(shoppingCart.totalCart())));
	
  cartContent.appendChild(table);
  cartContent.appendChild(br);
  cartContent.appendChild(total);
  cartContent.appendChild(totalCount);
});


// Initialize balance
var formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

var balance = document.getElementById("balance");
var initialBalance = 10000000000;
var currentBalance = initialBalance;

$(document).ready(function(){
	balance.innerHTML = formatter.format(currentBalance);
});


// Animate countdown
function animateValue(start, end) {
    if (start === end) return;
    var range = end - start;
    var current = start;
	if (Math.abs(Math.floor(range/10)) > 5) {
		var increment = Math.floor(range / 10);
	} else {
		var increment = end > start? 2 : -2;
	}
    var stepTime = 50;
    var obj = document.getElementById("balance");
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = formatter.format(current);
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


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
	