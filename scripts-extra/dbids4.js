import { sleep, group, check } from 'k6'
import http from 'k6/http'


// export const options = {
//   maxRedirects: 20,
//   stages: [
//     { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
//     { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
//     { duration: '5m', target: 0 }, // ramp-down to 0 users
//   ],
//   thresholds: {
//     http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
//   },
// }


const HOST = 'perf.dbids.cms.gov';
const BASE_URL = `https://${HOST}`;
const USERNAME = 'TESTIDM_AO';

export default () => {
  group('Load Test', function () {
    let res

    group('Login', function () {
      res = http.get(`${BASE_URL}/dbids/`, {
        headers: {
          host: HOST,
          uid: USERNAME,
        },
      });
      check(res, {
        'status is 200': (r) => r.status === 200,
      });
    })

    const cookie_jsessionid = JSON.stringify(res.cookies['JSESSIONID']);
    const json_jsessionid = JSON.parse(cookie_jsessionid);
    const JSESSIONID = json_jsessionid[0].value;
  
    group('WelcomeScreen.html', function () {
      res = http.get(`${BASE_URL}/dbids/WelcomeScreen.html;jsessionid=${JSESSIONID}`, {
        tags: { name: `${BASE_URL}/dbids/WelcomeScreen.html` }
      });
      check(res, {
        'status is 200': (r) => r.status === 200,
      });
    })

    group('RouteUser.html', function () {
      res = http.get(`${BASE_URL}/dbids/RouteUser.html`, {});
      check(res, {
        'status is 200': (r) => r.status === 200,
      });
    })

    group('CreateSupplier.html', function () {
      res = http.get(`${BASE_URL}/dbids/CreateSupplier.html?newSup=true`, {
        tags: { name: `${BASE_URL}/dbids/CreateSupplier.html` }
      });
      check(res, {
        'status is 200': (r) => r.status === 200,
      });
    })

    group('NSCselection.html', function () {
      res = http.get(`${BASE_URL}/dbids/NSCselection.html`, {});
      check(res, {
        'status is 200': (r) => r.status === 200,
      });
    })

    group('Logout.html', function () {
      res = http.get(`${BASE_URL}/dbids/Logout.html`, {
        tags: { name: `${BASE_URL}/dbids/Logout.html` }
      });
      check(res, {
        'status is 200': (r) => r.status === 200,
      });
    })

  })
  
}