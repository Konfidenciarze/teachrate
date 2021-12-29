const personalData = document.querySelector('#personalData')
const faculty = document.querySelector('#faculty')

faculty.classList.add('biedaHidden')

function changeVisibility(){
    personalData.classList.toggle('biedaHidden')
    faculty.classList.toggle('biedaHidden')
}