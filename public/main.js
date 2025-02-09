


const updateButton = document.querySelector('#update-button')

updateButton.addEventListener('click', _ => {
    fetch('/qoutes', {
        method: 'put',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            author: 'me',
            qoutes: 'yes it updated'
        })

    })
})







// function update(){
//     //! fetch(endpoint, options)
//     fetch('/quotes', {
//         method: 'put', //!update
//         headers: {'content-type':'application/json'} //! specifys the content coming through = json // required
//         body: JSON.stringify({
//             author: 'me',
//             qoutes: 'yes it updated'
//         })
//     })
// }