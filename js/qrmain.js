function generate_qrcode_of_url(){
    var text = window.location.href;
    var typeNumber = 0;
    var errorCorrectionLevel = 'H';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    var data = qr.createDataURL(8);

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    modal.style.display = "block";
    modalImg.src = data;
    modalImg.style = "width: 400px; height: 400px;"
}
