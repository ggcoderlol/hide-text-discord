function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function makeSpoof(fake, real) {
  if (fake === '' || real === '') return;
  else if (fake && real === 'reset') {
    for (var i = 0; i < 3; i++) {
      document.getElementsByTagName('textarea')[i].value = '';
    }
    return;
  }
  if (validURL(fake)) fake = `<${fake}>`;

  const spoofedText = `${fake}${Array(100).fill('||||').join('\u200B')} ${real}`;
  document.getElementById('spoofed').value = spoofedText;
}

function copy() {
  var copyText = document.getElementById("spoofed");

  if (copyText.value === '') return;

  copyText.select();
  copyText.setSelectionRange(0, 99999); /* for mobile devices */

  document.execCommand("copy");

  document.getElementById('msg').innerText = 'Copied!';
  setTimeout(function() { document.getElementById('msg').innerText = ''; }, 1100);
}
