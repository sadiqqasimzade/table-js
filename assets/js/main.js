btnok = document.getElementById("ok");
btncancel = document.getElementById("cancel");
btnadd = document.getElementById("add");
closebtn = document.getElementById("close");
protectcbx = document.getElementById("protect")

form = document.getElementById("form");

table = document.getElementById("table");

modal = document.getElementById("modal");

nameinput = document.getElementById("name");
surnameinput = document.getElementById("surname");
ageinput = document.getElementById("age");

searchinput = document.getElementById("search");
selector = document.getElementById("selector");

var id = 1;
var selectedid = 0;


btnok.addEventListener('click', () => {
    if (checkInputs()) {
        if (ageinput.value < 0) {
            alert("Age cant be negative")
            return;
        }

        if (btnok.innerText == "Edit") {
            for (let i = 2; i <= table.children.length; i++) {
                if (table.children[i - 1].children[0].innerText == selectedid) {
                    table.children[i - 1].children[1].innerText = nameinput.value;
                    table.children[i - 1].children[2].innerText = surnameinput.value;
                    table.children[i - 1].children[3].innerText = ageinput.value;
                    btnok.innerText = "Ok";
                }
            }
        }
        else {
            if (protectcbx.checked)
                if (checkexsist(nameinput.value, surnameinput.value)) return;

            tr = document.createElement('tr');

            tr.insertCell().innerText = id++;
            tr.insertCell().innerText = nameinput.value;
            tr.insertCell().innerText = surnameinput.value;
            tr.insertCell().innerText = ageinput.value;

            edittd = document.createElement('td');
            deletetd = document.createElement('td');


            edittd.innerHTML = "<img src=\"./assets/img/pencil.svg\" alt=\"\">";
            deletetd.innerHTML = "<img src=\"./assets/img/trash3.svg\" alt=\"\">";

            edittd.addEventListener('click', function () {
                nameinput.value = this.parentElement.children[1].innerText;
                surname.value = this.parentElement.children[2].innerText;
                age.value = this.parentElement.children[3].innerText;
                btnok.innerText = "Edit";
                modal.style.display = "flex";
                selectedid = this.parentElement.children[0].innerText;

                return;
            })

            deletetd.addEventListener('click', function () {
                if (confirmation(this.parentElement.children[1].innerText, this.parentElement.children[2].innerText)) {
                    fixId(this.parentElement.children[0].innerText)
                    this.parentElement.remove();
                    id--;
                }
                
            })


            tr.appendChild(edittd);
            tr.appendChild(deletetd);

            table.appendChild(tr);
        }
        clearInputs()
        modal.style.display = "none";
    }
})

btncancel.addEventListener('click', () => { clearInputs() })

function clearInputs() {
    for (let i = 0; i < form.elements.length; i++) {
        if (form[i].tagName == "INPUT") {
            form[i].value = "";
        }
    }
    btnok.innerText = "Ok";
}

function checkInputs() {
    for (let i = 0; i < form.elements.length; i++) {
        if (form[i].value == "" && form[i].tagName == "INPUT") {
            alert(`${form[i].id} Cant be empty`);
            return false;
        }
    }
    return true;
}

function confirmation(name, surname) {
    return confirm(`Are you sure delete ${name} ${surname} ?`);
}

function checkexsist(name, surname) {
    for (let i = 2; i <= table.children.length; i++) {
        if (table.children[i - 1].children[1].innerText == name)
            if (table.children[i - 1].children[2].innerText == surname) {
                alert("Already exsists");
                return true;
            }
    }
    return false;
}


function fixId(id) {
    for (let i = Number(id); i < table.children.length - 1; i++)
        table.children[i + 1].children[0].innerText = i 
}

searchinput.addEventListener('keyup', (e) => {
    if (searchinput.value != "") {
        for (let i = 2; i <= table.children.length; i++)
            table.children[i - 1].style.display = "table-row"
        search(searchinput.value)
    }
    else {
        for (let i = 2; i <= table.children.length; i++)
            table.children[i - 1].style.display = "table-row"
    }
})

function search(param) {
    switch (selector.selectedIndex) {
        case 0://id
            for (let i = 2; i <= table.children.length; i++)
                if (table.children[i - 1].children[0].innerText != param) table.children[i - 1].style.display = "none";
            break;
        case 1://name
            for (let i = 2; i <= table.children.length; i++)
                if (!table.children[i - 1].children[1].innerText.includes(param)) table.children[i - 1].style.display = "none";
            break;
        case 2://surname
            for (let i = 2; i <= table.children.length; i++)
                if (!table.children[i - 1].children[2].innerText.includes(param)) table.children[i - 1].style.display = "none";
            break;
        case 3://age
            for (let i = 2; i <= table.children.length; i++)
                if (!table.children[i - 1].children[3].innerText.includes(param)) table.children[i - 1].style.display = "none";
            break;
        default:
            break;
    }

}



btnadd.addEventListener('click', () => {
    modal.style.display = "flex";
})

closebtn.addEventListener('click', () => {
    modal.style.display = "none";
})

//todo
//1 make 1-st letterbig
//2 