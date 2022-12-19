import http from 'k6/http';

export let options = {
    vus: 50,
    stages: [
        { duration: "5m", target: 500 },
    ]
};

export default function () {
  http.get('https://perf.dbids.cms.gov/testLogin/');
};
