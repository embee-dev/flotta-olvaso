import SzamlaButton from './SzamlaButton.jsx';
import copyIcon from '/icons/icon-copy.svg';

export default function SzamlaOsszesito({ szamlak }) {
  let vegosszeg = szamlak.reduce((a, v) => {
    return a + v?.vegosszeg;
  }, 0);
  let osszegek = szamlak.map((i) => i.vegosszeg);
  let sorszamok = szamlak.map((i) => i.sorszam).sort();

  function copyText(itemToCopy) {
    let textToCopy = document.getElementById(itemToCopy)?.innerText;
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
    <>
    {vegosszeg > 0 && (
      <section className="flottaSzamlaOsszesito">
        <div className="flottaSzamlaOsszesito-block">
          <div className="flottaSzamlaOsszesito-label">Végösszeg</div>
          <div className="flottaSzamlaOsszesito-value" id="vegosszeg" title={osszegek
            .filter((i) => i > 0)
            .join(' + ')}>{vegosszeg}</div>
          <SzamlaButton className="flottaSzamlaOsszesito-copy" icon={copyIcon} text="Másolás" tooltip="Végösszeg vágólapra másolása" onClick={() => copyText('vegosszeg')}></SzamlaButton>
        </div>
            
        <div className="flottaSzamlaOsszesito-block">
          <div className="flottaSzamlaOsszesito-label">Sorszámok</div>
          <div className="flottaSzamlaOsszesito-value" id="sorszamok">{sorszamok
            .filter((i) => i.length > 0)
            .join(', ')}</div>
          <SzamlaButton className="flottaSzamlaOsszesito-copy" icon={copyIcon} text="Másolás" tooltip="Sorszámok vágólapra másolása" onClick={() => copyText('sorszamok')}></SzamlaButton>
        </div>
      </section>
    )}
    </>
  );
}
