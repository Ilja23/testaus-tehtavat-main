/**
 * Laskee D'Hondtin vertausluvut yhdelle listalle ja arpoo saman äänimäärän saaneiden järjestyksen
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Sama taulukko, mutta lisättynä vertausluvuilla ja mahdollisesti arvotulla kentällä
 */
function laskeVertausluvut(ehdokkaat) {
  // Järjestetään ehdokkaat äänimäärän mukaan laskevasti
  const jarjestetyt = [...ehdokkaat].sort((a, b) => b.aanet - a.aanet);

  // Ryhmitellään ehdokkaat äänimäärän mukaan
  const ryhmat = [];
  let nykyinenRyhma = [jarjestetyt[0]];

  for (let i = 1; i < jarjestetyt.length; i++) {
    if (jarjestetyt[i].aanet === jarjestetyt[i - 1].aanet) {
      nykyinenRyhma.push(jarjestetyt[i]);
    } else {
      ryhmat.push(nykyinenRyhma);
      nykyinenRyhma = [jarjestetyt[i]];
    }
  }
  ryhmat.push(nykyinenRyhma); // Lisää viimeinen ryhmä

  // Arvotaan samaa äänimäärää saaneiden järjestys ja lisätään 'arvottu: true'
  const arvotettuJarjestys = [];
  for (const ryhma of ryhmat) {
    if (ryhma.length > 1) {
      // Arvotaan järjestys, jos samat äänet
      ryhma.sort(() => Math.random() - 0.5);
    }
    for (const ehdokas of ryhma) {
      ehdokas.arvottu = true; // Merkitään, että järjestys on arvottu
      arvotettuJarjestys.push(ehdokas);
    }
  }

  // Laske äänien summa
  const aanetYhteensa = arvotettuJarjestys.reduce(
    (summa, ehdokas) => summa + ehdokas.aanet,
    0
  );

  // Lasketaan vertausluvut: äänet / sija listassa
  return arvotettuJarjestys.map((ehdokas, index) => ({
    ...ehdokas,
    vertausluku: aanetYhteensa / (index + 1),
  }));
}

export default laskeVertausluvut;
export { laskeVertausluvut };
