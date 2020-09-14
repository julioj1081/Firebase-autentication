//formulario signUp
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const Email = document.querySelector("#signup-email").value;
    const Password = document.querySelector("#signup-password").value;
    //esto permitira validar el correo y la contraseña
    //despues tenemos que habilitar el servicio de authentication de firebase
    //y decidir por cual se va autenticar
    auth.createUserWithEmailAndPassword(Email, Password)
    .then(userCredential => {
        //si el correo y la contraseña son correctos entra y se registra
        //console.log("sign -up");

        //reseteo de formulario
        signupForm.reset();
        $('#signupModal').modal("hide");
    })
});


//formulario signIn login
const signinForm = document.querySelector("#login-form");
signinForm.addEventListener("submit", e=>{
    e.preventDefault();
    const Email = document.querySelector("#login-email").value;
    const Password = document.querySelector("#login-password").value;
    //console.log(Email, Password);
    //valida la autenticacion del correo ya registrado en la autenticacion
    auth.signInWithEmailAndPassword(Email, Password)
    .then(userCredential => {
        //si el correo y la contraseña son correctos entra
        console.log("sign - in");

        //reseteo de formulario
        signupForm.reset();
        $('#signinModal').modal("hide");
    })
});


//logout salir de la aplicacion
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
    e.preventDefault();
    //si el cierre de sexion fue correcto has esto
    auth.signOut().then(() => {
        console.log('sing out');
    });
});

//publicaciones
const postList = document.querySelector("#posts");
const setupPosts = data => {
    if(data.length){
        let html = '';
        data.forEach(doc => {
            const post = doc.data()
            console.log(post);
            const li = `
            <li class="list-group-item list-group-item-action">
                    <h3>${post.titulo}</h3>
                    <p>${post.descripcion}</p>
            </li>
            `;
            html += li; 
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = '<p class="text-center text-warning">No existen publicaciones || logeate ahora para verlas</p>'
    }
}

//hacemos una consulta si esta autenticado
//listado de auth en caso de estar autenticado o logeado
auth.onAuthStateChanged(user => {
    //si existe el usuario o esta logeado
    if(user){
        //console.log("auth : logeado - in");
        fire.collection('posts').get().then((snapshot) => {
            //console.log(snapshot.docs)
            setupPosts(snapshot.docs);
        })
    }else{
        //console.log("auth : no logeado - out");
        setupPosts([]);
    }
})