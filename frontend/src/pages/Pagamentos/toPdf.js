export default function toPdf() {
  const divToPrint = document.getElementById('myTable');
  const newWin = window.open('');

  newWin.document.write(
    '<center><h1 style="font-size: 12px, font: Arial; font-weight: bold;">',
    divToPrint.outerHTML,
    '</h1></center>'
  );
  newWin.print();
  newWin.close();
  return newWin;
}
