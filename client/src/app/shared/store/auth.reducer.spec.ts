import * as AuthActions from './auth.actions';
import * as AuthReducer from './auth.reducer';

describe('[ auth ] reducer', () => {
  describe('[ reducer ] fetchCurrentUserSuccessAction', () => {
    it('should set user in authState', () => {
      const initial_state = AuthReducer.AUTH_INTIAL_STATE;
      const user = { name: 'Jean', email: 'jean@gmail.com' };
      const action = AuthActions.fetchCurrentUserSuccessAction({ user });
      const newState = AuthReducer.authReducer(initial_state, action);
      expect(newState).toEqual({ ...initial_state, user, isLoggedin: true });
    });
    it('should set null in authState', () => {
      const initial_state = AuthReducer.AUTH_INTIAL_STATE;
      const user = null;
      const action = AuthActions.fetchCurrentUserSuccessAction({ user });
      const newState = AuthReducer.authReducer(initial_state, action);
      expect(newState).toEqual({ ...initial_state, user, isLoggedin: false });
    });
  });
});
