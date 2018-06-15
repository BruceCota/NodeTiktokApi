import { assert } from 'chai';
import { describe, it } from 'mocha';
import MockAdapter from 'axios-mock-adapter';
import { LoginErrorData, LoginResponse, LoginSuccessData } from '../src/types';
import { loadTestData, mockParams } from './util';
import MusicallyAPI from '../src';

describe('#loginWithEmail()', () => {
  it('a successful response should match the interface', async () => {
    const api = new MusicallyAPI(mockParams);
    const mock = new MockAdapter(api.request);
    mock.onPost('passport/user/login').reply(200, loadTestData('login.json'));

    const res = await api.loginWithEmail('user@example.com', 'password');
    const expected: LoginResponse = {
      data: {
        area: '',
        avatar_url: '',
        bg_img_url: '',
        birthday: '',
        can_be_found_by_phone: 1,
        connects: [],
        description: '',
        email: 'u**r@example.com',
        followers_count: 0,
        followings_count: 0,
        gender: 0,
        industry: '',
        is_blocked: 0,
        is_blocking: 0,
        is_recommend_allowed: 1,
        media_id: 0,
        mobile: '',
        name: 'user',
        new_user: 0,
        recommend_hint_message: '同时推荐给我的粉丝',
        screen_name: 'user',
        session_key: '1234567890abcdef1234567890abcdef',
        skip_edit_profile: 0,
        user_auth_info: '',
        user_id: '9999999999999999999',
        user_verified: false,
        verified_agency: '',
        verified_content: '',
        visit_count_recent: 0,
      } as LoginSuccessData,
      message: 'success',
    };
    assert.deepEqual(res.data, expected);
  });

  it('an error response should match the interface', async () => {
    const api = new MusicallyAPI(mockParams);
    const mock = new MockAdapter(api.request);
    mock.onPost('passport/user/login').reply(200, loadTestData('login-error.json'));

    const res = await api.loginWithEmail('user@example.com', 'incorrect_password');
    const expected: LoginResponse = {
      data: {
        captcha: '',
        description: 'Wrong password',
        error_code: 1009,
      } as LoginErrorData,
      message: 'error',
    };
    assert.deepEqual(res.data, expected);
  });
});
