import SzamlaButton from './SzamlaButton.jsx';
import copyIcon from '/icons/icon-copy.svg';

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
            <SzamlaButton icon={copyIcon} text="Másolás" tooltip="Végösszeg vágólapra másolása" onClick={() => copyText('vegosszeg')}></SzamlaButton>
          <pre>Sorszámok: <span id="sorszamok">{sorszamok
            .filter((i) => i.length > 0)
            .join(', ')}</span></pre>
            <SzamlaButton icon={copyIcon} text="Másolás" tooltip="Sorszámok vágólapra másolása" onClick={() => copyText('sorszamok')}></SzamlaButton>
        </>
      )}
    </section>
  );
}
