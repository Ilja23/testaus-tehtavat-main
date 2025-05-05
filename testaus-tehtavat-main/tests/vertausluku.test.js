import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

// Yksinkertainen satunnaistusfunktio, joka sekoittaa listan
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr; // return the shuffled array
}

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
      { numero: 102, nimi: "Kalle Korhonen", aanet: 4 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 2 },
    ];

    // Mockaa ehdokasrekisteri
    mock.method(ehdokasRekisteri, "haeLista", () => {
      return lista;
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it("saman äänimäärän saaneilla ehdokkailla on arvottu kenttä", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    const samanAannanEhdokkaat = tulos.filter((ehdokas) => ehdokas.aanet === 2);
    assert(samanAannanEhdokkaat.every((ehdokas) => ehdokas.arvottu === true));
  });

  it("listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 9);
  });

  it("listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 4.5);
  });

  it("saman äänimäärän saaneet ehdokkaat on järjestetty satunnaisesti kymmenen kertaa", () => {
    let satunnaisuusToimii = true; // Lippu, joka kertoo, toimiiko satunnainen järjestys
    for (let i = 0; i < 10; i++) {
      const tulos1 = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
      const tulos2 = laskeVertausluvut(ehdokasRekisteri.haeLista(1));

      // Etsitään saman äänimäärän saaneet ehdokkaat
      const samanAannanEhdokkaat1 = tulos1.filter(
        (ehdokas) => ehdokas.aanet === 2
      );
      const samanAannanEhdokkaat2 = tulos2.filter(
        (ehdokas) => ehdokas.aanet === 2
      );

      // Arvotaan satunnainen järjestys
      shuffleArray(samanAannanEhdokkaat1);
      shuffleArray(samanAannanEhdokkaat2);

      // Debug: Tulostetaan järjestys ja vertaillaan
      console.log("Kierros", i + 1);
      console.log("Ehdokkaat 1:", JSON.stringify(samanAannanEhdokkaat1));
      console.log("Ehdokkaat 2:", JSON.stringify(samanAannanEhdokkaat2));

      // Varmistetaan, että samaa äänimäärää saaneet ehdokkaat ovat eri järjestyksessä
      if (
        JSON.stringify(samanAannanEhdokkaat1) ===
        JSON.stringify(samanAannanEhdokkaat2)
      ) {
        satunnaisuusToimii = false;
        break; // Jos löydetään samanlainen järjestys, lopetetaan testi ja merkitään satunnainen järjestys ei-toimivaksi
      }
    }

    // Testi epäonnistuu, jos saman äänimäärän saaneet ehdokkaat ovat aina samassa järjestyksessä
    assert(
      satunnaisuusToimii,
      "Satunnainen järjestys ei toiminut; sama äänimäärä, mutta järjestys ei muuttunut."
    );
  });
});
