const App = (function (listCourses) {
 //debugger;
  const constants = {
    enroll: (value, id = '0') =>
      `<span class="${value ? 'enroll-student' : 'no-enroll'}" data-id=${id}>${constants.replaceBoolean[value]}</span>`,
    replaceBoolean: {
      [true]: 'Si',
      [false]: 'No',
    },
    status: (value, id = '0') =>
      `<span class ="${value ? 'status-student' : 'no-status'}" data-id=${id}>${constants.replacerBoolean[value]}</span>`,
    replacerBoolean: {
      [true]: 'Eliminar',
      [false]:'Editar',
    },
  }

  const selectors = {
    courses: '#courses',
    infoCourse: '.box__table #collection-courses',
    infoStudents: '.box__table #collection-students',
    tbody: 'tbody',
    enroll: 'enroll-student',
    status: 'status-student',
    btn: '.register__students #btn',
    clean: '.register__students #clean',
    link: '.add__students #label',
    regStudents: '.register__students',
    divStudents: '.add__students',
  };
 const dom = {};

  const getElements = () => {
    dom.courses = document.querySelector(selectors.courses);
    dom.infoCourse = document.querySelector(selectors.infoCourse);
    dom.infoStudents = document.querySelector(selectors.infoStudents);
    dom.tBodyCourse = dom.infoCourse.querySelector(selectors.tbody);
    dom.tBodyStudents = dom.infoStudents.querySelector(selectors.tbody);
    dom.btn = document.querySelector(selectors.btn);
    dom.clean = document.querySelector(selectors.clean);
    dom.link = document.querySelector(selectors.link);
    dom.regStudents = document.querySelector(selectors.regStudents);
    dom.divStudents = document.querySelector(selectors.divStudents);
  }

  const addEvents = function () {
    dom.courses.addEventListener('change', methods.showDataTable);
    dom.tBodyCourse.addEventListener('click', methods.showStudents);
    dom.infoStudents.addEventListener('click', methods.deleteStudent);
    dom.btn.addEventListener('click', methods.addNewStudents);
    dom.clean.addEventListener('click', methods.cleanInputs);
    dom.link.addEventListener('click', methods.linkShowStudents);
  }

  const methods = {
    getFirstOptionDefault: () => {
      const firstOption = document.createElement('option');   
      firstOption.value = 0;
      firstOption.defaultSelected = true;
      firstOption.disabled = true;
      firstOption.textContent = '[Choose a course]';

      return firstOption;
    },
    addRows: (tbody, data) => {
      //debugger;
      data.forEach((info, key) => {
        const row = document.createElement('tr');

        for (let propName in info) {
          const cell = document.createElement('td');
          const value = info[propName];
          const isBoolean = typeof value === 'boolean';
          cell.innerHTML = isBoolean
            ? constants.enroll(value, info.id)
            : value;
          row.appendChild(cell);
        }

        tbody.appendChild(row);
      });
    },
    addRowStudent: (tbody, data)=>{
      data.forEach((info, key)=>{
        const row = document.createElement('tr');

        for(let propName in info) {
          const cell = document.createElement('td');
          const value = info[propName];
          const isBoolean = typeof value === 'boolean';
          cell.innerHTML = isBoolean
            ? constants.status(value, info.id)
            :value;
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      });
    },
    loadInfoCourses: () => {
      listCourses.forEach((text, key) => (
          dom.courses[key] = new Option(text, key + 1)
        )
      );

      const optionDefault = methods.getFirstOptionDefault();
      dom.courses.insertBefore(optionDefault, dom.courses.options[0]);
    },
    showDataTable: (e) => {
      const { infoCourse } = dom;
      const tbody = infoCourse.querySelector('tbody');
      const canAddRow = Number(e.target.value);
      const rows = Boolean(canAddRow) ? dataCourses[canAddRow - 1] : [];
      const none = dom.infoStudents.style.display;

      if (canAddRow === 1) {
        dom.infoStudents.style.display = 'none';
        tbody.innerHTML = '';
        methods.addRows(tbody, rows);
        dom.divStudents.style.display = 'none';
        dom.regStudents.style.display = 'none';
      } else if (canAddRow === 2) {
        dom.infoStudents.style.display = 'none';
        tbody.innerHTML = '';
        methods.addRows(tbody, rows);
        dom.regStudents.style.display = 'none';
        dom.divStudents.style.display = 'none';
      } else {
        return false;
      }
    },
    hidetable: () => {
      const none = dom.infoStudents.style.display;
    },
    showStudents: (e) => {
      const { target, currentTarget } = e;
      const enroll = target.classList.contains(selectors.enroll);
      const id = target.dataset.id;
      const none = dom.infoStudents.style.display;
      // const tbody = dom.infoStudents.querySelector('tbody');
      //debugger;
      if (id) {
        if (none === 'none') {
          const rows = dataStudents[id] || [];

          if (enroll && rows.length > 0) {
            dom.infoStudents.style.display = 'block';
            dom.tBodyStudents.innerHTML = '';
            methods.addRowStudent(dom.tBodyStudents, rows);
            dom.divStudents.style.display = 'block';
            dom.divStudents.dataset.course = id;
          }
        }
      } else {
        alert('No hay alumnos y/o celda incorreta');
      }

    },
    deleteStudent: function(e) {
      const { target, currentTarget } = e;
      const rows = currentTarget.querySelector('tbody tr');
      const id = target.dataset.id;
      const row = target.parentNode.parentNode;
      const table = dom.infoStudents;

      if (id && row.nodeName === 'TR') {
        const index = row.rowIndex;
        const deletRow = table.deleteRow(index)
      } else {
        alert('¡Seleccionar celda correcta!');
      };
    },
    addNewStudents: function(e) {
      const tbody = dom.infoStudents.querySelector('tbody');
      const course = dom.divStudents.dataset.course;

      if (course) {
        const name = document.getElementById('name');
        const age = document.getElementById('age');
        const degree = document.getElementById('degree');
        const cod = document.getElementById('cod');
        const status = document.getElementById('status');

        const nameValue = name.value;
        const ageValue = Number(age.value);
        const degreeValue = degree.value;
        const idValue = cod.value;
        const statusValue = Boolean(status.value);

        const arrayRegStudent = {
          name: nameValue,
          age: ageValue,
          degree: degreeValue,
          id: idValue,
          status: statusValue
        };

        if (dataStudents) {
          dataStudents[course].push(arrayRegStudent);
        }

        const students = dataStudents[course] || [];
        tbody.innerHTML = '';
        methods.addRowStudent(dom.tBodyStudents, students);
      } else {
        alert('codigo no existe!');
      }

  

    },
    linkShowStudents: function(e) {
       dom.regStudents.style.display = 'block';
    },
      
     cleanInputs: function(e){
         debugger;
      const clear = document.getElementsByClassName('clear');

      for(let i = 0; i < clear.length; i++){
        clear[i].value = "";
      }
  
    },

  }

  this.intialize = function () {
    getElements();
    addEvents();
    methods.loadInfoCourses();
  }

  return {
    init: this.intialize,
  };
})(options);

App.init();