import fetch from 'utils/fetch';

export function loginByEmail(username, password,code,requestCode) {
  const data = {
    username,
    password,
    code,
    requestCode
  };
  return fetch({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/api/auth/jwt/invalid',
    method: 'post'
  });
}
export function getCaptcha(uuid) {
  return fetch({
    url: '/api/admin/sys/captcha?requestCode='+uuid,
    method: 'get'
  });
}

