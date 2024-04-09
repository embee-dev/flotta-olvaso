export default function SzamlaOsszesito({ szamlak }) {
  let vegosszeg = szamlak.reduce((a, v) => {
    return a + v?.vegosszeg;
  }, 0);
  let osszegek = szamlak.map((i) => i.vegosszeg);
  let sorszamok = szamlak.map((i) => i.sorszam).sort();

  return (
    <section className="flottaSzamlaOsszesito">
      {vegosszeg > 0 && (
        <>
          <p>{`Végösszeg: ${vegosszeg} (${osszegek
            .filter((i) => i > 0)
            .join(' + ')})`}</p>
          <pre>{`Sorszámok: ${sorszamok
            .filter((i) => i.length > 0)
            .join(', ')}`}</pre>
        </>
      )}
    </section>
  );
}
