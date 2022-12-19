import http from 'k6/http';
import { sleep, check } from 'k6';
// init
export let options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10m', target: 6000 },
      ],
    },
  },
};
// vu script
export default function () {
  const url = 'https://perf.dbids.cms.gov/testLogin/' ;
  const payload = JSON.stringify({
    userId: 'RAMA',
  });

  const params = {
    headers: {
      'uid': 'RAMA',
    },
  };

  let res = http.get(url, payload, params);
  sleep(1);
  console.log(res.status);
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'status is 503': (r) => r.status === 503,
    'status is 504': (r) => r.status === 504,
  });
}
