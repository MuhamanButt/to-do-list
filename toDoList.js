//------------------------------------------------------------------object array
let data = [];

//------------------------------------------------------------------element object
function ListElement(id, title, note, day, hour, minute) {
  (this.id = id),
    (this.title = title),
    (this.note = note),
    (this.day = day),
    (this.hour = hour),
    (this.minute = minute),
    (this.active = true),
    (this.completed = false),
    function isCompleted() {
      return this.completed;
    },
    function isActive() {
      return this.active;
    };
}

//------------------------------------------------------------------show all
{
  let allBtn = document.getElementById("showAll");
  allBtn.addEventListener("click", showAll);
  function showAll() {
    document.getElementById("showAll").classList.add("activePage");
    document.getElementById("showCompleted").classList.remove("activePage");
    document.getElementById("showActive").classList.remove("activePage");
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      document.querySelector("#" + id).classList.add("d-none");
      if (data[i].completed == true || data[i].active == true) {
        document.querySelector("#" + id).classList.remove("d-none");
      }
    }
  }
}
//------------------------------------------------------------------show active

{
  let activeBtn = document.getElementById("showActive");
  activeBtn.addEventListener("click", showActive);
  function showActive() {
    document.getElementById("showAll").classList.remove("activePage");
    document.getElementById("showCompleted").classList.remove("activePage");
    document.getElementById("showActive").classList.add("activePage");
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      document.querySelector("#" + id).classList.add("d-none");
      if (data[i].active == true && data[i].completed == false) {
        document.querySelector("#" + id).classList.remove("d-none");
      }
    }
  }
}
//------------------------------------------------------------------show completed
{
  let completedBtn = document.getElementById("showCompleted");
  completedBtn.addEventListener("click", showCompleted);
  function showCompleted() {
    document.getElementById("showAll").classList.remove("activePage");
    document.getElementById("showCompleted").classList.add("activePage");
    document.getElementById("showActive").classList.remove("activePage");
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      document.querySelector("#" + id).classList.add("d-none");
      if (data[i].completed == true) {
        document.querySelector("#" + id).classList.remove("d-none");
      }
    }
  }
}
//------------------------------------------------------------------add menu show
{
  let add_remove_btn = document.getElementById("add-remove-btn");
  add_remove_btn.addEventListener("click", function () {
    let add_menu = document.getElementById("add-menu");
    add_menu.classList.remove("d-none");
  });
}

//------------------------------------------------------------------add menu hide
{
  let add_remove_btn = document.getElementById("add-menu-remove-btn");
  add_remove_btn.addEventListener("click", function () {
    let add_menu = document.getElementById("add-menu");
    add_menu.classList.add("d-none");
  });
}

//------------------------------------------------------------------edit menu hide

