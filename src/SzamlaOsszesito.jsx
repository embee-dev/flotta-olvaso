import SzamlaCopyButton from './SzamlaCopyButton.jsx';

export default function SzamlaOsszesito({ szamlak }) {
  let vegosszeg = szamlak.reduce((a, v) => {
    return a + v?.vegosszeg;
  }, 0);
  let osszegek = szamlak.map((i) => i.vegosszeg);
  let sorszamok = szamlak.map((i) => i.sorszam).sort();

  function copyText(itemToCopy) {
    let textToCopy = document.querySelector(`#${itemToCopy}`)?.innerText;
    if (!textToCopy) return;
    (async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        console.info(`${textToCopy} copied!`);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <section className="flottaSzamlaOsszesito">
      {vegosszeg > 0 && (
        <>
          <p>Végösszeg: <span id="vegosszeg">{vegosszeg}</span> ({osszegek
            .filter((i) => i > 0)
            .join(' + ')})</p>
            <SzamlaCopyButton tooltip="Végösszeg" onClick={() => copyText('vegosszeg')}></SzamlaCopyButton>
          <pre>Sorszámok: <span id="sorszamok">{sorszamok
            .filter((i) => i.length > 0)
            .join(', ')}</span></pre>
            <SzamlaCopyButton tooltip="Sorszámok" onClick={() => copyText('sorszamok')}></SzamlaCopyButton>
        </>
      )}
    </section>
  );
}
