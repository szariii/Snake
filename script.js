strona = "p";
flaga = 5;
mozliwoscruchu = 1;
dlugosc = 1;
tab = generateArr();
generateDOM(tab);

poruszanieczas = setInterval(function () {
  ruch(flaga);
}, 100);

function generateArr() {
  var arr = [];
  let jx = randomowa();
  let jy = randomowa();
  for (var i = 0; i < 12; i++) {
    arr[i] = [];
    for (var j = 0; j < 12; j++) {
      if (i == 0 || j == 0 || i == 11 || j == 11) {
        arr[i][j] = "x";
      } else if (i == 5 && j == 5) {
        arr[i][j] = dlugosc;
      } else if (i == jx && j == jy) {
        arr[i][j] = "j";
      } else {
        arr[i][j] = 0;
      }
    }
  }
  return arr;
}

function randomowa() {
  let losowa = Math.floor(Math.random() * 10 + 1);
  while (losowa == 5) {
    losowa = Math.floor(Math.random() * 10 + 1);
  }
  return losowa;
}

function generateDOM(arr) {
  var cmp = document.getElementById("cmp");
  if (dlugosc > 1) {
    for (let ogoy = 1; ogoy < 11; ogoy++) {
      ogox = arr[ogoy].findIndex(szukajkaogona);
      if (ogox != -1) {
        indexogon = { y: ogoy, x: ogox };
      }
    }

    for (let nexty = 1; nexty < 11; nexty++) {
      nextx = tab[nexty].findIndex(szukajkanexta);
      if (nextx != -1) {
        indexnext = { y: nexty, x: nextx };
      }
    }

    if (indexogon.y - indexnext.y == 1) {
      ogonek = "g";
    } else if (indexogon.y - indexnext.y == -1) {
      ogonek = "d";
    } else if (indexogon.x - indexnext.x == -1) {
      ogonek = "p";
    } else if (indexogon.x - indexnext.x == 1) {
      ogonek = "l";
    }
  }
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      let div = document.createElement("div");
      div.classList.add("pole");
      div.id = i + "_" + j;

      if (dlugosc > 2) {
        if (
          arr[i][j] != 0 &&
          arr[i][j] != 1 &&
          arr[i][j] != dlugosc &&
          arr[i][j] != "x" &&
          arr[i][j] != "j"
        ) {
          let wartoscbody = arr[i][j];
          let wartoscznajdzm = wartoscbody - 1;
          let wartoscznajdzw = wartoscbody + 1;

          for (let ytabki = 1; ytabki < 11; ytabki++) {
            let xtabki = tab[ytabki].indexOf(wartoscznajdzw);
            if (tab[ytabki][xtabki] == wartoscznajdzw) {
              let nextwartoscx = xtabki;
              let nextwartoscy = ytabki;

              for (let yntabki = 1; yntabki < 11; yntabki++) {
                let xntabki = tab[yntabki].indexOf(wartoscznajdzm);
                if (tab[yntabki][xntabki] == wartoscznajdzm) {
                  let wczesniejszawartoscx = xntabki;
                  let wczesniejszawartoscy = yntabki;

                  let roznicaanx = j - nextwartoscx;
                  let roznicaany = i - nextwartoscy;

                  let roznicaawx = j - wczesniejszawartoscx;
                  let roznicaawy = i - wczesniejszawartoscy;

                  if (roznicaanx == -1 && roznicaawy == 1) {
                    div.classList.add("skret-g-p");
                  } else if (roznicaanx == 1 && roznicaawx == -1) {
                    div.classList.add("body-l-p");
                  } else if (roznicaanx == -1 && roznicaawx == 1) {
                    div.classList.add("body-l-p");
                  } else if (roznicaanx == -1 && roznicaawy == -1) {
                    div.classList.add("skret-d-p");
                  } else if (roznicaanx == 1 && roznicaawy == 1) {
                    div.classList.add("skret-g-l");
                  } else if (roznicaany == 1 && roznicaawy == -1) {
                    div.classList.add("body-d-g");
                  } else if (roznicaany == -1 && roznicaawy == 1) {
                    div.classList.add("body-g-d");
                  } else if (roznicaanx == 1 && roznicaawy == -1) {
                    div.classList.add("skret-d-l");
                  } else if (roznicaany == 1 && roznicaawx == -1) {
                    div.classList.add("skret-g-p");
                  } else if (roznicaany == 1 && roznicaawx == 1) {
                    div.classList.add("skret-g-l");
                  } else if (roznicaany == -1 && roznicaawx == -1) {
                    div.classList.add("skret-d-p");
                  } else if (roznicaany == -1 && roznicaawx == 1) {
                    div.classList.add("skret-d-l");
                  }
                }
              }
            }
          }
        }
      }

      function next(elemencik, wartoscbody) {
        console.log(wartoscbody);
        console.log(elemencik);
        return elemencik == wartoscbody;
      }

      function poprzednia(wartoscbody, wartoscznajdzm) {
        return wartoscbody == wartoscznajdzm;
      }

      //div.innerHTML = arr[i][j]
      if (arr[i][j] == dlugosc) {
        div.classList.add("head");

        switch (strona) {
          case "g":
            div.classList.add("head-g");
            break;
          case "d":
            div.classList.add("head-d");
            break;
          case "l":
            div.classList.add("head-l");
            break;
          case "p":
            div.classList.add("head-p");
            break;
        }

        div.classList.add("cialo");
      } else if (arr[i][j] == 0) {
        div.classList.add("polko");
      } else if (arr[i][j] == "x") {
        div.classList.add("sciana");
      } else if (arr[i][j] == "j") {
        div.classList.add("jabko");
      } else if (arr[i][j] == 1) {
        div.classList.add("cialo");
        if (dlugosc > 1) {
          div.classList.add("ogonek");
          switch (ogonek) {
            case "g":
              div.classList.add("ogonek-g");
              break;
            case "d":
              div.classList.add("ogonek-d");
              break;
            case "l":
              div.classList.add("ogonek-l");
              break;
            case "p":
              div.classList.add("ogonek-p");
              break;
          }
        }
      } else {
        div.classList.add("cialo");
      }
      if (j == 0) {
        div.classList.add("koniec");
      }
      cmp.appendChild(div);
    }
  }
}