//------------------------------------------------------------------add to list
{
  let add_to_list = document.getElementById("add-to-list-btn");
  add_to_list.addEventListener("click", function () {
    let query = "#add-menu .input-row-container .col-10 .input-row";
    let title = document.querySelector(query + " .col #title").value;
    let note = document.querySelector(query + " .col #note").value;

    let day = document.querySelector(
      query + " .time-input .col #day input"
    ).value;
    let hour = document.querySelector(
      query + " .time-input .col #hour input"
    ).value;
    let min = document.querySelector(
      query + " .time-input .col #min input"
    ).value;

    let id = "tid" + (data.length + 1);
    newElement = new ListElement(id, title, note, day, hour, min);
    data.push(newElement);
    addNewElement(data.length - 1);
  });
}
//------------------------------------------------------------------add element function
function addNewElement(index) {
  let originalElement = document.getElementById("CID0");
  let cloneELM = originalElement.cloneNode(true); //if true to sb clone hpta hai wrna sirf parent bnta hai
  cloneELM.id = data[index].id;
  //cloneELM.classList.remove("d-none"); //--------------------------------------------------------------
  data[index].completed = false;
  data[index].active = true;
  document.getElementById("tasks-row").append(cloneELM);

  showAll();
  if (!document.getElementById("showAll").classList.contains("activePage")) {
    document.getElementById("showAll").classList.add("activePage");
    document.getElementById("showCompleted").classList.remove("activePage");
    document.getElementById("showActive").classList.remove("activePage");
  }

  let elm = document.getElementById(cloneELM.id);

  elm.querySelector(".task .text #time").innerHTML =
    data[index].hour + ":" + data[index].minute;
  elm.querySelector(".task .text #title").innerHTML = data[index].title;
  elm.querySelector(".task .text #note").innerHTML = data[index].note;

  let query = "#" + data[index].id + " .task .edit-bar #edit-btn";

  let edit_button = document.querySelector(query);
  edit_button.addEventListener("click", function () {
    {
      let q =
        "#" + data[index].id + " #edit-menu .row #edit-menu-remove-btn button";
      let add_remove_btn = document.querySelector(q);
      add_remove_btn.addEventListener("click", function () {
        let q = "#" + data[index].id + " #edit-menu";
        let edit_menu = document.querySelector(q);
        edit_menu.classList.add("d-none");
      });
    }
    {
      let add_remove_btn = document.getElementById("add-menu-remove-btn");
      add_remove_btn.addEventListener("click", function () {
        let add_menu = document.getElementById("add-menu");
        add_menu.classList.add("d-none");
      });
    }

    let q = "#" + data[index].id + " #edit-menu";
    document.querySelector(q).classList.remove("d-none");

    let query =
      "#" +
      data[index].id +
      " #edit-menu .input-row-container .col-10 .input-row ";
    let title = (document.querySelector(query + " .col #title").placeholder =
      data[index].title);
    let note = (document.querySelector(query + " .col #note").placeholder =
      data[index].note);
    let day = (document.querySelector(
      query + " .row .input-group #day input"
    ).placeholder = data[index].day);
    let hour = (document.querySelector(
      query + " .row .input-group #hour input"
    ).placeholder = data[index].hour);
    let min = (document.querySelector(
      query + " .row .input-group #min input"
    ).placeholder = data[index].minute);

    //------------------------------------------------------------------------commit change
    q =
      "#" +
      data[index].id +
      " #edit-menu .input-row-container .col-10 .input-row .change-btn-row .col #change-btn";
    let change_btn = document.querySelector(q);
    change_btn.addEventListener("click", function () {
      let query =
        "#" +
        data[index].id +
        " #edit-menu .input-row-container .col-10 .input-row ";
      if (!document.querySelector(query + " .col #title").value == "") {
        data[index].title = document.querySelector(
          query + " .col #title"
        ).value;
      }
      if (!document.querySelector(query + " .col #note").value == "") {
        data[index].note = document.querySelector(query + " .col #note").value;
      }
      if (
        !document.querySelector(query + " .time-input .col #day input").value ==
        ""
      ) {
        data[index].day = document.querySelector(
          query + " .time-input .col #day input"
        ).value;
      }
      if (
        !document.querySelector(query + " .time-input .col #hour input")
          .value == ""
      ) {
        data[index].hour = document.querySelector(
          query + " .time-input .col #hour input"
        ).value;
      }
      if (
        !document.querySelector(query + " .time-input .col #min input").value ==
        ""
      ) {
        data[index].min = document.querySelector(
          query + " .time-input .col #min input"
        ).value;
      }

      document.querySelector(
        "#" + data[index].id + " .task .text #time"
      ).innerHTML = data[index].hour + ":" + data[index].minute;
      document.querySelector(
        "#" + data[index].id + " .task .text #title"
      ).innerHTML = data[index].title;
      document.querySelector(
        "#" + data[index].id + " .task .text #note"
      ).innerHTML = data[index].note;
      let edit_menu = document.querySelector(
        "#" + data[index].id + " #edit-menu"
      );
      edit_menu.classList.add("d-none");
    });
  });

  //------------------------------------------------------------------------flag check
  let q = "#" + data[index].id + " .task .col-2 .form-check #flexCheckChecked";
  let element = document.querySelector(q);

  element.addEventListener("click", function () {
    if (element.hasAttribute("checked")) {
      element.removeAttribute("checked");
      data[index].completed = false;
      data[index].active = true;
    } else {
      element.setAttribute("checked", "");
      data[index].completed = true;
      data[index].active = false;
    }
  });
}

