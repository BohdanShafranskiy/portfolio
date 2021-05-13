const jobs = [
    ['АО Law Partners', 'law-partners.png', 'https://law-partners.com.ua/', 'Богдан забезпечує дуже комфортні умови співпраці. Виготовив сайт якісно, та швидко, врахував всі побажання та вимоги. Дякуємо. &#8212; АО Law Partners']
], demoSRC = 'assets/images/works/', dom = $(document), win = $(window), nav = $('header nav');
let active = 'item__active';
function nextSlide() {
    const slides = '#home .slider .item', activeItem = $(`${slides}.${active}`);
    activeItem.removeClass(active);
    if (activeItem.next().html().indexOf('fa-arrow-right') != -1)
        $(slides).first().addClass(active);
    else
        activeItem.next().addClass(active);
}
function openWebsite(url) {
    window.location.href = url;
}
function ViewJob(index) {
    const job = jobs[index], company = job[0], imgSRC = job[1], website = job[2], review = job[3];
    $('#projectName').text(company);
    $('#modalBody').html(`<div><a href="javascript:voit(0)" onclick="openWebsite('${website}')"><img src="${demoSRC}${imgSRC}" alt="${company}"></a></div>`);
    $('#review p').html(review);
    $('.modal').addClass('open');
}
function closeModal() {
    $('.modal').removeClass('open');
}
function unactiveLinks() {
    $('header a, section').removeClass('active');
    if (dom.width() < 913)
        nav.hide();
}
function setCustomActive(id) {
    unactiveLinks();
    $(`a[href="#${id}"]`).addClass('active');
    $("#" + id).addClass('active');
}
function scrolling(id) {
    const offset = $(id).offset().top - $('header').height()
    $('html,body').animate({
        scrollTop: offset
    }, 750);
}
dom.ready(() => {
    const up = $('#toTop');
    $('header a').click(function (e) { 
        e.preventDefault();
        const ID = $(this).attr('href');
        scrolling(ID)
        unactiveLinks();
        if (ID !== '#home') {
            $(this).addClass('active');
            $(ID).addClass('active');
        } else
            setCustomActive('home');
    });
    $('#toggleNav').click((e) => {
        e.preventDefault();
        nav.slideToggle();
    });
    window.onresize = (e) => {
        if (dom.width() > 912)
            nav.show();
        else
            nav.hide();
    };
    dom.scroll(() => {
        if (dom.scrollTop() > $('header').height()) {
            const footerHeight = $('footer').height();
            up.show();
            if (win.scrollTop() + win.height() > dom.height() - footerHeight)
                up.css('bottom', footerHeight + 30);
            else
                up.css('bottom', '0');
        } else
            up.hide();
    });
    $('.button').click(function (e) { 
        e.preventDefault();
        setCustomActive('contacts');
        scrolling('#contacts');
    });
    up.click(() => {
        $('html,body').animate({ scrollTop: 0 }, 850);
        setCustomActive('home');
    });
    $('.prev').click((e) => {
        e.preventDefault();
        const slides = '#home .slider .item', activeItem = $(`${slides}.${active}`);
        activeItem.removeClass(active);
        if (activeItem.prev().html().indexOf('fa-arrow-left') != -1)
            $(slides).last().addClass(active);
        else
            activeItem.prev().addClass(active);
    });
    $('.next').click(function (e) { 
        e.preventDefault();
        nextSlide();
    });
    setInterval(() => {
        nextSlide();
    }, 30000);
    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i], name = job[0], image = job[1], content = `<div class="job-box wow flip"><a href="javascript:void(0)" onclick="ViewJob(${i})"><div class="job-description">Сайт &laquo;${name}&raquo;</div><img src="${demoSRC}${image}" alt=""><h4>${name}</h4></a></div>`;
        $('#listJobs').append(content);
    }
    dom.keydown(function (e) { 
        if (e.keyCode == 27)
            closeModal();
    });
    $('.modal').click(function (e) { 
        e.preventDefault();
        if (e.target !== e.currentTarget)
            return;
        closeModal();
    });
});
$(document).scroll(function () { 
    let activeID = '';
    $('section').each(function () {
        const id = $(this).attr('id'), scrolled = $(`#${id}`).offset().top-($('header').height()+30);
        if ($(document).scrollTop() > scrolled) {
            $('section').removeClass('active');
            $(this).addClass('active');
            activeID = id;
        }
    });
    $('header nav ul li').each(function () {
        const children = $(this).children('a'), href = children.attr('href');
        if ('#' + activeID === href) {
            $('header a').removeClass('active');
            children.addClass('active');
        }
    });
});
