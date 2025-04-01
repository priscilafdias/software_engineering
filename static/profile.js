function previewImage(event) {
  var reader = new FileReader();
  
  reader.onload = function() {
    var output = document.getElementById('profile-image');
    output.src = reader.result;
    output.style.display = 'block'; // Make the image visible
  }

  reader.readAsDataURL(event.target.files[0]); // Read the file as a data URL
}
