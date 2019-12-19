$(document).ready(function(){

    //Klass med alla egenskaper för våra objekt som finns längre ned

    function Product(n, sp, lp, pic, am) {
        this.name = n;
        this.smallprice = sp;
        this.largeprice = lp;
        this.picture = pic;
        this.amount = am;
    }

    // Klass för objekten som ska in i varukorgen

    function CartProduct(prod, amount) {
        this.product = prod;
        this.amount = amount;
    }

    //Våra objekt

    let prod1 = new Product("Super Cedar", 1200, 1850, "images/serenity-supercedar.jpg");

    let prod2 = new Product("Sunday Cologne", 1200, 1850, "images/serenity-sundaycologne.jpg");

    let prod3 = new Product("Bibliothèque", 1200, 1850, "images/serenity-bibliotheque.jpg");

    let prod4 = new Product("Bal d'Afrique", 1200, 1850, "images/serenity-baldafrique.jpg");  

    let prod5 = new Product("Blanche", 1200, 1850, "images/serenity-blanche.jpg");  
    
    let prod6 = new Product("La Tulipe", 1200, 1850, "images/serenity-latulipe.jpg");
    
    let prod7 = new Product("Sundazed", 1200, 1850, "images/serenity-sundazed.jpg");

    let prod8 = new Product("Rose of No Man's Land", 1200, 1850, "images/serenity-roseofnomansland.jpg");

    let prod9 = new Product("Pulp", 1200, 1850, "images/serenity-pulp.jpg");

    let products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9];

    //Nedan loopar igenom alla våra objekt och skapar upp dom i html

    // $.each(products, function(i){

    let cart = [];
    let storage = [];

    let prefix = "";
    if(window.location.href.indexOf("index.html") < 0) {
        prefix = "../";
    }
    
    function printProducts() {
        $.each(products, function(i){

            let prodContainer = $("<div>").addClass("prod-container col-6 col-md-4 col-lg-3 pb-4");
            let hoverProduct = $("<div>").addClass("hover-div").attr("id", "hover" +i).on("click", function() {
                storage.push(products[i]);
                location.href = "produktsida.html";
                putInStorage();
            });
            let imgContainer = $("<div>").addClass("prod-img pb-3 pb-lg-0");
            let img = $("<img>").attr({"src": prefix + products[i].picture, "alt": products[i].name + " perfume", "id": "pic"+i});
            let prodInfo = $("<div>").addClass("prod-info text-center").attr("id", "info"+i);
            let title = $("<p>").addClass("prod-name mb-0 pl-3 pt-3").html(products[i].name);
            let price = $("<p>").addClass("prod-price mb-0 pl-3").html(products[i].smallprice + " SEK");
            let iconsHover = $("<div>").addClass("icons-hover d-flex").attr("id", "icons-hover"+i);
            let hoverHeart = $("<img>").addClass("prod-heart pr-1").attr({"src": prefix + "images/heart-white-with-black.png", "id": "hover-heart" +i});
            let hoverCart = $("<img>").addClass("prod-cart pl-1").attr({"src": prefix + "images/cart-white-with-black.png", "id": "hover-cart" +i});
            let icons = $("<div>").addClass("prod-icons pr-1 pb-1");
            let heartIcon = $("<img>").addClass("heart-icon pr-1 pt-3").attr({"src": prefix + "images/heart.PNG", "id": "heart" +i});
            let cartIcon = $("<img>").addClass("cart-icon pr-1 pr-3 pt-3").attr({"src": prefix + "images/cart.PNG", "id": "cart" +i});

            $(".lp-prod-wrapper").append(prodContainer);
            prodContainer.append(hoverProduct);
            hoverProduct.append(imgContainer, prodInfo, iconsHover, icons);
            imgContainer.append(img);
            prodInfo.append(title, price);
            iconsHover.append(hoverHeart, hoverCart);
            icons.append(heartIcon, cartIcon);

            //Nedan visar info PÅ produkt-bilderna vid hover desktop

            if ($(window).width() > 990) {

                $("#hover"+i).hover(
                    function(){
                        $("#info"+i).css({
                            opacity: "1",
                            transition: "all 0.5s"
                        });
                    }, function(){
                        $("#info"+i).css({
                            opacity: "0",
                            transition: "all 0.5s"
                        })
                    }
                );

                $("#hover"+i).hover(
                    function(){
                        $("#icons-hover"+i).css({
                            opacity: "1",
                            transition: "all 0.5s"
                        });
                    }, function(){
                        $("#icons-hover"+i).css({
                            opacity: "0",
                            transition: "all 0.5s"
                        })
                    }
                );

                $("#hover-div"+i).hover(function() {
                    $(this).find('img').attr("src", "../images/cart.png");
                    }, function() {
                    $(this).find('img').attr("src", "../images/cart-white.png");
                });

                // $("#hover-cart"+i).hover(function(){
                //     $(this).find("img").attr("src", function(){
                //         return src.replace("src","cart-white.png");
                //     }, function(){
                //     $(this).find('img').attr("src", "images/ui-ux-1.png");
                //     })  
                // })

            }

            else {
                $("#info"+i).css("opacity", "1");

                $("#icons-hover" +i).css("visibility", "hidden");
            }

            //Nedan ger ett rosa hjärta vid klick på hjärtat

            $("#heart"+i).on("click", function(event){
                $(".icons").find("img:first").attr("src", "../images/heart-pink.png");
                event.stopPropagation();
            })

            //Nedan funktion höjer värdet på badge (varukorg) med 1 samt sparar objekt vi klickar på I LOCAL STORAGE

            $("#hover-cart"+i).on("click", function(event){
                event.stopPropagation();

                addToCart(products[i]);

                printCart();

                $(".cart-notification").toggleClass("message-active");

            });

            $("#cart"+i).on("click", function(event){
                event.stopPropagation();

                addToCart(products[i]);

                printCart();

                $(".cart-notification").toggleClass("message-active");

            });

        });
    }

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    function printCart() {

        $(".cart-prod-container").html("");

        let prefix = "";
        if(window.location.href.indexOf("index.html") <= 0) {
            prefix = "../";
        }

        //Räknar ut totalen av alla produkter i varukorgen och skriver ut
        let total = 0;

        $.each(cartItems, function(i){

            let cartProdContainer = $("<div>").addClass("col-12 container prod-container d-flex");
            let imgCartContainer = $("<div>").addClass("col-4 img-cart");
            let imgCart = $("<img>").attr({"src":prefix + cartItems[i].product.picture, "class": "ml-2", "alt": cartItems[i].product.name + " perfume"});
            let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
            let cartUl = $("<ul>").addClass("cart-name-size pt-4");
            let cartName = $("<p>").attr("id", "name" +i).html(cartItems[i].product.name);
            let cartSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
            let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4").attr("id", "cart-prod-price"+i);
            let cartPrice = $("<p>").attr({"class": "pr-2 text-right price", "id": "price" +i}).html((cartItems[i].product.smallprice)*(cartItems[i].amount) + "  SEK");
            let quantityWrapper = $("<span>").addClass("input-group pl-2 d-flex justify-content-end");
            let inputMinus = $("<input>").attr({"type": "button", "id": "button-minus"+i, "value": "-", "class": "button-minus btn pl-0 pr-1", "data-field": "quantity"});
            let inputValue = $("<input>").attr({"type": "number", "id": "number"+i, "step": 1, "max": "", "value": cartItems[i].amount, "class": "quantity-field", "name": "quantity"});
            let inputPlus = $("<input>").attr({"type": "button", "id": "button-plus"+i, "value": "+", "class": "button-plus btn p-0 mr-2", "data-field": "quantity"});


            $(".cart-prod-container").append(cartProdContainer);
            cartProdContainer.append(imgCartContainer, cartInfo, cartPriceContainer);
            imgCartContainer.append(imgCart);
            cartInfo.append(cartUl);
            cartUl.append(cartName, cartSize);
            cartPriceContainer.append(cartPrice, quantityWrapper);
            quantityWrapper.append(inputMinus, inputValue, inputPlus);

            $("#btnCO").on("click", function(){
                cart.push(cartItems[i]);
                addToCart();
                putInStorage();
                saveCart();
                location.href = "html/cart.html";
            }) // ökar antal :)
            $(inputPlus).on("click",function(){
                cartItems[i].amount++;
                localStorage.setItem('cart',JSON.stringify(cartItems));
                

                printCart();
                cartCount();
            })
            
            $(inputMinus).on("click",function(){
                cartItems[i].amount--;
                
                if (cartItems[i].amount === 0 ){
                    
                    cartItems.splice(i, 1);
                }
                
                localStorage.setItem('cart',JSON.stringify(cartItems));
                printCart();
                cartCount();
            })


            total += cartItems[i].product.smallprice*cartItems[i].amount;
        })

        $("#totPrice").html(total + " SEK");

    }

    function putInStorage() {
            let stringStorage = JSON.stringify(storage);
            let cartStringify = JSON.stringify(cart);
            localStorage.setItem("products", stringStorage);
            localStorage.setItem("stringCart", cartStringify);
    }

    function addToCart(cartProduct) {
            //Klass för produkten som skickas till varukorgen  

            let gotProduct = false;
            cartItems.forEach(function(item) {
                if(item.product.name === cartProduct.name) {
                    gotProduct =  true;
                    item.amount++;
                }
            });

            if (gotProduct === false) {
                cartItems.push(new CartProduct(cartProduct, 1));
            }

            cartCount();

            localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    function cartCount() {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].amount;
            
        }
        $(".badge-icon").html(total);
    }

printCart();
cartCount();
printProducts();


    function putInStorage() {
        let stringStorage = JSON.stringify(storage);
        let cartStringify = JSON.stringify(cart);
        // localStorage.clear("products");
        localStorage.setItem("products", stringStorage);
        localStorage.setItem("stringCart", cartStringify);
}
function cartEmpty(){
    let noItems = ($("<p>").attr("id", "empty").html("Your cart is currently empty.."));
    $(".cart-prod-container").append(noItems);
    setTimeout(function() {
        ($(".cart-prod-container").children().length <= 0);{
            
        }
        if ($(".cart-prod-container").children().length ==1) {
              //noItems.hide();
            }
         });
    }   
    cartEmpty() 
});
