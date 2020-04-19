class AuthenticationService {

    registerSuccesfulLogin(username, password) {
        console.log('SuccessfullLogin')
        sessionStorage.setItem('authenticatedUser', username);
    }
}

export default new AuthenticationService()