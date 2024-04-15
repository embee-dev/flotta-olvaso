import SzamlaButton from './SzamlaButton.jsx';

export default function SzamlaManager({ szamlak, onCreate }) {
  function onPlus() {
    onCreate();
  }

  return (
    <>
      {szamlak.length < 5 && 
        <section className="flottaSzamlaManager">
          <SzamlaButton className="flottaSzamlaManager-add" text="+ Új számla hozzáadása" onClick={onPlus}></SzamlaButton>
        </section>
      }
    </>
  );
}
