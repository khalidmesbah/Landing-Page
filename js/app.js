/* variables */
const navBar = document.getElementById(`navbar__list`);
const pageHeader = document.querySelector(`.page__header`);
const toTopBtn = document.querySelector(`.to__top__btn`);
const newSectionBtn = document.querySelector(`.add__section__btn`);
const sectionsContainer = document.querySelector(`main .container`);
let sections = [...document.getElementsByTagName(`section`)];
let timer;
/* functions */
const activate = (sectionToBeActivated) => {
  sections.forEach((section) => {
    section.classList.toggle(
      `section__activated`,
      section === sectionToBeActivated
    );
    document
      .querySelector(`[href="#${section.id}"]`)
      .classList.toggle(`active`, section === sectionToBeActivated);
  });
};

const addSection = () => {
  const numberOfSections = ++sections.length;
  const section = document.createElement(`section`);
  section.id = `section${numberOfSections}`;
  section.innerHTML = `
  <div class="landing__container">
  <h2>Section ${numberOfSections}</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
    fermentum metus faucibus lectus pharetra dapibus. Suspendisse
    potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
    lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
    convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
    eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
    nunc eu augue. Pellentesque maximus imperdiet elit a pharetra.
    Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi
    a tincidunt felis. Sed leo nunc, pharetra et elementum non,
    faucibus vitae elit. Integer nec libero venenatis libero ultricies
    molestie semper in tellus. Sed congue et odio sed euismod.
  </p>

  <p>
    Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
    gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
    Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
    consectetur porttitor. Suspendisse imperdiet porttitor tortor,
    eget elementum tortor mollis non.
  </p>
</div>
  `;
  sectionsContainer.appendChild(section);
  observer.observe(section);
  navBar.insertAdjacentHTML(
    "beforeend",
    `<li><a href="#section${numberOfSections}" class="menu__link">section ${numberOfSections}</a></li>`
  );
  sections = [...document.getElementsByTagName(`section`)];
};
/* intersection observers */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => entry.isIntersecting && activate(entry.target));
  },
  {
    threshold: 0.5,
    rootMargin: `-100px 0px`,
  }
);

sections.forEach((section) => observer.observe(section));
/* event listeners */
newSectionBtn.addEventListener(`click`, addSection);
window.addEventListener(`scroll`, () => {
  // stop the timer for hiding the navBar
  clearTimeout(timer);
  pageHeader.classList.remove(`hide`);
  // hide the navBar after 2s if no scrolling is happening
  window.scrollY > 52 &&
    (timer = setTimeout(() => pageHeader.classList.add(`hide`), 2000));
  toTopBtn.style.display = window.scrollY >= 700 ? "block" : "none";
});

toTopBtn.addEventListener(`click`, () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
