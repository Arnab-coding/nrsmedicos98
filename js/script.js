/* =====================================================
   NRS MEDICOS '98 WEBSITE
   Global JavaScript
   Version 2.0
===================================================== */

"use strict";

/* =====================================================
   GLOBAL SETTINGS
   (Only edit these for future reunions)
===================================================== */

const SITE = {

    reunionDate: "2027-01-16T09:00:00",

    reunionTitle: "Reunion 2027",

    reunionVenue: "Coming Soon"

};

/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", initWebsite);

/* =====================================================
   INITIALIZER
===================================================== */

function initWebsite(){

    initStickyHeader();

    initMobileMenu();

    initBackToTop();

    initScrollAnimations();

    initHomePage();

    initMembersPage();

    initAboutPage();

    initContactPage();

    initReunionPage();

}

/* =====================================================
   STICKY HEADER
===================================================== */

function initStickyHeader(){

    const header = document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll",function(){

        if(window.scrollY>60){

            header.classList.add("sticky");

        }
        else{

            header.classList.remove("sticky");

        }

    });

}

/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu(){

    const menuBtn=document.getElementById("menuBtn");

    const navbar=document.getElementById("navbar");

    if(!menuBtn || !navbar){

        return;

    }

    menuBtn.addEventListener("click",function(){

        navbar.classList.toggle("active");

    });

}

/* =====================================================
   BACK TO TOP
===================================================== */

function initBackToTop(){

    const button=document.getElementById("backToTop");

    if(!button){

        return;

    }

    window.addEventListener("scroll",function(){

        if(window.scrollY>500){

            button.classList.add("show");

        }
        else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",function(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* =====================================================
   GENERIC SCROLL ANIMATION
===================================================== */

function initScrollAnimations(){

    const items=document.querySelectorAll(

        ".fade-up,.member-item,.coming-card,.team-card,.heritage-card"

    );

    if(items.length===0){

        return;

    }

    const observer=new IntersectionObserver(

        function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    items.forEach(function(item){

        item.classList.add("hidden");

        observer.observe(item);

    });

}

/* =====================================================
   PLACEHOLDERS
   (Implemented in next parts)
===================================================== */

function initHomePage(){}

function initMembersPage(){}

function initAboutPage(){}

function initContactPage(){}

function initReunionPage(){}

/* =====================================================
   HOME PAGE
===================================================== */

function initHomePage(){

    if(!document.querySelector(".hero")){

        return;

    }

    initHeroSlider();

    initCounters();

    initHomeCountdown();

}

/* =====================================================
   HERO SLIDER
===================================================== */

function initHeroSlider(){

    const slides=document.querySelectorAll(".hero-slide");

    const dots=document.querySelectorAll(".dot");

    if(slides.length===0){

        return;

    }

    let current=0;

    function showSlide(index){

        slides.forEach(slide=>{

            slide.classList.remove("active");

        });

        dots.forEach(dot=>{

            dot.classList.remove("active");

        });

        slides[index].classList.add("active");

        if(dots[index]){

            dots[index].classList.add("active");

        }

        current=index;

    }

    setInterval(function(){

        let next=current+1;

        if(next>=slides.length){

            next=0;

        }

        showSlide(next);

    },6000);

    dots.forEach(function(dot){

        dot.addEventListener("click",function(){

            showSlide(Number(this.dataset.slide));

        });

    });

}

/* =====================================================
   ANIMATED COUNTERS
===================================================== */

function initCounters(){

    const counters=document.querySelectorAll(".counter");

    if(counters.length===0){

        return;

    }

    let started=false;

    function runCounters(){

        if(started){

            return;

        }

        const stats=document.querySelector(".stats");

        if(!stats){

            return;

        }

        const top=stats.getBoundingClientRect().top;

        if(top<window.innerHeight-100){

            started=true;

            counters.forEach(function(counter){

                const target=Number(counter.dataset.target);

                let value=0;

                const step=Math.max(1,Math.ceil(target/80));

                function update(){

                    value+=step;

                    if(value<target){

                        counter.textContent=value;

                        requestAnimationFrame(update);

                    }

                    else{

                        counter.textContent=target;

                    }

                }

                update();

            });

        }

    }

    window.addEventListener("scroll",runCounters);

    runCounters();

}

/* =====================================================
   HOME COUNTDOWN
===================================================== */

function initHomeCountdown(){

    if(!document.getElementById("home-days")){

        return;

    }

    startCountdown(

        SITE.reunionDate,

        {

            days:"home-days",

            hours:"home-hours",

            minutes:"home-minutes",

            seconds:"home-seconds"

        }

    );

}

/* =====================================================
   REUSABLE COUNTDOWN
===================================================== */

function startCountdown(targetDate,ids){

    const finish=new Date(targetDate).getTime();

    function update(){

        const now=new Date().getTime();

        const diff=finish-now;

        if(diff<=0){

            return;

        }

        const days=Math.floor(diff/(1000*60*60*24));

        const hours=Math.floor(

            (diff%(1000*60*60*24))/

            (1000*60*60)

        );

        const minutes=Math.floor(

            (diff%(1000*60*60))/

            (1000*60)

        );

        const seconds=Math.floor(

            (diff%(1000*60))/1000

        );

        document.getElementById(ids.days).textContent=days;

        document.getElementById(ids.hours).textContent=

            String(hours).padStart(2,"0");

        document.getElementById(ids.minutes).textContent=

            String(minutes).padStart(2,"0");

        document.getElementById(ids.seconds).textContent=

            String(seconds).padStart(2,"0");

    }

    update();

    setInterval(update,1000);

}

/* =====================================================
   MEMBERS PAGE
===================================================== */

function initMembersPage(){

    if(!document.querySelector(".member-wrapper")){

        return;

    }

    console.log("Members Page Loaded");

}

/* =====================================================
   ABOUT PAGE
===================================================== */

function initAboutPage(){

    if(!document.querySelector(".about-banner")){

        return;

    }

    console.log("About Page Loaded");

}

/* =====================================================
   CONTACT PAGE
===================================================== */

function initContactPage(){

    if(!document.querySelector(".contact-banner")){

        return;

    }

    const socialCards=document.querySelectorAll(".social-card");

    socialCards.forEach(function(card){

        card.addEventListener("mouseenter",function(){

            card.style.transform="translateY(-10px) scale(1.02)";

        });

        card.addEventListener("mouseleave",function(){

            card.style.transform="translateY(0) scale(1)";

        });

    });

}

/* =====================================================
   REUNION PAGE
===================================================== */

function initReunionPage(){

    if(!document.querySelector(".reunion-banner")){

        return;

    }

    initReunionCountdown();

    initComingCards();

}

/* =====================================================
   REUNION COUNTDOWN
===================================================== */

function initReunionCountdown(){

    if(!document.getElementById("days")){

        return;

    }

    startCountdown(

        SITE.reunionDate,

        {

            days:"days",

            hours:"hours",

            minutes:"minutes",

            seconds:"seconds"

        }

    );

}

/* =====================================================
   COMING SOON CARD EFFECT
===================================================== */

function initComingCards(){

    const cards=document.querySelectorAll(".coming-envelope");

    cards.forEach(function(card){

        card.addEventListener("mouseenter",function(){

            this.style.transform="translateY(-10px)";

            this.style.boxShadow="0 20px 45px rgba(0,0,0,.18)";

        });

        card.addEventListener("mouseleave",function(){

            this.style.transform="translateY(0)";

            this.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

        });

    });

}

/* =====================================================
   PAGE LOADED
===================================================== */

window.addEventListener("load",function(){

    document.body.classList.add("loaded");

});