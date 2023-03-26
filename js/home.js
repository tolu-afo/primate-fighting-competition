const subMenuItems = {
    events: [
        {text: "Upcoming", href:"#"},
        {text: "Past", href:"#"},
        {text: "PFC 69", href:"#"}
    ],
    athletes:[
        {text: "Bongo", href:"./bongo_athlete.html"},
        {text: "Mr. Tutu", href:"./tutu_athlete.html"},
        {text: "Wallabee", href:"./wallabee_athlete.html"},
        {text: "Se&ntilde;or Monke", href:"./senor_monkey_athlete.html"},
        {text: "Bosco the Bannana Bandit", href: "./bosco_athlete.html"},
        {text: "Johnny Half-Man, Half-chimpanzee", href: "./johnny_athlete.html"},
    ],
    watch: [
        {text: "BannanaTV", href:"#"},
        {text: "Find a Local Zoo", href:"#"},
        {text: "Local Underground Fighting Rings", href:"#"}
    ]
}

const faceOffs = [
    {name: 'Bongo', src: '../images/faceoffs/bongo_faceoff.png'},
    {name: 'Mr. Tutu', src:'../images/faceoffs/mrtutu_faceoff.png'},
    {name: 'Wallabee', src:'../images/faceoffs/wallabee_faceoff.png'},
    {name: 'Se&ntilde;or Monke', src:'../images/faceoffs/senormonke_faceoff.png'},
    {name: 'Bosco the Bannana Bandit', src: '../images/faceoffs/bannana_bandit_faceoff.png'},
    {name: 'Johnny Half-man, half-chimpanzee', src:'../images/faceoffs/johnny_faceoff.png'}
]

const fighterProfiles = [
    {name: 'Bongo', nickname: 'Bongo', faceoffImg: '../images/faceoffs/bongo_faceoff.png', record: '27-1-0', subWins: 8, knockoutWins: 12},
    {name: 'Cameron Tutulungu', nickname: 'Mr. Tutu', faceoffImg: '../images/faceoffs/mrtutu_faceoff.png', record: '25-2-0'}
]

const navItems = document.querySelectorAll('.menu-item');

navItems.forEach(item=>{
    item.addEventListener("mouseenter", underLine);
    item.addEventListener("mouseenter", showAndPopulateSubMenu);
})

const optionsTopBar = {
    rootMargin: '0px',
    threshold: .7
}

const optionsGrid = {
    rootMargin: '1000px 0px 0px 0px',
    threshold: .3
}

window.addEventListener("scroll", (e) => {
    const targetEl = document.getElementById('desktop-menu');

    const callback = (entries, observer) => {
        let entry = entries[0];
        if (!entry.isIntersecting){
            staticMenuTrigger();
        }
        else{
            staticMenuUntrigger();
        }   
    }

    const observer = new IntersectionObserver(callback, optionsTopBar);
    observer.observe(targetEl)
});


window.addEventListener("scroll", () => {
    let ratio = scrollRatio();

    if (ratio > 1.2){
        hideSplash();
    }else{
        showSplash();
    }

    document.body.style.setProperty('--scroll', Math.min(ratio, 1))
}, false);

const hideSplash = () => {
    const splash = document.querySelector('.footer');
    splash.style.zIndex = 0;
}

const showSplash = () => {
    const splash = document.querySelector('.footer');
    splash.style.zIndex = -2;
}

const scrollRatio = () => {
    return 1.4*(window.pageYOffset / (document.body.offsetHeight - window.innerHeight))
}

// Add event listener per item for scroll animation effect
const gridItems = document.querySelectorAll('.reveal').forEach(item => {
    window.addEventListener("scroll", (e)=>{
        // callback that assigns an observer to a element
        const callback = (entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting){
                revealTrigger(item);
            } else {
                revealUntrigger(item);
            }
        }

        const observer = new IntersectionObserver(callback, optionsGrid);
        observer.observe(item)
    })
})

const revealTrigger = (element) => {
    element.classList.add('active');
}

const revealUntrigger = (element) => {
    element.classList.remove('active');
}

// callback truggers function when element is intersecting screen
// need function that when triggered adds active to reveal class


const staticMenuTrigger = () => {
        const menu = document.getElementById("full-menu");
        const floatingMenu = document.getElementById("desktop-menu");
        menu.style.display = "block";
        floatingMenu.style.opacity = "0%";
}

const staticMenuUntrigger = () => {
    const menu = document.getElementById("full-menu");
    const floatingMenu = document.getElementById("desktop-menu");
    menu.style.display = "none";
    floatingMenu.style.opacity = "100%";
}

const eventBtn = document.getElementById("events-btn");
eventBtn.addEventListener('click', ()=>openMobileSubMenu('events'));

const athletesBtn = document.getElementById("athletes-btn");
athletesBtn.addEventListener('click', ()=>openMobileSubMenu('athletes'));

const watchBtn = document.getElementById("watch-btn");
watchBtn.addEventListener('click', ()=>openMobileSubMenu('watch'));

function displayFullmenu() {
    // if part of top bar is off screen, show full menu
    const targetEl = document.getElementById('desktop-menu');

    const callback = (entries, observer) => {
        let entry = entries[0];
        if (!entry.isIntersecting){
            staticMenuTrigger();
        }
        else{
            staticMenuUntrigger();
        }   
    }

    const observer = new IntersectionObserver(callback, optionsTopBar);
    observer.observe(targetEl);
}

