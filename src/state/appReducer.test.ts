import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './appReducer';


let startState: InitialStateType
beforeEach(()=>{

    startState = {
        error:'null',
        status: 'idle',
        isInitialized:false
    }
})
test('correct error should be set', () => {

    const endState = appReducer(startState, setAppErrorAC( 'some error'))

    expect(endState.error).toBe('some error')

})
test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC( 'succeeded'))

    expect(endState.status).toBe('succeeded')

})