const lenis = new Lenis({
    duration: 3, // ⬅️ increase to make scrolling slower (default is 1.2)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
    smooth: true,
    autoRaf: true
});

gsap.registerPlugin(ScrollTrigger);


const loader = () => {

    gsap.to("#loader", {
        delay: 1,
        duration: 0.5,
        top: "-100%",
    })
    gsap.from("#loader h1 span", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.in",
    })
    gsap.to("#loader-green", {
        delay: 1,
        duration: 0.7,
        top: "-100%",
    })

};

const navbar = () => {
    let tl = gsap.timeline()
    tl.pause()
    tl.from("#full", {
        duration: 0.1
    });
    tl.to("#full", {
        right: "0",
        duration: 0.5,
    })

    tl.from("#full #cross", {
        x: 50,
        duration: 0.2,
        opacity: 0
    })
    tl.from("#full ul li", {
        x: 50,
        duration: 0.2,
        opacity: 0,
        stagger: 0.2
    })

    document.querySelector("#menu-open").addEventListener("click", () => {
        tl.play()
    })

    document.querySelector("#cross").addEventListener("click", () => {
        tl.reverse()
    })

}



const heroSection = () => {
    const text = document.querySelector("#hero-section #hero-text").textContent
    const splittedText = text.split("");
    console.log(splittedText);

    var clutter = "";
    splittedText.forEach((a, id) => {
        var half = Math.floor(splittedText.length / 2)

        if (id < half) {
            clutter += `<span class="a">${a}</span>`
        } else {
            clutter += `<span class="b">${a}</span>`
        }
    })
    document.querySelector("#hero-section #hero-text").innerHTML = clutter



    gsap.from("#hero-section #hero-text span", {
        scale: 2,
        delay: 1,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "sine.out"
    });


    
    gsap.from(".upper-animate", {
        y: 100,
        delay: 1,
        opacity: 0,
        duration: 0.5,
        ease: "sine.out"
    });
    
    gsap.to("#scroll-text",{
        opacity:0,
        duration:1,
        scrollTrigger:{
            trigger:"#about-section",
            start:"top 90%",
            
        toggleActions: "play none none reverse",
        }
    });

};




const workItems = document.querySelectorAll(".work");

workItems.forEach((work) => {
    const workImage = work.querySelector(".hover");
    const overlay = work.querySelector(".overlay");
    const linkButton = work.querySelector(".details a");

    work.addEventListener("mousemove", (e) => {
        const bounds = work.getBoundingClientRect(); // get work box position

        gsap.to(workImage, {
            x: e.clientX - bounds.left - 150, // adjust relative to work
            y: e.clientY - bounds.top - 400,
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.to(workImage, {
            opacity: 1,
            duration: 0.2,
            ease: "power1.out"
        });


        // gsap.to(linkButton, {
        //   display: "flex",
        //   duration: 0.2,
        //   ease: "power1.out"
        // });
    });

    work.addEventListener("mouseenter", () => {
        gsap.to(overlay, { background: 'rgba(0, 0, 0, 0.3)', duration: 0.2 });
    });
    work.addEventListener("mouseleave", () => {
        gsap.to(workImage, { opacity: 0, duration: 0.2 });
        gsap.to(overlay, { background: 'rgba(0, 0, 0, 0)', duration: 0.2 });
        gsap.set(linkButton, { display: "none" });
    });
});



gsap.utils.toArray(".work-column").forEach((col, index) => {
    const speed = 0.3 + index * 0.2; // column 1 = 0.3, column 2 = 0.5, etc.

    gsap.to(col, {
        y: () => -(col.scrollHeight * speed),
        ease: "none",
        scrollTrigger: {
            trigger: "#work",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});



ScrollTrigger.create({
    trigger: "#tech-stack",
    start: "top center",
    //   end: "top top",
    onEnter: () => gsap.to("body", { backgroundColor: "#14CF93", duration: 0.3 }),
    onEnterBack: () => gsap.to("body", { backgroundColor: "#14CF93", duration: 0.3 }),
    //   onLeave: () => gsap.to("body", { backgroundColor: "#000", duration: 0.3 }),
    onLeaveBack: () => gsap.to("body", { backgroundColor: "#000", duration: 0.3 }),
    // markers: true
});

gsap.from("#tech-stack-heading", {
    x: -100,
    opacity: 0,
    delay: 0.5,
    duration: 0.5,
    scrollTrigger: {
        trigger: "#tech-stack",
        // markers:true,
        start: "top center",
        toggleActions: "play none none reverse",
    }
})

ScrollTrigger.create({
    trigger: "#tech-stack",
    start: "top top",
    end: () => `+=${document.querySelectorAll(".techItem").length * 100}vh`, // dynamically adjust
    pin: true,
    scrub: true,
    // markers: true
});
document.querySelectorAll('.techItem').forEach((item) => {
    const bar = item.querySelector('.techItem-progressBar');

    // Set initial scale of the progress bar
    gsap.set(bar, { scaleY: 0, transformOrigin: 'bottom' });

    // Animate the progress bar
    gsap.to(bar, {
        scaleY: 1,
        scrollTrigger: {
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            //   markers: true,
            toggleActions: "play none none reverse",
        }
    });

    // Add and remove active class based on scroll
    ScrollTrigger.create({
        trigger: item,
        start: 'top center',
        end: 'bottom center',
        ease: '',
        toggleActions: "play none none reverse",
        onEnter: () => setActive(item),
        onEnterBack: () => setActive(item),
    });
});

// Activate one item at a time
function setActive(current) {
    document.querySelectorAll('.techItem').forEach(el =>
        el.classList.remove('active')
    );
    current.classList.add('active');
}


// Achievments 

gsap.from("#achievments .achievment-row", {
    y: 100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#achievments",
        // markers:true,
        start: "top center",
        toggleActions: "play none none reverse",
    }
})
gsap.from("#achievments .image-highlight", {
    y: 100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#achievments",
        // markers:true,
        start: "top center",
        toggleActions: "play none none reverse",
    }
})
gsap.from("#achievments h2", {
    y: 100,
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
        trigger: "#achievments",
        // markers:true,
        start: "top center",
        toggleActions: "play none none reverse",
    }
})



loader();
navbar();
heroSection();