function underLine(event){
    // moves around a underline to each menu item when it is hovered upon
    const newPos = event.target.offsetLeft;
    const newWidth = event.target.clientWidth;
    const target = event.target;
    let underline;
    if (target.id.includes("full-menu")){
        underline = document.getElementById('full-menu-underline');
    }else{
        underline = document.getElementById('floating-menu-underline');
    }

    // const underline = document.querySelector('.menu-underline');

    underline.style.left = `${newPos}px`;
    underline.style.width = `${newWidth*.5}px`;
}

// check if a item has the current sub menu parent
// remove sub menu, if you leave submenu, or you move to any other menu-item

function showAndPopulateSubMenu(event){
    let subMenu;
    if (event.target.id.includes("full-menu")){
        subMenu = document.getElementById('sub-full-menu');
    }else {
        subMenu = document.getElementById('sub-floating-menu');
    }

    if (event.target.innerHTML.includes("Events")) {
        const subContainer = subMenu.querySelector('.sub-menu-container');
        if (subContainer?.id === "events"){
            return
        }
        subMenu = populateSubMenu(subMenu, subMenuItems.events, "events");
    }else if(event.target.innerHTML.includes("Athletes")){
        const subContainer = subMenu.querySelector('.sub-menu-container');
        if (subContainer?.id === "athletes"){
            return
        }
        subMenu = populateSubMenu(subMenu, subMenuItems.athletes, "athletes")
    }else if(event.target.innerHTML.includes("Watch")){
        const subContainer = subMenu.querySelector('.sub-menu-container');
        if (subContainer?.id === "watch"){
            return
        }
        subMenu = populateSubMenu(subMenu, subMenuItems.watch, "watch")
    }    
    else {
        hideSubMenu(event);
    };

    subMenu.addEventListener("mouseleave", hideSubMenu); 
    subMenu.style.opacity = "100%";
}

function populateSubMenu(subMenu, items, id){
    const subMenuContainer = document.createElement('div');
    subMenuContainer.classList.add("sub-menu-container");
    subMenuContainer.id = id;
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `<a href="${item.href}">${item.text}</a>`;
        subMenuContainer.appendChild(menuItem);
    })
    subMenu.appendChild(subMenuContainer);
    return subMenu
}

function hideSubMenu(){
    const subMenu = document.querySelector('.sub-menu');
    const subMenuContainer = document.querySelector('.sub-menu-container');
    subMenuContainer?.parentElement.removeChild(subMenuContainer);
    subMenu.style.opacity = "0%";
}

function locateUnderline(){
    // set initial positions of underlines

    const underline = document.getElementById('floating-menu-underline');
    const underlineFull = document.getElementById('full-menu-underline');

    const pfc = document.getElementById('center-logo');
    const pfcFull = document.getElementById('center-logo-full-menu');

    const newPos = pfc.offsetLeft;
    const newWidth = pfc.clientWidth; 

    const newPosFull = pfcFull.offsetLeft;
    const newWidthFull = pfcFull.clientWidth;

    underline.style.left = `${newPos}px`;
    underline.style.width = `${newWidth*.6}px`;

    underlineFull.style.left = `${newPosFull}px`;
    underlineFull.style.width = `${newWidthFull*.6}px`;
}

// MOBILE MENU 

function openMenu(){
    const anchor = document.querySelector('.mobile-menu-icon');
    const icon = document.getElementById('menu-chevron');
    const body = document.getElementById('body');



    icon.style.transform = 'rotateZ(180deg)';
    anchor.onclick = closeMenu;
    document.getElementById("top-nav-overlay").style.height = "100%";
    body.classList.add('noscroll');
}

function closeMenu(){
    const icon = document.getElementById('menu-chevron');
    const anchor = document.querySelector('.mobile-menu-icon');
    const body = document.getElementById('body');

    body.classList.remove('noscroll');
    icon.style.transform = 'rotateZ(0deg)';
    anchor.onclick = openMenu
    document.getElementById("top-nav-overlay").style.height = "0%";
}

function openMobileSubMenu(id){
    const openedMenu = document.getElementsByClassName('open');
    openedMenu.length ? closeMobileSubMenu(openedMenu[0].id) : null;

    const subMenu = document.getElementById(id);
    subMenu.classList.add('open');
    subMenuItems[id].forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.href = item.href;
        menuItem.innerText = item.text
        subMenu.appendChild(menuItem);
    })
    subMenu.style.display = "block";
}

function closeMobileSubMenu(id){
    subMenu = document.getElementById(id);
    subMenu.classList.remove('open');
    subMenu.style.display = 'none';
    subMenu.innerHTML = '';
}

function triggerScroll(){
    var container = document.querySelector('.content-container');
    var containerTop = container.getBoundingClientRect().top + window.scrollY;
    window.addEventListener('scroll', function() {
        console.log('triggered');
        if (window.scrollY > containerTop){
            container.classList.add('show-hidden-content');
        }
    })
}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

function populateFaceOff(){
    // get elements
    const fighterImage1 = document.getElementById('fighter-image-1');
    const fighterImage2 = document.getElementById('fighter-image-2');
    const fighterText1 = document.getElementById('fighter-text-1');
    const fighterText2 = document.getElementById('fighter-text-2');

    // pick fighters
    const item1 = getRandomItem(faceOffs);
    let item2 = getRandomItem(faceOffs);

    while (item1 === item2){
        item2 = getRandomItem(faceOffs)
    }

    // set imagaes
    const fighterImg1 = document.createElement('img');
    fighterImg1.src = item1.src;
    fighterImage1.appendChild(fighterImg1);

    const fighterImg2 = document.createElement('img');
    fighterImg2.src = item2.src;
    fighterImage2.appendChild(fighterImg2);

    // set text
    fighterText1.innerHTML = `${item1.name}`;
    fighterText2.innerHTML = `${item2.name}`;
}
populateFaceOff()
locateUnderline();
displayFullmenu();