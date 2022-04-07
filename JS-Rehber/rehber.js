const ad = document.getElementById("ad");
const soyad = document.getElementById("soyad");
const mail = document.getElementById("mail");
const form = document.getElementById("form-rehber");
const kisilistesi = document.querySelector(".kisi-listesi");
const tumkisiler = [];
let secilensatır = undefined;
form.addEventListener("submit", kaydet);
kisilistesi.addEventListener("click", kisiislemleri);

function kaydet(e) {
  e.preventDefault();
  const eklencek = {
    ad: ad.value,
    soyad: soyad.value,
    mail: mail.value,
  };
  const sonuc = verilerkontrol(eklencek);
  if ((sonuc.mesaj, sonuc.durum)) {
    if (secilensatır) {
      kisiyiguncelle(eklencek);
    } else {
      kisiekle(eklencek);
    }

    bilgiolustur(sonuc.mesaj, sonuc.durum);
  } else {
    bilgiolustur(sonuc.mesaj, sonuc.durum);
  }
  console.log(eklencek);
}
function verilerkontrol(kisi) {
  for (const deger in kisi) {
    if (kisi[deger]) {
      console.log(kisi[deger]);
    } else {
      const sonuc = {
        durum: false,
        mesaj: "free space error",
      };
      return sonuc;
    }
  }
  alantemizle();
  return {
    durum: true,
    mesaj: "Recorded",
  };
}
function bilgiolustur(mesaj, durum) {
  const olusturulanbilgi = document.createElement("div");
  olusturulanbilgi.textContent = mesaj;
  olusturulanbilgi.className = "bilgi";
  olusturulanbilgi.classList.add(durum ? "bilgi---succes" : "bilgi--error");
  document.querySelector(".container").insertBefore(olusturulanbilgi, form);
  setTimeout(function () {
    const silinecekdiv = document.querySelector(".bilgi");
    if (silinecekdiv) {
      silinecekdiv.remove();
    }
  }, 2000);
}
function kisiekle(eklencek) {
  const olusturulantr = document.createElement("tr");
  olusturulantr.innerHTML = `<td>${eklencek.ad}</td>
  <td>${eklencek.soyad}</td>
  <td>${eklencek.mail}</td>
  <td>
    <button class="btn btn--edit">
      <i class="fa-solid fa-floppy-disk"></i>
    </button>
    <button class="btn btn--delete">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </td>`;
  kisilistesi.appendChild(olusturulantr);
  tumkisiler.push(eklencek);
}
function kisiislemleri(event) {
  console.log(event.target);
  if (event.target.classList.contains("btn--delete")) {
    const silinecekTR = event.target.parentElement.parentElement;
    const silinecekmail =
      event.target.parentElement.previousElementSibling.textContent;
    rehberdensil(event.target.parentElement.parentElement);
  } else if (event.target.classList.contains("btn--edit")) {
    document.querySelector(".kaydetguncelle").value = "Update";
    const secilentr = event.target.parentElement.parentElement;
    const guncellememail = secilentr.cells[2].textContent;
    ad.value = secilentr.cells[0].textContent;
    soyad.value = secilentr.cells[1].textContent;
    mail.value = secilentr.cells[2].textContent;
    secilensatır = secilentr;
  }
}
function rehberdensil(silinecekTR, silinecekmail) {
  silinecekTR.remove();
  tumkisiler.forEach((kisi, index) => {
    if (kisi.mail === silinecekmail) {
      tumkisiler.splicei(index, 1);
    }
  });
  console.log("silme yapıldı");
  console.log(tumkisiler);
}

function kisiyiguncelle(kisi) {
  secilensatır.cells[0].textContent = kisi.ad;
  secilensatır.cells[1].textContent = kisi.soyad;
  secilensatır.cells[2].textContent = kisi.mail;

  document.querySelector(".kaydetguncelle").value = "kaydet";
  secilensatır = undefined;
}
function alantemizle() {
  ad.value = "";
  soyad.value = "";
  mail.value = "";
}
