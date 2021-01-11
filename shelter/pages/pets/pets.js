window.addEventListener("load", function () {

    let mobileMenu = document.querySelector('.mobile__menu');
    let headerBox = document.querySelector('.header__box');
    let main = document.querySelector('.main');
    let burgerMenu = document.querySelector('.burger__menu');
    let shadow = document.querySelector('.shadow');
    let body = document.querySelector('.body');
    let header = document.querySelector('.header');



    burgerMenu.onclick = function () { /* Появление/исчезание меню при клике на бургер */
        this.classList.toggle('burger__menu__active');
        mobileMenu.classList.toggle('active');
        headerBox.classList.toggle('active');
        shadow.classList.toggle('active');
        body.classList.toggle('lock'); /*Блокировка прокрутки при открытом меню*/
        header.classList.toggle('active');

    };

    shadow.onclick = function (e) {  /* Убирает меню при клике вне */
        if (e.target.classList !== headerBox || e.target.classList !== mobileMenu) {
            this.classList.remove('active');
            headerBox.classList.remove('active');
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('burger__menu__active');
            body.classList.remove('lock');
            header.classList.remove('active');

        }
    };

    // document.querySelector('list__link.closed').onclick = function () { /*Запрет перехода*/
    //     document.location.href="javascript:void(0)";
    // };

    // document.querySelector('list__link.closed').onclick = function () { /*Запрет перехода*/
    //     document.location.href="javascript:void(0)";
    // };




     let url = 'https://rolling-scopes-school.github.io/pavelgitvasilev-JS2020Q3/shelter/pets.json'; //A local page

    function load(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(xhr.response);
            }
        }

        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.send('');

    }



    load(url, callback = (response) => {
        console.log(response);

        
        let resultCard = ``;
        let modalBlock = document.querySelector('#modal-result')
        let miniResult = document.querySelector('#main-card')
        response.forEach(item => {
            // console.log(item);

           let miniCard = `
            <div class="pets__card__item">
                    <img src="${item.img}" alt="${item.name}" class="pets__card__item__img">
                    <h4 class="pets__card__item__name">${item.name}</h4>
                    <button class="pets__card__item__btn transp-btn">Learn more</button>
                    <span class="noactive type">${item.type}</span>
                    <span class="noactive breed">${item.breed}</span>
                    <span class="noactive description">${item.description}</span>
                    <span class="noactive age">${item.age}</span>
                    <span class="noactive inoculations">${item.inoculations}</span>
                    <span class="noactive diseases">${item.diseases}</span>
                    <span class="noactive parasites">${item.parasites}</span>
                    </div>

            `
            resultCard = resultCard + miniCard;
        }) 
        miniResult.innerHTML = resultCard;


        let maomao = document.querySelectorAll('.pets__card__item')
        

        maomao.forEach(item => {
            item.addEventListener('click', () => {
                document.querySelector('.modal').classList.add('modal--active');
                shadow.classList.add('active');
                body.classList.add('lock');


                let image = document.querySelector('#srcType');
                let name = document.querySelector('#textName');
                let type = document.querySelector('#textType');
                let breed = document.querySelector('#textBreed');
                let description = document.querySelector('#textDescription');
                let age = document.querySelector('#textAge');
                let inoculations = document.querySelector('#textInoculations');
                let diseases = document.querySelector('#textDiseases');
                let parasites = document.querySelector('#textParasites');



                image.src = item.getElementsByClassName('pets__card__item__img')[0].getAttribute('src');
                name.innerHTML = item.getElementsByClassName('pets__card__item__name')[0].innerText;
                type.innerHTML = item.getElementsByClassName('type')[0].innerText;
                breed.innerHTML = item.getElementsByClassName('breed')[0].innerText;
                description.innerHTML = item.getElementsByClassName('description')[0].innerText;
                age.innerHTML = item.getElementsByClassName('age')[0].innerText;
                inoculations.innerHTML = item.getElementsByClassName('inoculations')[0].innerText;
                diseases.innerHTML = item.getElementsByClassName('diseases')[0].innerText;
                parasites.innerHTML = item.getElementsByClassName('parasites')[0].innerText;


            })
        })

     
        


    })

    let close = document.querySelector('.modal__close')
    close.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('modal--active');
                shadow.classList.remove('active');
                body.classList.remove('lock');
    })

    
    
    

});