//------------------------------------------------------------------------days and date // navbar
{
  let weekDays = document.getElementById("weekdays");
  let child = weekDays.firstElementChild;
  for (let i = 0; i < 7; i++) {
    let x = new Date();
    let d = x.getDate() + i;
    x.setDate(d);
    child.querySelector(".date").innerHTML = x.getDate();
    child.querySelector(".day").innerHTML = convertToDay(x.getDay());
    child = child.nextElementSibling;
  }
}

//------------------------------------------------------------------------date and month
x = new Date();
let main_heading_day = document.getElementById("main-heading-day");
main_heading_day.innerHTML = convertToDay(x.getDay());
let main_heading_date = document.getElementById("main-heading-date");
main_heading_date.innerHTML = x.getDate() + " " + convertToMonth(x.getMonth());

function convertToDay(number) {
  let day = "Sunday";
  if (number == 0) {
    day = "Sun";
  }

  if (number == 1) {
    day = "Mon";
  }
  if (number == 2) {
    day = "Tue";
  }

  if (number == 3) {
    day = "Wed";
  }

  if (number == 4) {
    day = "Thu";
  }

  if (number == 5) {
    day = "Fri";
  }

  if (number == 6) {
    day = "Sat";
  }

  return day;
}
function convertToMonth(number) {
  let month = "January";

  if (number == 0) {
    month = "January";
  } else if (number == 1) {
    month = "February";
  } else if (number == 2) {
    month = "March";
  } else if (number == 3) {
    month = "April";
  } else if (number == 4) {
    month = "May";
  } else if (number == 5) {
    month = "June";
  } else if (number == 6) {
    month = "July";
  } else if (number == 7) {
    month = "August";
  } else if (number == 8) {
    month = "September";
  } else if (number == 9) {
    month = "October";
  } else if (number == 10) {
    month = "November";
  } else if (number == 11) {
    month = "December";
  }
  return month;
}

function show1() {
  removeAllActiveDays();
  addActiveDay(0);
  showData(findRealNumber(0));
}
function show2() {
  removeAllActiveDays();
  addActiveDay(1);
  showData(findRealNumber(1));
}
function show3() {
  removeAllActiveDays();
  addActiveDay(2);
  showData(findRealNumber(2));
}
function show4() {
  removeAllActiveDays();
  addActiveDay(3);
  showData(findRealNumber(3));
}
function show5() {
  removeAllActiveDays();
  addActiveDay(4);
  showData(findRealNumber(4));
}
function show6() {
  removeAllActiveDays();
  addActiveDay(5);
  showData(findRealNumber(5));
}
function show7() {
  removeAllActiveDays();
  addActiveDay(6);
  showData(findRealNumber(6));
}

function removeAllActiveDays() {
  let child = document.getElementById("weekdays").firstElementChild;
  for (let i = 0; i < 7; i++) {
    child.classList.remove("active-day");
    child = child.nextElementSibling;
  }
}
function addActiveDay(num) {
  let child = document.getElementById("weekdays").firstElementChild;
  for (let i = 0; i < num; i++) {
    child = child.nextElementSibling;
  }
  child.classList.add("active-day");
}
function showData(day) {
  for (let i = 0; i < data.length; i++) {
    let id = data[i].id;
    document.querySelector("#" + id).classList.add("d-none");
    if (data[i].day == day) {
      document.querySelector("#" + id).classList.remove("d-none");
    }
  }
}

function findRealNumber(num) {
  let weekDays = document.getElementById("weekdays");
  let child = weekDays.firstElementChild;
  let i = 0;
  for (i = 0; i < num; i++) {
    child = child.nextElementSibling;
  }

  return child.querySelector(".day").innerHTML;
}
