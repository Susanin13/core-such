user = localStorage.getItem('user2');
if (user) {
    user = JSON.parse(user);
}
else {
    localStorage.setItem('user2', JSON.stringify({
        nick: "susanin",
        password: "memes",
        cart: []
    }));
}

var XMLRAW= `<?xml version="1.0"?>
<Vinyls>
    <Vinyl>
        <Name>Bleachers</Name>
        <Desc>Take The Sadness Out</Desc>
        <Price>29</Price>
        <Type>indie</Type>
        <Image>https://optim.tildacdn.com/tild6432-6264-4739-a134-313132393138/-/resize/664x/-/format/webp/f49d64c964c73b8c11c9.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>Babyshambles</Name>
        <Desc>Shooter's Nation</Desc>
        <Price>27</Price>
        <Type>indie</Type>
        <Image>https://optim.tildacdn.com/tild6632-3263-4366-b932-363239656631/-/resize/664x/-/format/webp/babyshambles-shotter.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>ArcadeFire</Name>
        <Desc>We</Desc>
        <Price>25</Price>
        <Type>indie</Type>
        <Image>https://optim.tildacdn.com/tild6136-3934-4462-b737-633836323435/-/resize/664x/-/format/webp/71asGX7OK0L_SL1500_.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>a-ha</Name>
        <Desc>Lifelines</Desc>
        <Price>39</Price>
        <Type>pop</Type>
        <Image>http://longplay.by/assets/images/33/x-a-ha-lifelines.7fd.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>ABBA</Name>
        <Desc>Arrival</Desc>
        <Price>39</Price>
        <Type>pop</Type>
        <Image>http://longplay.by/assets/images/35/x-r-396623-1489577952-2314.7fd.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>BryanAdams</Name>
        <Desc>cuts Like a Knife</Desc>
        <Price>29</Price>
        <Type>pop</Type>
        <Image>http://longplay.by/assets/images/33/x-bryan-adams-cuts-like-a-knife.7fd.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>LouisArmstrong</Name>
        <Desc>The Very Best Of</Desc>
        <Price>39</Price>
        <Type>jazz</Type>
        <Image>https://optim.tildacdn.com/tild3765-3539-4263-b130-373330636233/-/resize/664x/-/format/webp/CS699682-01A-BIG.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>MilesDavis</Name>
        <Desc>Kind of Blue</Desc>
        <Price>29</Price>
        <Type>jazz</Type>
        <Image>https://optim.tildacdn.com/tild6632-6533-4432-a530-623130313465/-/resize/664x/-/format/webp/miles-davis-kind-of-.jpg</Image>
    </Vinyl>
    <Vinyl>
        <Name>OscarPeterson Trio</Name>
        <Desc>Night Train</Desc>
        <Price>22</Price>
        <Type>jazz</Type>
        <Image>https://optim.tildacdn.com/stor3530-6136-4235-b937-376631363436/-/resize/1280x/-/format/webp/24828824.png</Image>
    </Vinyl>
</Vinyls>
`;
var parser = new DOMParser();
var xml = parser.parseFromString(XMLRAW, "text/xml");
var productsXML = xml.getElementsByTagName("Vinyl");
var productsDB = new Array();
for (i = 0; i<productsXML.length; i++) {
    productsDB.push({
        name: productsXML[i].getElementsByTagName("Name")[0].textContent,
        desc: productsXML[i].getElementsByTagName("Desc")[0].textContent,
        price: productsXML[i].getElementsByTagName("Price")[0].textContent,
        type: productsXML[i].getElementsByTagName("Type")[0].textContent,
        image: productsXML[i].getElementsByTagName("Image")[0].textContent
    })
}

