import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';

describe('[ auth ] effects ', () => {
  const router = jasmine.createSpyObj('router', ['navigateByUrl']);
  const authService = jasmine.createSpyObj('authService', [
    'fetchCurrentUser',
    'inscription',
  ]);

  describe('[ effect ] tryFetchCurrentUserEffect', () => {
    it('should return fetchCurrentUserSuccessAction', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run((helpers: RunHelpers) => {
        const { hot, expectObservable } = helpers;
        const user = { name: 'Jean', email: 'jean@gmail.com' };

        authService.fetchCurrentUser.and.returnValue(of(user));
        const actions = new Actions(
          hot('--a-', {
            a: AuthActions.tryFetchCurrentUserAction(),
          })
        );
        const effects = new AuthEffects(actions, authService, router);
        expectObservable(effects.tryFetchCurrentUserEffect).toBe('--b-', {
          b: AuthActions.fetchCurrentUserSuccessAction({ user }),
        });
      });
    });
  });
  describe('[ effect ] tryInscriptionEffect', () => {
    it('should return null', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run((helpers: RunHelpers) => {
        const { hot, expectObservable } = helpers;
        const user = { name: 'Jean', email: 'jean@gmail.com', password: '123' };
        authService.inscription.and.returnValue(of(null));
        router.navigateByUrl.and.returnValue(null);
        const actions = new Actions(
          hot('--a-', {
            a: AuthActions.tryInscriptionAction({ user }),
          })
        );
        const effects = new AuthEffects(actions, authService, router);
        expectObservable(effects.tryInscriptionEffect).toBe('----');
      });
    });
    it('should return inscriptionErrorAction', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run((helpers: RunHelpers) => {
        const { hot, expectObservable } = helpers;
        const user = { name: 'Jean', email: 'jean@gmail.com', password: '123' };
        authService.inscription.and.returnValue(throwError({ error: 'error' }));
        const actions = new Actions(
          hot('--a-', {
            a: AuthActions.tryInscriptionAction({ user }),
          })
        );
        const effects = new AuthEffects(actions, authService, router);
        expectObservable(effects.tryInscriptionEffect).toBe('--a-', {
          a: AuthActions.inscriptionErrorAction({ error: 'error' }),
        });
      });
    });
  });
});
