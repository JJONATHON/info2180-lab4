window.onload = function() {
    const button = document.getElementById("search-btn");

    button.addEventListener("click", function(){
        fetch('superheroes.php')
        .then(response => response.text())
        .then(data => {
            alert(data);        //Show result in popup 
     })
        .catch(error => console.error('Error:', error));
    });
};