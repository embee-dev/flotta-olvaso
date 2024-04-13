import SzamlaButton from './SzamlaButton.jsx';

export default function SzamlaManager({ szamlak, onCreate }) {
  function onPlus() {
    onCreate();
  }

  return (
    <section className="flottaSzamlaManager">
      {szamlak.length < 5 ? <SzamlaButton className="flottaSzamlaManager-add" text="+ Új számla hozzáadása" onClick={onPlus}></SzamlaButton>: ''}
    </section>
  );
}
