test('User can succesfully register', () => {

})
test.todo('User can succesfully login')
test.todo('User gets 403 on invalid credentials')
test.todo('User gets 401 on expired access token')
test.todo('User gets 401 when refreshing if no fingerprint provided')
test.todo('User gets 401 when refreshing if fingerprints are not equal')
test.todo('User can get new access token using refresh token')
test.todo('User can use refresh token only once')
test.todo('All users refresh tokens become invalid on global logout')
test.todo('Only one refresh token becomes invalid on local logout')