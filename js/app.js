// Define Global Variables
const UL = document.getElementById("navbar__list");
let sections = Array.from(document.getElementsByTagName("section"));
const PAGE_HEADER = document.querySelector(".page__header");
let preScroll = window.scrollY;
let timer = "";
const TO_TOP_BUTTON = document.querySelector(".to__top__btn");
let counter;

  /*
   add an anchor to the section in the navBar,
   add the dynamic navigation functionality,
   generate a new navigation item.
  */
function addAnchorToSection(counter) {
  const LI = document.createElement("li");
  LI.classList.add("menu__link");
  LI.setAttribute("data-scroll", `#section${counter}`);
  LI.textContent = `section ${counter}`;
  // add the smooth scroll functionality to the anchor  
  LI.addEventListener("click", () =>
    window.scrollTo({
      top: sections[counter - 1].offsetTop - 100,
      behavior: "smooth",
    })
  );
  UL.appendChild(LI);
};

// add anchors for the defined sections
for (counter in sections) {
  addAnchorToSection(++counter);
}

// make the first anchor active for the first section
document.querySelector("li").classList.add("active");

// create section function
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
  sections = Array.from(document.getElementsByTagName("section"));

  /*
   add an anchor to the section in the navBar,
   add the dynamic navigation functionality,
   generate a new navigation item.
  */  
  addAnchorToSection(counter);
};

// add a new section button
document.querySelector(".add__section__btn").onclick = () => createSection();

// hide the navbar whlie not scrolling
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
      section.classList.add("section__activated");
      document
        .querySelector(`[data-scroll = "#${section.id}"]`)
        .classList.add("active");
    } else {
      section.classList.remove("section__activated");
      document
        .querySelector(`[data-scroll = "#${section.id}"]`)
        .classList.remove("active");
    }
  });
});

// to-top button
window.onscroll = () => {
  window.scrollY >= 700
    ? // show the button if scrolly is bigger than 700
      (TO_TOP_BUTTON.style.display = "block")
    : // hide the button if scrolly is less than 700
      (TO_TOP_BUTTON.style.display = "none");
};

// Scroll to top function
TO_TOP_BUTTON.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
