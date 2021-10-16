// Define Global Variables
const UL = document.getElementById("navbar__list");
let sections = document.querySelectorAll("section");
const PAGE_HEADER = document.querySelector(".page__header");

// add an anchor to the section function
function addAnchorToSection(counter) {
  UL.insertAdjacentHTML(
    "beforeend",
    `<li>
        <a href="#section${counter}" class="menu__link">section ${counter}</a>
    </li>`
  );
}

// add anchor for the defined sections
for (let i = 1; i <= sections.length; i++) {
  addAnchorToSection(i);
}

// make the first anchor active for the first section
document.querySelector("li a").classList.add("active");

// create section function
counter = 4;
function createSection() {
  // add a new section
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

  // update the sections
  sections = document.querySelectorAll("section");

  // add an anchor to the section in the navBar
  addAnchorToSection(counter);
}

// add a new section button
document
  .querySelector(".add__section__btn")
  .addEventListener("click", () => createSection());

// hide the navbar whlie not scrolling & while scrolling down
let preScroll = window.scrollY,
  timer = "";

window.addEventListener("scroll", () => {
  // stop the timer
  clearTimeout(timer);

  // show the navBar onscroll
  PAGE_HEADER.style.transform = "scaleY(1)";
  preScroll = window.scrollY;

  // hide the navBar after 1s if no scrolling is happening
  timer = setTimeout(() => (PAGE_HEADER.style.transform = "scaleY(0)"), 1000);

  //  activate the section in viewport and activate its anchor
  sections.forEach((section) => {
    let top = section.getBoundingClientRect().top;
    if (top < 250 && top >= -250) {
      section.classList.add("your-active-class");
      document
        .querySelector(`[href = "#${section.id}"]`)
        .classList.add("active");
    } else {
      section.classList.remove("your-active-class");
      document
        .querySelector(`[href = "#${section.id}"]`)
        .classList.remove("active");
    }
  });
});

// to-top button
const TO_TOP_BUTTON = document.querySelector(".to__top__btn");
window.onscroll = () => {
  if (window.scrollY >= 700) {
    // show the button if scrolly is bigger than 700
    TO_TOP_BUTTON.style.display = "block";
  } else {
    // hide the button if scrolly is less than 700
    TO_TOP_BUTTON.style.display = "none";
  }
};

// Scroll to top function
TO_TOP_BUTTON.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
