import * as AuthAction from './auth.actions';

describe('[ auth ] actions', () => {
  describe('[ action ] tryFetchCurrentUserAction', () => {
    it('should create a tryFetchCurrentUserAction', () => {
      const action = AuthAction.tryFetchCurrentUserAction();
      expect(action).toEqual({
        type: '[ auth ] try fetch current user',
      });
    });
  });
  describe('[ action ] fetchCurrentUserSuccessAction', () => {
    it('should create a fetchCurrentUserSuccessAction', () => {
      const user = { name: 'Jean', email: 'jean@gmail.com' };
      const action = AuthAction.fetchCurrentUserSuccessAction({ user });
      expect(action).toEqual({
        type: '[ auth ] fetch current user success',
        user,
      });
    });
  });
});
