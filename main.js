let filters = [];
const filtersBtns = document.querySelectorAll(".right-section ul li a");
const filtersContainer = document.querySelector(".filter-items");
const ulFilters = filtersContainer.querySelector(".filters ul");
const container = document.querySelector(".items");

/* get the filter based on user click event on each item*/
filtersBtns.forEach((filterbtn) => {
  filterbtn.addEventListener("click", function (e) {
    e.preventDefault();
    filtersContainer.className = "filter-items active";
    let value = filterbtn.innerHTML.trim();
    if (filters.includes(value) === false) {
      filters.push(value);
      ulFilters.innerHTML += `
            <li><span>${value}</span><a href="#" aria-label="remove filter" class="removeFilter"><img src="./images/icon-remove.svg" alt="remove element icon"></a></li>
            `;
      container.classList.add("filter-active");
      update();
    }
  });
});

const items = document.querySelectorAll(".item");

/* update page when filter is applied */
const update = () => {
  items.forEach((item) => {
    let jobRequirements = Array.from(
      item.querySelectorAll(".right-section ul li a")
    ).map((el) => el.innerHTML);
    let count = 0;
    for (let i = 0; i < filters.length; i++) {
      if (jobRequirements.includes(filters[i])) {
        count += 1;
      }
    }
    if (count !== filters.length) {
      item.className += " hide";
    }
  });
};

/* remove filters on click  */

ulFilters.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.className === "removeFilter") {
    let elem = e.target.parentElement;
    filters = filters.filter((el) => el !== elem.children[0].innerHTML.trim());
    elem.remove();
    items.forEach((item) => {
      item.classList.remove("hide");
    });
    update();
    if (ulFilters.children.length === 0) {
      restoreDefault();
      console.log("yow");
    }
  }
});

/* remove filters and restore default style*/
const restoreDefault = () => {
  items.forEach((item) => {
    item.classList.remove("hide");
  });
  filtersContainer.classList.remove("active");
  container.classList.remove("filter-active");
  filters = [];
};

document.querySelector("#clear").addEventListener("click", (e) => {
  e.preventDefault();
  ulFilters.innerHTML = "";
  restoreDefault();
});
