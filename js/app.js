// -------------Define Global Variables-------------
const ul = document.getElementById("navbar__list");
let sections = document.querySelectorAll("section");
const pageHeader = document.querySelector(".page__header");
// -------------End Global Variables-------------

// -------------Start Helper Functions-------------
// make the link active
function linkActiveState() {
  let i = 0;
  // Scroll to section on link click
  document.querySelectorAll("li  a").forEach((a) => {
    sections[i++].classList.contains("section__activated")
      ? a.classList.add("active")
      : a.classList.remove("active");
  });
}

//  Add class 'section__activated' to section when near top of viewport
const observer = new IntersectionObserver(
  (sections) => {
    sections.forEach((section) => {
      section.target.classList.remove("section__activated");
      if (section.isIntersecting) {
        section.target.classList.add("section__activated");
        linkActiveState();
      }
    });
  },
  {
    rootMargin: "-100px 0px",
    threshold: 0.55,
  }
);

// define the add section to NavBar function
function addSectionToNavBar(counter) {
  ul.insertAdjacentHTML(
    "beforeend",
    `<li>
        <a href="#section${counter}" class="menu__link">section ${counter}</a>
    </li>`
  );
}

// define the add observer
function addObserver() {
  sections.forEach((section) => observer.observe(section));
}

// hide the navbar
function hideNavBar() {
  pageHeader.style.transform = "scaleY(0)";
}

// show the navbar
function showNavBar() {
  pageHeader.style.transform = "scaleY(1)";
}
// -------------End Helper Functions-------------

//  -------------Begin Main Functions-------------
// build the create section function
counter = 4;
function createSection() {
  document.querySelector("main .container").insertAdjacentHTML(
    "beforeend",
    `<section id="section${++counter}" data-nav="section ${counter}">
    <div class="landing__container">
      <h2>Section ${counter}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        fermentum metus faucibus lectus pharetra dapibus. Suspendisse
        potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
        lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
        convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
        eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
        nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
        lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
        tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
        vitae elit. Integer nec libero venenatis libero ultricies molestie
        semper in tellus. Sed congue et odio sed euismod.
      </p>
      <p>
        Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
        gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
        Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
        consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
        elementum tortor mollis non.
      </p>
    </div>`
  );
  sections = document.querySelectorAll("section");
  // add a link to the section to the navbar
  addSectionToNavBar(counter);
  // add an obserever to the section
  addObserver();
}

// defince the add section button
document
  .querySelector(".add__section__btn")
  .addEventListener("click", () => createSection());

// program the to-top button
const toTopBtn = document.querySelector(".to__top__btn");
window.onscroll = () => {
  if (window.scrollY >= 700) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
};

// define the Scroll to top function
toTopBtn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

// hide the navbar whlie not scrolling & while scrolling down
let preScroll = window.scrollY,
  timer = "";
window.addEventListener("scroll", () => {
  clearTimeout(timer);
  showNavBar();
  preScroll = window.scrollY;
  timer = setTimeout(() => hideNavBar(), 1000);
});

//  -------------End Main Functions-------------

// build the nav
for (let i = 1; i <= sections.length; i++) {
  addSectionToNavBar(i);
}
// run the observer for the defined sections
addObserver();