window.onload = () => {
    var sum = 0;
    if (document.getElementsByClassName('music-product-card')[0]) {
        var elemq = document.getElementsByClassName("music-product-card")[0];
        user.cart.map((elem)=>{
            sum+=parseInt(elem.price);
            elemq.insertAdjacentHTML('afterbegin', `
            <div class="album-info-container1">
                    <div class="image-container-with-text">
                    <div class="image-container3">
                    <div class="div-style-2e5fed95">
                    <img src=`+ elem.image+ ` class="image-container" />
                    </div>
                    </div>
                    <div class="vertical-spacing-container">
                    <p class="highlighted-text-box">2</p>
                    </div>
                    </div>
                    <div class="album-info-container">
                    <p class="album-info-text">`+ elem.name + `: ` + elem.desc +`</p>
                    <p class="album-price-text-style">` + elem.price + '$' + `</p>
                    </div>
            </div>
            `)
        });
        document.getElementsByClassName("total-amount-display-style")[0].innerHTML = sum + '$';
    }
    if (document.getElementsByClassName("button-buy")) {
        var marker = false;
        user.cart.map((elem)=>{
            if (elem.name===location.search.substr(1)) {
                marker=true;
            }
        });
        if (marker===true) {
            document.getElementsByClassName("button-buy")[0].innerHTML="Удалить";
            }
            else {
                document.getElementsByClassName("button-buy")[0].innerHTML="В корзину";
            }
    }
    if (document.getElementsByClassName("lp-info")) {
        loadProductInfo();
    }
    else {
    document.getElementsByClassName("genre-tab")[0].style = "border-bottom: 1px solid";
    if (document.getElementsByClassName("product-cards-indie")) {
        var elem = document.getElementsByClassName("product-cards-indie")[0];
        for (j=0; j<4; j++) {
        elem.insertAdjacentHTML("beforeend", `
        <div class="product-card">
        <img class="product-card-img" src="" alt="">
        <div class="label-underline">
        </div>
        <div class="price"></div>
      </div>
        `);
    }
        for (i = 2, k=0; i<elem.childNodes.length; i+=3, k++) {
            elem.childNodes[i].childNodes[1].src = productsDB[k].image;
            elem.childNodes[i].childNodes[5].innerHTML = productsDB[k].price +'$';
            elem.childNodes[i].childNodes[3].insertAdjacentHTML('beforeend',  productsDB[k].name + ': <br><span style="font-size: 18px;">' +productsDB[k].desc+'</span>' );
        }
    }
}
};
function loadProductInfo() {
    var tovar = location.search.substr(1);
    productsDB.map((elem) => {
        if (tovar === elem.name) {

            document.getElementsByClassName("image")[0].style = "background-image: url("+elem.image+");";
            document.getElementsByClassName("lp-name")[0].insertAdjacentHTML('beforeend', elem.name + ': <span style="font-size: 45px;">'+ elem.desc+'</span>')
            document.getElementsByClassName("price")[0].innerHTML = elem.price + '$';
            
        }
    })
}
function addCart() {
    var el = document.getElementsByClassName("button-buy")[0];
    var tovar = location.search.substr(1);
    var del = false;
    console.log(el.innerHTML);
    if (el.innerHTML === "Удалить") {
        user.cart = user.cart.filter(function (item) {
            return item.name !== tovar;
        });

        localStorage.setItem('user2', JSON.stringify(user));
        el.innerHTML = "В корзину";
    } else if (el.innerHTML === "В корзину") {
        el.innerHTML = "Удалить";
        productsDB.map((elem) => {
            if (tovar === elem.name) {
                user.cart.push(elem);
                localStorage.setItem('user2', JSON.stringify(user));
            }
        });
    }
}
function subscribe() {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("email").value)) {
        alert("Вы подписались на рассылку!");
        document.getElementById("email").value = "";
    }
    else {
        alert("Неверная почта!");
    }
}
function showGenre(genre) {
    // Скрыть все карточки товаров
    var productCards = document.querySelectorAll('.product-cards');
    for (var i = 0; i < productCards.length; i++) {
        productCards[i].style.display = 'none';
    }
    // Показать карточки товаров выбранного жанра
    document.querySelector('.' + genre).style.display = 'flex';

    const genres = document.getElementsByClassName("genre-tab");
    console.log(genres);
    if (genre == 'indie') {
        genres[0].style = "border-bottom: 1px solid";
        genres[1].style = "border-bottom: none";
        genres[2].style = "border-bottom: none";
    }
    if (genre == 'pop') {
        genres[1].style = "border-bottom: 1px solid";
        genres[0].style = "border-bottom: none";
        genres[2].style = "border-bottom: none";
    }
    if (genre == 'jazz') {
        genres[2].style= "border-bottom: 1px solid";
        
        genres[1].style = "border-bottom: none";
        genres[0].style = "border-bottom: none";
    }
}

// Функция для переключения класса clicked при нажатии на кнопку
function toggleDropdown(dropdown) {
    dropdown.classList.toggle('clicked');
}

// Получаем все кнопки выпадающих меню
const dropdownButtons = document.querySelectorAll('.dropbtn');

// Перебираем каждую кнопку и добавляем обработчик события
dropdownButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const dropdown = button.nextElementSibling; // Получаем следующий элемент (выпадающее меню)
        toggleDropdown(dropdown); // Вызываем функцию для переключения класса clicked
    });
});

// Получаем все элементы лайков и дизлайков
const likeIcons = document.querySelectorAll('.like');
const dislikeIcons = document.querySelectorAll('.dislike');
// Получаем все счетчики лайков и дизлайков
const likeCounters = document.querySelectorAll('.like-counter');
const dislikeCounters = document.querySelectorAll('.dislike-counter');

// Перебираем каждый элемент лайка и дизлайка
likeIcons.forEach((likeIcon, index) => {
    likeIcon.addEventListener('click', () => {
        // Проверяем, был ли уже поставлен дизлайк
        const isDisliked = dislikeIcons[index].classList.contains('clicked');
        // Если был, убираем дизлайк и уменьшаем счетчик
        if (isDisliked) {
            dislikeIcons[index].classList.remove('clicked');
            let currentDislikeCount = parseInt(dislikeCounters[index].textContent);
            dislikeCounters[index].textContent = currentDislikeCount - 1;
        }
        // Увеличиваем счетчик лайков на 1 при клике
        let currentCount = parseInt(likeCounters[index].textContent);
        likeCounters[index].textContent = currentCount + 1;
        // Помечаем лайк как выбранный
        likeIcon.classList.add('clicked');
    });
});

dislikeIcons.forEach((dislikeIcon, index) => {
    dislikeIcon.addEventListener('click', () => {
        // Проверяем, был ли уже поставлен лайк
        const isLiked = likeIcons[index].classList.contains('clicked');
        // Если был, убираем лайк и уменьшаем счетчик
        if (isLiked) {
            likeIcons[index].classList.remove('clicked');
            let currentLikeCount = parseInt(likeCounters[index].textContent);
            likeCounters[index].textContent = currentLikeCount - 1;
        }
        // Увеличиваем счетчик дизлайков на 1 при клике
        let currentCount = parseInt(dislikeCounters[index].textContent);
        dislikeCounters[index].textContent = currentCount + 1;
        // Помечаем дизлайк как выбранный
        dislikeIcon.classList.add('clicked');
    });
});
