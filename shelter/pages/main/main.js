window.addEventListener("load", function () {

    let mobileMenu = document.querySelector('.mobile__menu');
    let headerBox = document.querySelector('.header__box');
    let main = document.querySelector('.main');
    let burgerMenu = document.querySelector('.burger__menu');
    let shadow = document.querySelector('.shadow');
    let body = document.querySelector('.body');


    burgerMenu.onclick = function () {
        /* Появление/исчезание меню при клике на бургер */
        this.classList.toggle('burger__menu__active');
        mobileMenu.classList.toggle('active');
        headerBox.classList.toggle('active');
        shadow.classList.toggle('active');
        body.classList.toggle('lock'); /*Блокировка прокрутки при открытом меню*/
    };

    shadow.onclick = function (e) {
        /* Убирает меню при клике вне */
        if (e.target.classList !== headerBox || e.target.classList !== mobileMenu) {
            this.classList.remove('active');
            headerBox.classList.remove('active');
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('burger__menu__active');
            body.classList.remove('lock');

        }
    };

    document.querySelector('.hero__btn').onclick = function () {
        /* Переход на другой сайт по клику */
        document.location.href = "../pets/pets.html";
    };

    document.querySelector('.pets__button').onclick = function () {
        /* Переход на другой сайт по клику */
        document.location.href = "../pets/pets.html";
    };

    document.querySelector('.list__link.closed').onclick = function () {
        /*Запрет перехода*/
        document.location.href = "javascript:void(0)";
    };



    // popup



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


    // slider

    class SliderCarousel {
        constructor({
            main,
            wrap,
            next,
            prev,
            infinity = false,
            slidesToShow = 1,
            responsive = [],
            position = 0
        }) {
            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.slides = document.querySelector(wrap).children;
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slidesToShow = slidesToShow;
            this.options = {
                position,
                infinity,
                whidthSlide: 109
            };
            this.responsive = responsive;

        }

        init() {
            this.addClass();
            this.addStyle();
            if (this.prev && this.next) {
                this.controlSlider();
            } else {
                this.addArrow();
                this.controlSlider();
            }
            if (this.responsive) {
                this.responsInit();
            }
        }



        addClass() {
            this.main.classList.add('main__slider');
            this.wrap.classList.add('wrap__slider');
            for (const item of this.slides) {
                item.classList.add('wrap__slider--item')
            }
        }

        controlSlider() {
            this.prev.addEventListener('click', this.prevSlider.bind(this))
            this.next.addEventListener('click', this.nextSlider.bind(this))
        }

        prevSlider() {
            if (this.options.infinity || this.options.position > 0) {
                --this.options.position
                if (this.options.position < 0) {
                    this.options.position = this.slides.length - this.slidesToShow
                }
                this.main.style.transform = `translateX(-${this.options.position * this.options.whidthSlide}%)`
            }
        }

        nextSlider() {
            if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
                ++this.options.position
                if (this.options.position > this.slides.length - this.slidesToShow) {
                    this.options.position = 0;
                }
                this.main.style.transform = `translateX(-${this.options.position * this.options.whidthSlide}%)`
            }
        }

        responsInit() {
            const slidesToShowDefault = this.slidesToShow;
            const allResponseiveBreakpoint = this.responsive.map(item => item.breakpoint)
            // console.log(allResponseiveBreakpoint);
            const maxResponsive = Math.max(...allResponseiveBreakpoint);
            const checkResponsive = () => {
                const widthWindow = document.documentElement.clientWidth;
                if (widthWindow < maxResponsive) {
                    for (let i = 0; i < allResponseiveBreakpoint.length; i++) {
                        if (widthWindow < allResponseiveBreakpoint) {
                            this.slidesToShow = this.responsive[i].slidesToShow;
                            this.options.whidthSlide = Math.floor(109 / this.slidesToShow);
                            this.addStyle();
                        }
                    }
                } else {
                    this.slidesToShow = slidesToShowDefault;
                    this.options.widthWindow = Math.floor(109 / this.slidesToShow)
                    this.addStyle();
                }
            };
            checkResponsive();

            window.addEventListener('resize', checkResponsive())
        }



        addStyle() {
            let style = document.getElementById('sliderCarousel-style');
            console.log(style);
            if (!style) {
                style = document.createElement('style');
                style.id = 'sliderCarousel-style';
            }


            style.textContent = `
            .main__slider {
                // overflow: hidden;
                transition:  1s;
                will-change: transform;
            }
            .wrap__slider {
                transition:  1s;
                will-change: transform;
            }
            .wrap__slider--item {

            }
            `
            document.head.appendChild(style);
        }
    }


    const options = {
        main: '.pets__card__slidertrack',
        wrap: '.pets__card__item',
        prev: '#prev__slider',
        next: '#next__slider',
        infinity: true,
        responsive: [{
                breakpoint: 1280,
                slidesToShow: 2
            },
            {
                breakpoint: 768,
                slidesToShow: 1
            }
        ]
    }

    const carousel = new SliderCarousel(options);

    carousel.init();


});
