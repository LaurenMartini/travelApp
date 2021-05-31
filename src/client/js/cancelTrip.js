function cancelEditOrCreate() {
    //return to welcome page and don't change anything
    document.getElementById('tripForm').style.display = 'none';
    document.getElementById('tripContentSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
}

export { cancelEditOrCreate }