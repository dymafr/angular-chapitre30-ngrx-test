import * as AuthReducer from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('[ auth ] selectors', () => {
  const initial_state = AuthReducer.AUTH_INTIAL_STATE;

  describe('[ selector ] selectAuthFeature', () => {
    it('should return AuthState', () => {
      const stateSlice = AuthSelectors.selectAuthFeature({
        [AuthReducer.authStateKey]: initial_state,
      });
      expect(stateSlice).toEqual(initial_state);
    });
  });

  describe('[ selector ] selectCurrentUser', () => {
    it('should return null', () => {
      const stateSlice = AuthSelectors.selectCurrentUser({
        [AuthReducer.authStateKey]: initial_state,
      });
      expect(stateSlice).toEqual(null);
    });
    it('should return user', () => {
      const user = { name: 'Jean', email: 'jean@gmail.com' };
      const stateSlice = AuthSelectors.selectCurrentUser({
        [AuthReducer.authStateKey]: { ...initial_state, user },
      });
      expect(stateSlice).toEqual(user);
    });
  });
});