function szukajkanexta(elemencik) {
  return elemencik == 2;
}

function szukajkaogona(pozycja) {
  return pozycja == 1;
}

function jablko(arr) {
  cos = document.getElementsByClassName("polko");
  tablicawolnych = Array.from(cos);
  if (tablicawolnych == "") {
    alert("wygrałeś");
    strona = "p";
    flaga = 5;
    mozliwoscruchu = 1;
    dlugosc = 1;
    tab = generateArr();
  } else {
    wybrany = cos[Math.floor(Math.random() * cos.length)];
    wybraneid = wybrany.id;
    tabkaid = wybraneid.split("_");
    arr[tabkaid[0]][tabkaid[1]] = "j";
  }
  dlugosc = zwiekszdlugosc(dlugosc);
}

function flagaruchu(e) {
  if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
    if ((flaga == 0 || flaga == 3 || flaga == 5) && mozliwoscruchu == 1) {
      mozliwoscruchu = 0;
      if (e.key == "ArrowRight") {
        flaga = 1;
      } else if (e.key == "ArrowLeft") {
        flaga = 2;
      }
    }
  } else if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    if ((flaga == 1 || flaga == 2 || flaga == 5) && mozliwoscruchu == 1) {
      mozliwoscruchu = 0;
      if (e.key == "ArrowDown") {
        flaga = 0;
      } else if (e.key == "ArrowUp") {
        flaga = 3;
      }
    }
  }
}

function ruch(flaga) {
  mozliwoscruchu = 1;
  if (flaga == 0) {
    ruchy();
  } else if (flaga == 1) {
    ruchy();
  } else if (flaga == 2) {
    ruchy();
  } else if (flaga == 3) {
    ruchy();
  }
}

function ruchy() {
  let objindex = indexglowy();
  let pozycjax = objindex.x;
  let pozycjay = objindex.y;
  kierunek(event, pozycjax, pozycjay);
  document.getElementById("cmp").remove();
  let div = document.createElement("div");
  div.id = "cmp";
  document.getElementById("body").appendChild(div);
  generateDOM(tab);
}

function kierunek(e, pozycjax, pozycjay) {
  if (flaga == 0) {
    if (tab[pozycjay + 1][pozycjax] == "j") {
      jablko(tab);
      tab[pozycjay + 1][pozycjax] = dlugosc;
    } else if (
      tab[pozycjay + 1][pozycjax] != 0 &&
      tab[pozycjay + 1][pozycjax] != "j"
    ) {
      przegrana();
    } else {
      ogon(tab);
      tab[pozycjay + 1][pozycjax] = dlugosc;
      strona = "d";
    }
  } else if (flaga == 1) {
    if (tab[pozycjay][pozycjax + 1] == "j") {
      jablko(tab);
      tab[pozycjay][pozycjax + 1] = dlugosc;
    } else if (
      tab[pozycjay][pozycjax + 1] != 0 &&
      tab[pozycjay][pozycjax + 1] != "j"
    ) {
      przegrana();
    } else {
      ogon(tab);
      tab[pozycjay][pozycjax + 1] = dlugosc;
      strona = "p";
    }
  } else if (flaga == 2) {
    if (tab[pozycjay][pozycjax - 1] == "j") {
      jablko(tab);
      tab[pozycjay][pozycjax - 1] = dlugosc;
    } else if (
      tab[pozycjay][pozycjax - 1] != 0 &&
      tab[pozycjay][pozycjax - 1] != "j"
    ) {
      przegrana();
    } else {
      ogon(tab);
      tab[pozycjay][pozycjax - 1] = dlugosc;
      strona = "l";
    }
  } else if (flaga == 3) {
    if (tab[pozycjay - 1][pozycjax] == "j") {
      jablko(tab);
      tab[pozycjay - 1][pozycjax] = dlugosc;
    } else if (
      tab[pozycjay - 1][pozycjax] != 0 &&
      tab[pozycjay - 1][pozycjax] != "j"
    ) {
      przegrana();
    } else {
      ogon(tab);
      tab[pozycjay - 1][pozycjax] = dlugosc;

      strona = "g";
    }
  }
}

function przegrana() {
  alert("Przegrałeś");
  flaga = 5;
  strona = "p";
  mozliwoscruchu = 1;
  dlugosc = 1;
  tab = generateArr();
}

function ogon(arr) {
  cialo = document.getElementsByClassName("cialo");
  tabkaciala = Array.from(cialo);
  for (let ele = 0; ele < tabkaciala.length; ele++) {
    let cialko = tabkaciala[ele];
    let idcialka = cialko.id.split("_");
    let wartosccialka = arr[idcialka[0]][idcialka[1]];
    wartoscpozmianie = wartosccialka - 1;
    arr[idcialka[0]][idcialka[1]] = wartoscpozmianie;
  }
}

function zwiekszdlugosc(dlugosc) {
  dlugosc = dlugosc + 1;
  return dlugosc;
}

function indexglowy() {
  for (let posy = 1; posy < 11; posy++) {
    let posx = tab[posy].findIndex(szukaczglowy);
    if (posx != -1) {
      indexik = { x: posx, y: posy };
    }
  }
  return indexik;
}

function szukaczglowy(index) {
  return index == dlugosc;
}