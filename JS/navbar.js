$(document).ready(function(){

    //Funktion för sticky top

    $(window).scroll(function(){
        let sticky = $('.sticky'),
            scroll = $(window).scrollTop();
            
        if (scroll >= 70) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
        });
    
        //Funktion för sidemenu
    
        $(".openbtn").on("click", function(){
    
            $(".sidenav").toggleClass("active");
    
        });
    
        $(".closebtn").on("click", function(){
    
            $(".sidenav").toggleClass("active");
    
        })
    
        //Search field
    
        $(".search-glass").on("click", function(){
            $(".search-field").toggleClass("active");
        });
    
        // Varukorgen
        $(".cart-icon").on("click", function(){
    
            $(".cartnav").toggleClass("cart-active");
    
        });
    
        $(".cartbtn").on("click", function(){
    
            $(".cartnav").toggleClass("cart-active");
    
        })
  

        //funktion för att skicka vidare produkter till varukorg

    let information = localStorage.getItem("product");
    let productInfo = JSON.parse(information);

    let prefix = "";
    if(window.location.href.indexOf("index.html") < 0) {
        prefix = "../";
    }

    $(".img-cart").append($("<img>").attr({"src":prefix + productInfo[0].picture, "class": "ml-2", "alt": productInfo[0].name + " perfume"}));

    $("#name").text(productInfo[0].name);

    $("#price").text(productInfo[0].smallprice + ".00 kr");

    //Nedan gör det möjligt att ta bort en produkt i varukorgen

    // let removeCartItemButtons = $(".removebtn");

    // for (let i = 0; i < removeCartItemButtons.length; i++) {
    //     var button = removeCartItemButtons[i];

    //     button.addEventListener("click", function(event){
    //         let buttonClicked = event.target
    //         buttonClicked.parentElement.parentElement.remove();
    //     })
        
    // }

    // $.forEach(removeCartItemButtons, function() {
    //     let button = removeCartItemButtons[i];
    //     button.on("click", function(){

    //         var buttonClicked = event.target
    //         buttonClicked.parentElement.parentElement.remove();
    //     })
    // });



 // test för varukorg
 let shoppingCart = (function() {
 cart = [];
 function Item(name,price,total){
     this.name = name;
     this.price = price;
     this.total = total;
 }
 // addera
 function saveCart(){
     sessionStorage.setItem('ShoppingCart', JSON.stringify(cart));
 }

 function loadCart (){
     cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
 }
 if (sessionStorage.getItem("shppingCart") !=null) {
     loadCart();
 }

 let obj = {};
 obj.addItemToCart = function (name,price,total)
 {
     for(let item in productInfo){
         if(cart[item].name === name){
             cart[item].total ++;
             savveCart();
             return;
         }
     }
     let item = new Item (name,price, total);
     cart.push(item);
     saveCart();
 }
 obj.setCountForItem = function(name, total) {
     for(var i in cart) {
       if (cart[i].name === name) {
         cart[i].total = total;
         break;
       }
     }
   };
   obj.removeItemFromCart = function(name) {
     for(var item in cart) {
       if(cart[item].name === name) {
         cart[item].count --;
         if(cart[item].count === 0) {
           cart.splice(item, 1);
         }
         break;
       }
   }
   saveCart();
 }
 obj.clearCart = function() {
     cart = [];
     saveCart();
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

   // cart : Array
// Item : Object/Class
// addItemToCart : Function
// removeItemFromCart : Function
// removeItemFromCartAll : Function
// clearCart : Function
// countCart : Function
// totalCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function
return obj;
})();
// Add item
$('.btn btn-outline-secondary').click(function(event) {
event.preventDefault();
var name = $(this).data('name');
var price = Number($(this).data('price'));
shoppingCart.addItemToCart(name, price, 1);
displayCart();
});

// Clear items
$('.removebtn').click(function() {
shoppingCart.clearCart();
displayCart();
});


function displayCart() {
var cartArray = shoppingCart.listCart();
var output = "";
for(var i in cartArray) {
output += "<tr>"
 + "<td>" + cartArray[i].name + "</td>" 
 + "<td>(" + cartArray[i].price + ")</td>"
 + "<td><span class='input-group px-2'><input class='button-minus btn pl-0 pr-1' data-field=" + cartArray[i].name + ">-</button>"
 + "<input type='number' step='1' name='quantity' class='quantity-field'" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
 + "<input type='button' class='button-plus btn p-0 mr-2' data-field='quantity'" + cartArray[i].name + ">+</input></span></td>"
 + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
 + " = " 
 + "<td>" + cartArray[i].total + "</td>" 
 +  "</tr>";
}
$('.cartnav').html(output);
$('.total').html(shoppingCart.totalCart());
$('.totPrice').html(shoppingCart.totalCount());
}

// Delete item button

$('.removebtn').on("click", ".delete-item", function(event) {
var name = $(this).data('name')
shoppingCart.removeItemFromCartAll(name);
displayCart();
})
console.log(displayCart);


// -1
$('.button-minus').on("click", ".minus-item", function(event) {
var name = $(this).data('name')
shoppingCart.removeItemFromCart(name);
displayCart();
})
// +1
$('.button-plus').on("click", ".plus-item", function(event) {
var name = $(this).data('name')
shoppingCart.addItemToCart(name);
displayCart();
})

// Item count input
$('.totPrice').on("change", ".item-count", function(event) {
var name = $(this).data('name');
var count = Number($(this).val());
shoppingCart.setCountForItem(name, count);
displayCart();
});

displayCart();

});