		$(document).ready(function(){

			// Favorites array

			var favorites = [];

			// Favorites function

			$(".heart").click(function(){

				$(this).toggleClass("active");

				var favId = $(this).attr("data-favorites")

				if ($.inArray(favId, favorites) == "-1") {
					favorites.push(favId);	
				}
				else {
					for(var i = favorites.length - 1; i >= 0; i--) {
					    if(favorites[i] === favId) {
					       favorites.splice(i, 1);
					    }
					}
				}
				var favoritesString = JSON.stringify(favorites);

				Cookies.set('favorites', favoritesString, { expires: 365 });

				$(".favorites").text(favorites.length);

			});

			// Read favorites cookies

			var favCookie = Cookies.getJSON('favorites');

			if (favCookie.length != 0) {
				for (var i = 0; i <= favCookie.length; i++) {
					$(".heart[data-favorites=" + favCookie[i] + "]").addClass("active");
				}
				$(".favorites").text(favCookie.length);
				favorites = favCookie;
			}

			// Cart array

			var cart = [];

			// Add to cart function

			var addToCart = function() {

				var totalPrice = 0;
				var totalQuantity = 0;

				for (var i = 0; i <= cart.length - 1; i++) {
					totalPrice = totalPrice + (cart[i].quantity * cart[i].price);
					totalQuantity = parseInt(totalQuantity) + parseInt(cart[i].quantity);
				}

				$("#cart_price").text(totalPrice);
				$("#cart_quantity").text(parseInt(totalQuantity));

				Cookies.set('cart', cart, { expires: 365 });
			}

			// Read cart cookies

			if (Cookies.get('cart') != undefined) {
				cart = Cookies.getJSON('cart');
				addToCart();
			}

			// Add to cart on click

			$(".item_add_button_submit").click(function(){ 
				var id = $(this).attr("data-button-id");
				var quantityId = $(".item_add_q[data-quantity-id=" + id +"]").val();
				var priceId = $(".item_price[data-price-id=" + id +"]").attr("data-price");
				var cartId = "item_" + id;

				var cartItem = {
					id: id,
					price: priceId,
					quantity: quantityId
				};

				cart.push(cartItem);

				addToCart();

			});

			// Delete cart

			$("#cart_delete").click(function(){				
				$("#cart_price").text("");
				$("#cart_quantity").text("0");
				cart = [];
				Cookies.remove('cart');
			});


		});